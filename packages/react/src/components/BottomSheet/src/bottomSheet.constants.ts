/**
 * Default snap points applied when the consumer does not provide any.
 * Values are viewport-height percentages and/or the "full" keyword.
 */
export const DEFAULT_SNAP_POINTS = ["60%", "90%", "full"] as const;

/** Index of the initial snap point used when `defaultSnap` is not provided. */
export const DEFAULT_SNAP_INDEX = 0;

/** Distance (px) dragged below the lowest snap that triggers a dismiss. */
export const DISMISS_DISTANCE_THRESHOLD = 96;

/** Downward velocity (px/ms) that triggers a dismiss regardless of distance. */
export const DISMISS_VELOCITY_THRESHOLD = 0.5;

/**
 * Milliseconds of no `pointermove` before release after which the last
 * recorded drag velocity is treated as stale (reset to 0) instead of still
 * biasing the release toward a flick-style dismiss/snap. Without this, a fast
 * flick followed by the pointer coming to rest (held still, not lifted) for
 * longer than this keeps reading as "still flicking" at release, even though
 * the gesture visually ended at rest.
 */
export const VELOCITY_IDLE_RESET_MS = 100;

/**
 * CSS transition used when the panel settles to a snap point, dismisses, or
 * repositions above the on-screen keyboard. The panel's visible size is
 * driven by `height` (anchored via `bottom`), not `transform`, so both are
 * transitioned together — plus the top corners' own radius, which animates
 * in sync as the panel reaches (or leaves) flush-with-the-top ("full").
 */
export const SETTLE_TRANSITION =
  "height 300ms cubic-bezier(0.32, 0.72, 0, 1), bottom 300ms cubic-bezier(0.32, 0.72, 0, 1), border-radius 300ms cubic-bezier(0.32, 0.72, 0, 1)";

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

/**
 * The wrapper attribute every floating-ui-based Nimbus overlay (Popover,
 * Modal, Sidebar) renders its content into. Shared by useDismissHandlers
 * (a press inside one shouldn't dismiss the sheet) and useScrollLock (a
 * touch-scroll inside one shouldn't be cancelled) so both stay in sync if
 * this ever changes, instead of each hardcoding its own copy of the literal.
 */
export const FLOATING_UI_PORTAL_SELECTOR = "[data-floating-ui-portal]";

/** Default accessible name for the Grabber when the consumer doesn't override it via `grabberLabel`. */
export const DEFAULT_GRABBER_LABEL = "Drag to resize or dismiss";
