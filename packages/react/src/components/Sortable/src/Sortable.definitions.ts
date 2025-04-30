import { DragOverlayProps } from "@dnd-kit/core";

export const orientation = {
  vertical: "vertical",
  horizontal: "horizontal",
} as const;

/**
 * Default overlay settings with no animation duration
 */
export const DEFAULT_OVERLAY_SETTINGS: DragOverlayProps = {
  dropAnimation: {
    duration: 0,
    easing: "ease",
  },
};
