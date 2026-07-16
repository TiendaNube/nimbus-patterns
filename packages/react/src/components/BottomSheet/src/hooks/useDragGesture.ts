import {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  DISMISS_DISTANCE_THRESHOLD,
  DISMISS_VELOCITY_THRESHOLD,
} from "../bottomSheet.constants";
import { ResolvedSnap } from "./useSnapPoints";

interface UseDragGestureOptions {
  snaps: ResolvedSnap[];
  snapIndex: number;
  containerHeight: number;
  onSnapChange: (index: number) => void;
  onDismiss: () => void;
}

interface DragGestureResult {
  /** Current translateY offset (px) to apply to the panel while it's visible. */
  offset: number;
  /** Whether a drag is in progress (disables the settle transition). */
  isDragging: boolean;
  /** Pointer handlers to spread onto the grabber element. */
  grabberHandlers: {
    onPointerDown: (event: ReactPointerEvent) => void;
  };
}

/** Ascending-by-height view of the snaps, each tagged with its original index. */
const sortByHeight = (snaps: ResolvedSnap[]) =>
  snaps
    .map((snap, index) => ({ ...snap, index }))
    .sort((a, b) => a.height - b.height);

/**
 * Resolves the drag target from the released offset and the last drag
 * velocity (px/ms, positive = moving down). Velocity biases toward the
 * neighboring snap in its direction even if the geometric midpoint was not
 * crossed (a fast flick), matching the DS bottom-sheet convention.
 */
const resolveDragTarget = (
  offset: number,
  velocity: number,
  snaps: ResolvedSnap[]
): { dismiss: true } | { dismiss: false; index: number } => {
  const ascending = sortByHeight(snaps);
  const lowest = ascending[0];

  const pastDismissDistance =
    offset > lowest.offset + DISMISS_DISTANCE_THRESHOLD;
  const flickingDownFromLowest =
    velocity > DISMISS_VELOCITY_THRESHOLD && offset >= lowest.offset;

  if (pastDismissDistance || flickingDownFromLowest) {
    return { dismiss: true };
  }

  let nearest = ascending.reduce((closest, snap) =>
    Math.abs(offset - snap.offset) < Math.abs(offset - closest.offset)
      ? snap
      : closest
  );

  const isFastFlick = Math.abs(velocity) > DISMISS_VELOCITY_THRESHOLD;
  if (isFastFlick) {
    const nearestPos = ascending.findIndex((s) => s.index === nearest.index);
    if (velocity > 0 && nearestPos < ascending.length - 1) {
      // Flicking down: prefer the next shorter snap unless already lowest.
      const candidate = ascending[nearestPos + 1];
      if (candidate.height < nearest.height) nearest = candidate;
    } else if (velocity < 0 && nearestPos > 0) {
      // Flicking up: prefer the next taller snap unless already highest.
      const candidate = ascending[nearestPos - 1];
      if (candidate.height > nearest.height) nearest = candidate;
    }
  }

  return { dismiss: false, index: nearest.index };
};

export const useDragGesture = ({
  snaps,
  snapIndex,
  containerHeight,
  onSnapChange,
  onDismiss,
}: UseDragGestureOptions): DragGestureResult => {
  const activeSnap = snaps[snapIndex];
  const [liveOffset, setLiveOffset] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragState = useRef<{
    startClientY: number;
    startOffset: number;
    lastClientY: number;
    lastTime: number;
    velocity: number;
    currentOffset: number;
  } | null>(null);

  const clamp = useCallback(
    (value: number) => {
      const ascending = sortByHeight(snaps);
      const minOffset = ascending[ascending.length - 1]?.offset ?? 0;
      const maxOffset =
        (ascending[0]?.offset ?? containerHeight) +
        DISMISS_DISTANCE_THRESHOLD * 2;
      return Math.min(Math.max(value, minOffset), maxOffset);
    },
    [snaps, containerHeight]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!dragState.current) return;
      const now = event.timeStamp;
      const deltaTime = now - dragState.current.lastTime || 1;
      const deltaY = event.clientY - dragState.current.lastClientY;

      dragState.current.velocity = deltaY / deltaTime;
      dragState.current.lastClientY = event.clientY;
      dragState.current.lastTime = now;

      const nextOffset =
        dragState.current.startOffset +
        (event.clientY - dragState.current.startClientY);
      const clamped = clamp(nextOffset);
      dragState.current.currentOffset = clamped;
      setLiveOffset(clamped);
    },
    [clamp]
  );

  const handlePointerUp = useCallback(() => {
    // `dragState` is a ref, not React state: handlePointerUp is registered
    // once (at pointerdown) via addEventListener and never re-attached mid
    // drag, so any state variable in its closure (e.g. `liveOffset`) would
    // stay frozen at its pointerdown-time value. Reading the live value back
    // out of the ref is what keeps this handler correct despite that.
    const drag = dragState.current;
    dragState.current = null;
    setIsDragging(false);
    setLiveOffset(null);

    if (!drag) return;

    const result = resolveDragTarget(drag.currentOffset, drag.velocity, snaps);

    if (result.dismiss) {
      onDismiss();
    } else if (result.index !== snapIndex) {
      onSnapChange(result.index);
    }

    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
  }, [snaps, snapIndex, onSnapChange, onDismiss, handlePointerMove]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (!activeSnap) return;
      dragState.current = {
        startClientY: event.clientY,
        startOffset: activeSnap.offset,
        lastClientY: event.clientY,
        lastTime: event.timeStamp,
        velocity: 0,
        currentOffset: activeSnap.offset,
      };
      setIsDragging(true);
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [activeSnap, handlePointerMove, handlePointerUp]
  );

  const offset = liveOffset ?? activeSnap?.offset ?? 0;

  return useMemo(
    () => ({
      offset,
      isDragging,
      grabberHandlers: { onPointerDown },
    }),
    [offset, isDragging, onPointerDown]
  );
};
