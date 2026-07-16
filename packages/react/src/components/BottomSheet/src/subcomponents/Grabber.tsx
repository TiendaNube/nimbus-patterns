import React, { forwardRef } from "react";
import { Box } from "@nimbus-ds/components";

interface GrabberProps {
  onPointerDown: (event: React.PointerEvent) => void;
}

/**
 * The drag handle rendered as chrome above the header. Not part of the
 * consumer-provided header content: it is the sheet's own affordance for
 * resizing between snap points and dismissing by dragging down.
 *
 * A plain element (not Box) because it needs `touchAction: "none"` via inline
 * style, which Box silently drops (it only forwards its own sprinkle-computed
 * style, never the caller-provided `style` prop).
 */
export const Grabber = forwardRef<HTMLDivElement, GrabberProps>(
  ({ onPointerDown }, ref) => (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      role="separator"
      aria-orientation="horizontal"
      aria-label="Drag to resize or dismiss"
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
  )
);

Grabber.displayName = "Grabber";
