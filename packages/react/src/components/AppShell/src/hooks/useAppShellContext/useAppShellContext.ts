import { useContext } from "react";
import { AppShellContext } from "../../contexts/AppShellContext";
import { AppShellContextValue } from "../../contexts/AppShellContext/AppShellContext.types";

export const useAppShellContext = (): AppShellContextValue => {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error(
      "useAppShellContext must be used within an AppShellContext"
    );
  }

  return context;
};
