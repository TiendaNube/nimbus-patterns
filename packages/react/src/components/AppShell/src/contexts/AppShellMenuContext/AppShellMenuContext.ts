import { createContext, useContext } from "react";
import { AppShellMenuContextValue } from "./AppShellMenuContext.types";
import { initialAppShellMenuContextValue } from "./AppShellMenuContext.definitions";

export const AppShellMenuContext = createContext<
  AppShellMenuContextValue | undefined
>(undefined);

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
