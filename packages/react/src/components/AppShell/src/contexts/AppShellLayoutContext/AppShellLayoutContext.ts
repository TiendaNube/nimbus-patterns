import { createContext, useContext } from "react";

export interface AppShellLayoutContextValue {
  /**
   * Whether the AppShell renders a menu next to the content. Under Norte UI,
   * AppShell.Body only draws the content card when there is a menu beside it.
   */
  hasMenu: boolean;
}

/** Internal: shares AppShell layout state with its compound components. */
export const AppShellLayoutContext = createContext<AppShellLayoutContextValue>({
  hasMenu: true,
});

export const useAppShellLayoutContext = () => useContext(AppShellLayoutContext);
