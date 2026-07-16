import { useEffect } from "react";

/**
 * Reference count so multiple stacked sheets share a single lock and the
 * original overflow is only restored when the last one unlocks.
 */
let lockCount = 0;
let previousOverflow = "";

/**
 * Locks background scroll on `document.body` while `active` is true, restoring
 * the previous value when the last active sheet releases the lock. Dependency
 * free (no react-remove-scroll) to respect the DS "no new deps" constraint.
 * The sheet body keeps its own internal scroll.
 */
export const useScrollLock = (active: boolean): void => {
  useEffect(() => {
    if (!active || typeof document === "undefined") return undefined;

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [active]);
};
