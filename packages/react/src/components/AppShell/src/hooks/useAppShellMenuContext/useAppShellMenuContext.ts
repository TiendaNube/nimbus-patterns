import { useContext } from "react";
import { AppShellMenuContext } from "../../contexts/AppShellMenuContext";
import { AppShellMenuContextValue } from "../../contexts/AppShellMenuContext/AppShellMenuContext.types";

export const useAppShellMenuContext = (): AppShellMenuContextValue => {
  const context = useContext(AppShellMenuContext);

  if (!context) {
    throw new Error(
      "useAppShellMenuContext must be used within an AppShellMenuContext"
    );
  }

  return context;
};
