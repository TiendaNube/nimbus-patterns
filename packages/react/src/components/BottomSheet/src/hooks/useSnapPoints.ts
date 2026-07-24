import { RefObject, useCallback, useEffect, useState } from "react";

import { FULL_TOP_GAP_RATIO } from "../bottomSheet.constants";
import { BottomSheetSnapPoint } from "../bottomSheet.types";

/**
 * A resolved snap point: the panel height in px and its translateY offset
 * (distance the panel top sits below the container's top edge).
 */
export interface ResolvedSnap {
  /** Original snap point definition (e.g. "60%", "full"). */
  point: BottomSheetSnapPoint;
  /** Panel height in px at this snap. */
  height: number;
  /** translateY offset (px) from the container top when the panel is `height` tall. */
  offset: number;
}

const parseSnapPoint = (
  point: BottomSheetSnapPoint,
  containerHeight: number
): number => {
  if (point === "full") {
    return containerHeight * (1 - FULL_TOP_GAP_RATIO);
  }
  const match = /^(\d+(?:\.\d+)?)%$/.exec(point.trim());
  const ratio = match ? Number(match[1]) / 100 : 0;
  return containerHeight * ratio;
};

/**
 * Resolves `snapPoints` into px heights/offsets against the current height of
 * `containerRef` (or the viewport when no root is provided), recalculating on
 * resize/orientation change so rotating the device keeps snaps consistent.
 */
export const useSnapPoints = (
  snapPoints: BottomSheetSnapPoint[],
  containerRef: RefObject<HTMLElement | null>
): { snaps: ResolvedSnap[]; containerHeight: number } => {
  const [containerHeight, setContainerHeight] = useState(0);

  const measure = useCallback(() => {
    const height =
      containerRef.current?.clientHeight ??
      (typeof window !== "undefined" ? window.innerHeight : 0);
    setContainerHeight(height);
  }, [containerRef]);

  useEffect(() => {
    measure();
    if (typeof window === "undefined") return undefined;

    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    // Also re-measure on the visual viewport's own resize: on mobile, the
    // browser's chrome (address bar/toolbar) can grow or shrink right around
    // mount time (e.g. our own scroll-lock's position:fixed trick settling
    // right after the initial measurement above), and that chrome change
    // doesn't reliably fire window's own `resize` event on all mobile
    // browsers, but visualViewport's `resize` does — catching and correcting
    // a stale initial measurement instead of leaving it wrong for the sheet's
    // whole open lifetime.
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [measure]);

  const snaps: ResolvedSnap[] = snapPoints.map((point) => {
    const height = parseSnapPoint(point, containerHeight);
    return { point, height, offset: containerHeight - height };
  });

  return { snaps, containerHeight };
};
