import { BoxProps } from "@nimbus-ds/components";

/**
 * Properties specific to the AppShellChat component.
 */
export interface AppShellChatProperties {
  /**
   * Default expanded state for uncontrolled usage.
   */
  defaultExpanded?: boolean;
  /**
   * Whether the chat panel is expanded to overlay mode, filling the parent container area.
   * The overlay auto-detects the parent bounds (respecting menu and header).
   */
  expanded?: boolean;
  /**
   * Width of the chat panel in collapsed (non-expanded) mode.
   * Accepts any valid CSS length value (e.g. "300px", "25vw") or a responsive
   * object keyed by breakpoint (e.g. `{ xs: "300px", xxl: "378px" }`).
   * Useful for consumer-controlled resize interactions such as a drag handle.
   * When omitted, defaults to the responsive `{ xs: "300px", xxl: "378px" }`.
   */
  collapsedWidth?: NonNullable<BoxProps["maxWidth"]>;
}

export type AppShellChatProps = AppShellChatProperties &
  Omit<BoxProps, "position">;
