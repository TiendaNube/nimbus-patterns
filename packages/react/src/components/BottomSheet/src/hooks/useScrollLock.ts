import { RefObject, useEffect } from "react";

/**
 * Reference count so multiple stacked sheets share a single lock and
 * `overflow` is only restored when the last one unlocks.
 */
let lockCount = 0;
let previousOverflow = "";
let lockedScrollY = 0;

/**
 * Every currently-locked sheet's own panel element. A touch is allowed
 * through (lets its default scroll happen) when it lands inside ANY of
 * these — not just the most recently opened one — so a stacked sheet's own
 * content keeps scrolling normally too.
 */
const lockedPanels = new Set<HTMLElement>();

const isInsideALockedPanel = (target: EventTarget | null): boolean => {
  if (!(target instanceof Node)) return false;
  return Array.from(lockedPanels).some((panel) => panel.contains(target));
};

/**
 * A Modal/Popover/Sidebar opened from inside the sheet doesn't render as a
 * DOM descendant of the sheet's own panel — like the sheet itself, they
 * portal into the nearest ThemeProvider's shared container, landing as a
 * SIBLING of the panel, not inside it (see BottomSheet.tsx's own
 * `portalTarget` comment). `[data-floating-ui-portal]` is the wrapper every
 * floating-ui-based Nimbus overlay renders its content into — the same
 * selector `useDismissHandlers` already uses to recognize a press inside one
 * of these as NOT an outside press against the sheet. Without this check
 * here too, touch-scrolling (e.g. a horizontally-scrollable tab strip) inside
 * a Modal opened from the sheet would get silently cancelled by the
 * `touchmove` interception below, since that content isn't inside the
 * sheet's own panel either.
 */
const isInsideAFloatingUiPortal = (target: EventTarget | null): boolean =>
  target instanceof Element &&
  target.closest("[data-floating-ui-portal]") !== null;

/**
 * Cancels the touch-driven scroll/bounce a background page would otherwise
 * get on iOS Safari/WebViews, without ever moving `document.body` itself
 * (no `position: fixed`, no captured/restored scroll offset). A touch inside
 * a locked sheet's own panel is left alone, so its internal content (the
 * `Body`, which keeps its own `overflowY: auto` scroll) and the grabber's own
 * drag gesture both keep working exactly as before.
 *
 * Must be non-passive: iOS Safari ignores `preventDefault()` called from a
 * passive listener.
 */
const handleTouchMove = (event: TouchEvent) => {
  if (
    !isInsideALockedPanel(event.target) &&
    !isInsideAFloatingUiPortal(event.target)
  ) {
    event.preventDefault();
  }
};

/**
 * Snaps the page back to its locked scroll position the instant it drifts
 * away from it, regardless of what caused the drift. `touchmove`
 * interception only stops a scroll that starts as a touch gesture — it does
 * nothing against Safari's own native "scroll the focused input into view"
 * behavior when a text input inside the sheet gets focus (the keyboard
 * opening), which moves the page programmatically, not via a touch event at
 * all. Reproduced as: background scroll only when the on-screen keyboard is
 * open/just opened, on both iOS Safari and iOS Chrome (same WebKit engine
 * either way).
 */
const handleScroll = () => {
  if (window.scrollY !== lockedScrollY) {
    window.scrollTo(window.scrollX, lockedScrollY);
  }
};

/**
 * Locks background scroll while `active` is true, restoring the previous
 * state when the last active sheet releases the lock. Dependency free (no
 * react-remove-scroll/body-scroll-lock) to respect the DS "no new deps"
 * constraint.
 *
 * `overflow: hidden` alone is a no-op against touch-driven scroll on iOS
 * Safari/WebViews (a well-known platform gap — it only blocks wheel/mouse
 * scroll), so it's paired with the `touchmove` interception above for that
 * case, and the scroll-position snapback above for non-touch-driven scrolls.
 * Deliberately NOT the `position: fixed` + negative `top` technique some
 * other libraries use for the same iOS gap: forcing that layout change on
 * `document.body` can itself make the browser's own chrome (address
 * bar/toolbar) animate to a different size right as the sheet opens,
 * corrupting `useKeyboardInset`/`useSnapPoints`'s viewport-based
 * measurements taken around that same moment. Snapping back reactively
 * (only if and when a scroll actually happens) instead of forcing a
 * permanent layout change upfront on every open avoids triggering that same
 * failure mode unconditionally.
 */
export const useScrollLock = (
  active: boolean,
  panelRef: RefObject<HTMLElement | null>
): void => {
  useEffect(() => {
    if (!active || typeof document === "undefined") return undefined;

    const panel = panelRef.current;
    if (panel) lockedPanels.add(panel);

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      lockedScrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      window.addEventListener("scroll", handleScroll);
    }
    lockCount += 1;

    return () => {
      if (panel) lockedPanels.delete(panel);
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
        document.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [active, panelRef]);
};
