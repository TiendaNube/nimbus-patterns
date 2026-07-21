import { RefObject, useEffect } from "react";

/**
 * Reference count so multiple stacked sheets share a single lock and
 * `overflow` is only restored when the last one unlocks.
 */
let lockCount = 0;
let previousOverflow = "";

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
  if (!isInsideALockedPanel(event.target)) {
    event.preventDefault();
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
 * case. Deliberately NOT the `position: fixed` + negative `top` technique
 * some other libraries use for the same iOS gap: forcing that layout change
 * on `document.body` can itself make the browser's own chrome (address
 * bar/toolbar) animate to a different size right as the sheet opens,
 * corrupting `useKeyboardInset`/`useSnapPoints`'s viewport-based
 * measurements taken around that same moment. Never touching the page's
 * real scroll position or `document.body`'s layout at all avoids that
 * failure mode at the source, instead of compensating for it after the fact.
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
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }
    lockCount += 1;

    return () => {
      if (panel) lockedPanels.delete(panel);
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
        document.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [active, panelRef]);
};
