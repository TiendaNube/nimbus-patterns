import { useEffect } from "react";

/**
 * Reference count so multiple stacked sheets share a single lock and the
 * original state is only restored when the last one unlocks.
 */
let lockCount = 0;
let previousOverflow = "";
let previousPosition = "";
let previousTop = "";
let previousWidth = "";
let previousScrollY = 0;

/**
 * Locks background scroll while `active` is true, restoring the previous
 * state when the last active sheet releases the lock. Dependency free (no
 * react-remove-scroll/body-scroll-lock) to respect the DS "no new deps"
 * constraint. The sheet body keeps its own internal scroll.
 *
 * `overflow: hidden` alone is a no-op against touch-driven scroll on iOS
 * Safari/WebViews (a well-known platform gap — it only blocks wheel/mouse
 * scroll). Fixing the body in place at its current scroll offset does work,
 * since there's then nothing left for a touch gesture to scroll regardless of
 * platform. `scrollTo` on unlock puts the page back exactly where it was,
 * since removing `position: fixed` alone would otherwise snap it back to
 * scroll position 0.
 */
export const useScrollLock = (active: boolean): void => {
  useEffect(() => {
    if (!active || typeof document === "undefined") return undefined;

    if (lockCount === 0) {
      previousScrollY = window.scrollY;
      previousOverflow = document.body.style.overflow;
      previousPosition = document.body.style.position;
      previousTop = document.body.style.top;
      previousWidth = document.body.style.width;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${previousScrollY}px`;
      document.body.style.width = "100%";
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
        document.body.style.position = previousPosition;
        document.body.style.top = previousTop;
        document.body.style.width = previousWidth;
        window.scrollTo(0, previousScrollY);
      }
    };
  }, [active]);
};
