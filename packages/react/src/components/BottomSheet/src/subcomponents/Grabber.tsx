import React, { forwardRef } from "react";
import { Box } from "@nimbus-ds/components";

interface GrabberProps {
  onPointerDown: (event: React.PointerEvent) => void;
  /** Index of the currently active snap, for aria-valuenow and stepping. */
  snapIndex: number;
  /** Total number of snap points, for aria-valuemax and clamping. */
  snapCount: number;
  /** Same setter BottomSheet's drag gesture uses to change the active snap. */
  onSnapChange: (index: number) => void;
}

/**
 * The drag handle rendered as chrome above the header. Not part of the
 * consumer-provided header content: it is the sheet's own affordance for
 * resizing between snap points and dismissing by dragging down.
 *
 * A plain element (not Box) because it needs `touchAction: "none"` via inline
 * style, which Box silently drops (it only forwards its own sprinkle-computed
 * style, never the caller-provided `style` prop).
 *
 * Also keyboard-operable: focusable (`tabIndex={0}`) with ArrowUp/ArrowDown
 * stepping to the adjacent snap and Home/End jumping to the lowest/tallest
 * one, matching the ARIA "separator" pattern for a horizontal splitter
 * (`aria-valuenow`/`min`/`max` track the active snap index). Keyboard-driven
 * changes never dismiss — only a pointer drag past the threshold does.
 */
export const Grabber = forwardRef<HTMLDivElement, GrabberProps>(
  ({ onPointerDown, snapIndex, snapCount, onSnapChange }, ref) => {
    const maxIndex = Math.max(snapCount - 1, 0);
    const clampIndex = (index: number) =>
      Math.min(Math.max(index, 0), maxIndex);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          onSnapChange(clampIndex(snapIndex + 1));
          break;
        case "ArrowDown":
          event.preventDefault();
          onSnapChange(clampIndex(snapIndex - 1));
          break;
        case "Home":
          event.preventDefault();
          onSnapChange(0);
          break;
        case "End":
          event.preventDefault();
          onSnapChange(maxIndex);
          break;
        default:
          break;
      }
    };

    return (
      // A "separator" is non-interactive by default, but the ARIA APG
      // explicitly allows a focusable, keyboard-operable "movable splitter"
      // variant (which is what this is — see the ArrowUp/Down/Home/End
      // handling above), so the tabIndex and event handlers here are
      // intentional, not an oversight.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onKeyDown={handleKeyDown}
        role="separator"
        aria-orientation="horizontal"
        aria-label="Drag to resize or dismiss"
        aria-valuenow={snapIndex}
        aria-valuemin={0}
        aria-valuemax={maxIndex}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingTop: "var(--nimbus-spacing-2)",
          paddingBottom: "var(--nimbus-spacing-2)",
          touchAction: "none",
          cursor: "grab",
          boxSizing: "border-box",
        }}
      >
        <Box
          width="44px"
          height="4px"
          backgroundColor="neutral-surfaceHighlight"
          borderRadius="full"
        />
      </div>
    );
  }
);

Grabber.displayName = "Grabber";
