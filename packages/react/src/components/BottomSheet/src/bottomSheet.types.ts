import { FC, HTMLAttributes, ReactNode } from "react";

export type BottomSheetPadding = "none" | "base";

/**
 * A snap point expressed as a viewport-height percentage (e.g. "60%") or the
 * keyword "full" (which stops just below the status bar, not full-bleed).
 */
export type BottomSheetSnapPoint = `${number}%` | "full";

/**
 * Predicate variant of `closeOnOutsidePress`: receives the DOM event and
 * returns `true` to allow closing, `false` to ignore the press.
 */
export type CloseOnOutsidePress = (event: PointerEvent | MouseEvent) => boolean;

export interface BottomSheetProperties {
  /**
   * Determines if the bottom sheet is shown or not.
   * @default false
   */
  open?: boolean;
  /**
   * Callback fired when the component requests to be closed (overlay press,
   * close control, Escape, or a downward dismiss gesture).
   * () => void;
   */
  onRemove?: () => void;
  /**
   * Ordered list of heights the sheet can snap to. Each entry is a
   * viewport-height percentage (e.g. "60%") or the keyword "full".
   * @default ["60%", "90%", "full"]
   */
  snapPoints?: BottomSheetSnapPoint[];
  /**
   * Index within `snapPoints` used as the initial snap point.
   * @default 0
   */
  defaultSnap?: number;
  /**
   * Content of the sheet. Compose with BottomSheet.Header, BottomSheet.Body
   * and BottomSheet.Footer.
   * @TJS-type React.ReactNode
   */
  children?: ReactNode;
  /**
   * Controls whether pressing outside should close the sheet.
   * - boolean: enable/disable dismissal on outside press
   * - function: receive the DOM event and return true to allow closing
   * @default true
   */
  closeOnOutsidePress?: boolean | CloseOnOutsidePress;
  /**
   * The attribute name to ignore when checking for outside presses, so
   * portaled Popover/Modal content does not close the sheet.
   * @default "data-nimbus-outside-press-ignore"
   */
  ignoreAttributeName?: string;
  /**
   * Determines if background scroll is locked while the sheet is open.
   * @default true
   */
  needRemoveScroll?: boolean;
  /**
   * Explicit z-index for the sheet layer. Omitted by default: like Nimbus's
   * own Sidebar/Modal/Popover, the sheet relies on DOM mount order rather
   * than a z-index. Its portal mounts into the nearest Nimbus
   * <ThemeProvider>'s own wrapper element (the same container
   * Sidebar/Modal/Popover portal into), falling back to document.body only
   * when no ThemeProvider is present. In both cases, later-mounted siblings
   * paint on top of earlier ones as long as neither sets a z-index, so this
   * keeps the sheet correctly stacked against Popover and other BottomSheet
   * instances. Only set this to force a specific stacking order against
   * something outside that convention.
   */
  zIndex?: number;
}

/**
 * Public props for `BottomSheet`. Combines `BottomSheetProperties` (the
 * sheet's own behavior — visibility, snap points, dismissal, stacking) with
 * `root` and every native `div` attribute except `color`.
 */
export type BottomSheetProps = BottomSheetProperties & {
  /**
   * Root element where the portal should be mounted. When provided and not
   * null, the portal renders inside this element. Otherwise it renders into
   * the nearest Nimbus <ThemeProvider>'s own wrapper element (same as
   * Sidebar/Modal/Popover), so it inherits the active theme's CSS custom
   * properties and stacks correctly against them; it falls back to
   * document.body only when no ThemeProvider is present. Useful to scope the
   * sheet within a container (e.g., AppShell.Chat).
   */
  root?: HTMLElement | null;
  // "color" is omitted because HTMLAttributes carries the native (deprecated)
  // HTML color attribute, which conflicts with Box's own token-enum `color` prop.
} & Omit<HTMLAttributes<HTMLDivElement>, "color">;

export interface BottomSheetHeaderProperties {
  /**
   * The content of the sheet header. Accepts any node (title, actions, icons).
   * @TJS-type React.ReactNode
   */
  children?: ReactNode;
  /**
   * The padding around the header content area.
   * @default base
   */
  padding?: BottomSheetPadding;
}

/**
 * Public props for `BottomSheet.Header`. Combines `BottomSheetHeaderProperties`
 * with every native element attribute except `color` (same reason as
 * `BottomSheetProps`: it conflicts with Box's own color-token sprinkle).
 */
export type BottomSheetHeaderProps = BottomSheetHeaderProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;

export interface BottomSheetBodyProperties {
  /**
   * The scrollable content of the sheet.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The padding around the body content area.
   * @default base
   */
  padding?: BottomSheetPadding;
}

/**
 * Public props for `BottomSheet.Body`. Combines `BottomSheetBodyProperties`
 * (`children` is required, unlike `Header`'s) with every native element
 * attribute except `color`.
 */
export type BottomSheetBodyProps = BottomSheetBodyProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;

export interface BottomSheetFooterProperties {
  /**
   * The content of the sheet footer.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The padding around the footer content area.
   * @default base
   */
  padding?: BottomSheetPadding;
}

/**
 * Public props for `BottomSheet.Footer`. Combines `BottomSheetFooterProperties`
 * (`children` is required, same as `Body`) with every native element
 * attribute except `color`. `BottomSheet.Footer` itself is optional to
 * render at all — omitting it entirely is how a sheet renders without a
 * footer region.
 */
export type BottomSheetFooterProps = BottomSheetFooterProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;

/**
 * The composable subcomponents attached to `BottomSheet`
 * (`BottomSheet.Header`, `BottomSheet.Body`, `BottomSheet.Footer`), used to
 * compose the sheet's `children`.
 */
export interface BottomSheetComponents {
  /** Chrome region above the body; the drag grabber is pinned above it. */
  Header: FC<BottomSheetHeaderProps>;
  /** The scrollable content region. */
  Body: FC<BottomSheetBodyProps>;
  /** Optional chrome region below the body (e.g. action buttons). */
  Footer: FC<BottomSheetFooterProps>;
}
