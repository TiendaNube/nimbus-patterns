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
   * Accepts any valid CSS length value (e.g. "300px", "25vw").
   * Useful for consumer-controlled resize interactions such as a drag handle.
   * Defaults to "300px".
   */
  collapsedWidth?: string;
}

export type AppShellChatProps = AppShellChatProperties &
  Omit<BoxProps, "position">;
