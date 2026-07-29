import { RefObject, useEffect } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const getFocusable = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

// The grabber (role="separator") is focusable/tabbable so keyboard users can
// reach it, and it correctly participates in the Tab/Shift+Tab wrap cycle as
// the sheet's first element. But it's chrome, not content: initial
// focus-on-open should still land on the first real content element, same as
// any dialog putting focus on its content rather than its own toolbar.
const getInitialFocusTarget = (
  focusables: HTMLElement[],
  container: HTMLElement
): HTMLElement =>
  focusables.find((el) => el.getAttribute("role") !== "separator") ??
  focusables[0] ??
  container;

/**
 * Traps focus within `containerRef` while `active`, moving focus into the
 * sheet on activation and restoring it to the previously focused element on
 * deactivation. Tab / Shift+Tab wrap around the focusable boundary.
 */
export const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  active: boolean
): void => {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container || typeof document === "undefined")
      return undefined;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = getFocusable(container);
    getInitialFocusTarget(focusables, container).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = getFocusable(container);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      // Non-null: the `items.length === 0` guard above already ruled out an
      // empty array, so .at(-1) is always defined here.
      const last = items.at(-1)!;
      const activeEl = document.activeElement;

      if (event.shiftKey && activeEl === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [containerRef, active]);
};
