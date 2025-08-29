import { createContext, useContext } from "react";
import { AppShellMenuContextValue } from "./AppShellMenuContext.types";

export const AppShellMenuContext = createContext<
  AppShellMenuContextValue | undefined
>(undefined);

export const useAppShellMenuContext = () => {
  const context = useContext(AppShellMenuContext);

  if (context === undefined) {
    throw new Error(
      "useAppShellMenuContext must be used within an AppShell Menu"
    );
  }

  return context;
};
