import React, { forwardRef } from "react";
import { Box } from "@nimbus-ds/components";

import { DEFAULT_GRABBER_LABEL } from "../bottomSheet.constants";
import { clampIndex } from "../bottomSheet.utils";

interface GrabberProps {
  onPointerDown: (event: React.PointerEvent) => void;
  /** Index of the currently active snap, for aria-valuenow and stepping. */
  snapIndex: number;
  /** Total number of snap points, for aria-valuemax and clamping. */
  snapCount: number;
  /** Same setter BottomSheet's drag gesture uses to change the active snap. */
  onSnapChange: (index: number) => void;
  /** Accessible name (`aria-label`). Forwarded from BottomSheet's `grabberLabel` prop. */
  // eslint-disable-next-line react/require-default-props
  label?: string;
  /**
   * Hides the visible pill (opacity only — the drag/keyboard-resize target
   * itself keeps its full size and stays interactive) once the panel is
   * flush with the viewport's top edge: with no room left to drag further
   * up, the handle reads as a leftover "sheet" artifact instead of a
   * deliberate full-screen surface.
   */
  // eslint-plugin-react's require-default-props expects a runtime
  // `defaultProps` static, which TypeScript's ForwardRefExoticComponent type
  // (this component's own type, from `forwardRef` below) doesn't declare —
  // assigning one is a type error. The destructured default in the
  // implementation below (`pillHidden = false`) is the correct TS pattern
  // for an optional prop on a forwardRef component.
  // eslint-disable-next-line react/require-default-props
  pillHidden?: boolean;
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
  (
    {
      onPointerDown,
      snapIndex,
      snapCount,
      onSnapChange,
      pillHidden = false,
      label = DEFAULT_GRABBER_LABEL
    },
    ref
  ) => {
    const maxIndex = Math.max(snapCount - 1, 0);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          onSnapChange(clampIndex(snapIndex + 1, snapCount));
          break;
        case "ArrowDown":
          event.preventDefault();
          onSnapChange(clampIndex(snapIndex - 1, snapCount));
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
      // Purely a layout frame for the visible chrome row (28px tall) — no
      // ARIA role, no handlers. The actual interactive element is the
      // centered circle below; this div only reserves its visual space and
      // positions the decorative pill.
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          width: "100%",
          height: "28px",
          boxSizing: "border-box"
        }}
      >
        {/*
          A "separator" is non-interactive by default, but the ARIA APG
          explicitly allows a focusable, keyboard-operable "movable splitter"
          variant (which is what this is — see the ArrowUp/Down/Home/End
          handling above), so the tabIndex and event handlers here are
          intentional, not an oversight.

          Sized around a comfortable fingertip contact area for grabbing and
          dragging the pill — its footprint is meant to match how a finger
          actually lands on the handle, not just the pill's own thin visual
          size. Deliberately a circle, not a full-width band: narrows the
          draggable area to right around the pill for precision, trading off
          edge-to-edge dragging.

          Overlaps 8px above the sheet's own top edge into the backdrop —
          confirmed safe since BottomSheet's panel has no `overflow: hidden`
          (see BottomSheet.tsx's comment on that). It also overlaps ~20px
          below the row, into whatever the consumer renders next (Header,
          or Body with no Header) — intentional, same reasoning as the
          backdrop side: that centered band is the pill's own space.
        */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
        <div
          ref={ref}
          onPointerDown={onPointerDown}
          onKeyDown={handleKeyDown}
          role="separator"
          aria-orientation="horizontal"
          aria-label={label}
          aria-valuenow={snapIndex}
          aria-valuemin={0}
          aria-valuemax={maxIndex}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          style={{
            position: "absolute",
            top: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            touchAction: "none",
            cursor: "grab",
            boxSizing: "border-box"
          }}
        >
          {/* Plain div wrapper, not Box: Box silently drops any caller-provided
              `style` prop (see BottomSheet.tsx's own comment on the same
              gotcha), and `opacity` isn't one of its sprinkle props either.
              Positioned absolutely at 16px from this circle's own top edge —
              since the circle itself starts 8px above the row, that lands the
              pill exactly 8px below the row's top, same spot it always sat
              at before the touch target grew. */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: pillHidden ? 0 : 1,
              transition: "opacity 300ms cubic-bezier(0.32, 0.72, 0, 1)"
            }}
          >
            <Box
              width="44px"
              height="4px"
              backgroundColor="neutral-surfaceHighlight"
              borderRadius="full"
            />
          </div>
        </div>
      </div>
    );
  }
);

Grabber.displayName = "Grabber";
