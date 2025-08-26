import { createContext, useContext } from "react";
import { AppShellMenuContextValue } from "./AppShellMenuContext.types";
import { initialAppShellMenuContext } from "./AppShellMenuContext.definitions";

export const AppShellMenuContext = createContext<AppShellMenuContextValue>(
  initialAppShellMenuContext
);

export const useAppShellMenuContext = () => {
  const context = useContext(AppShellMenuContext);

  if (!context) {
    throw new Error(
      "useAppShellMenuContext must be used within an AppShellMenuContext"
    );
  }

  return context;
};
