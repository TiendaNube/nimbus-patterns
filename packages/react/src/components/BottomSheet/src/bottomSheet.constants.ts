/**
 * Default snap points applied when the consumer does not provide any.
 * Values are viewport-height percentages and/or the "full" keyword.
 */
export const DEFAULT_SNAP_POINTS = ["60%", "90%", "full"] as const;

/** Index of the initial snap point used when `defaultSnap` is not provided. */
export const DEFAULT_SNAP_INDEX = 0;

/**
 * Fraction of the viewport height kept as a gap at the top when the sheet is
 * at its "full" snap, so the device status bar remains visible (from Figma).
 */
export const FULL_TOP_GAP_RATIO = 0.053;

/** Distance (px) dragged below the lowest snap that triggers a dismiss. */
export const DISMISS_DISTANCE_THRESHOLD = 96;

/** Downward velocity (px/ms) that triggers a dismiss regardless of distance. */
export const DISMISS_VELOCITY_THRESHOLD = 0.5;

/**
 * CSS transition used when the panel settles to a snap point, dismisses, or
 * repositions above the on-screen keyboard. The panel's visible size is
 * driven by `height` (anchored via `bottom`), not `transform`, so both are
 * transitioned together.
 */
export const SETTLE_TRANSITION =
  "height 300ms cubic-bezier(0.32, 0.72, 0, 1), bottom 300ms cubic-bezier(0.32, 0.72, 0, 1)";

/**
 * Maps the public "none" | "base" padding scale (matching the Sidebar/Modal
 * subcomponent convention) to the underlying Box numeric spacing scale.
 */
export const PADDING_TOKEN_MAP = {
  none: "none",
  base: "4",
} as const;

/**
 * Attribute name that, when present on a pressed element, prevents the press
 * from being treated as an outside press. Matches the Nimbus DS convention so
 * portaled Popover/Modal content does not close the sheet.
 */
export const DEFAULT_IGNORE_ATTRIBUTE_NAME = "data-nimbus-outside-press-ignore";
