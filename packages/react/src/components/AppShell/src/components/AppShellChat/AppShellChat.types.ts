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
}

export type AppShellChatProps = AppShellChatProperties &
  Omit<BoxProps, "position">;
