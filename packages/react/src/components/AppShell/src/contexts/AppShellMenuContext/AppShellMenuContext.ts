import { createContext, useContext } from "react";
import { AppShellMenuContextValue } from "./AppShellMenuContext.types";
import { initialAppShellMenuContextValue } from "./AppShellMenuContext.definitions";

export const AppShellMenuContext = createContext<
  AppShellMenuContextValue | undefined
>(undefined);

/**
 * Read AppShellMenuContext state. Useful to know if the menu is rendered as a popover/flyout.
 * @param enforce When false, returns a default value (false) if no provider is present. Adviced not to abuse, but useful for menu that Menu components that aren't always inside an AppShell.
 * @throws If `enforce=true` and used without a provider.
 */
export const useAppShellMenuContext = (enforce = true) => {
  const context = useContext(AppShellMenuContext);

  if (context === undefined) {
    if (!enforce) {
      return initialAppShellMenuContextValue;
    }

    throw new Error(
      "useAppShellMenuContext must be used within an AppShell Menu"
    );
  }

  return context;
};
