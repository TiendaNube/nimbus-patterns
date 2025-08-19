import { useContext } from "react";
import { AppShellContext, AppShellContextValue } from "../../contexts/AppShellContext";

export const useAppShellContext = (): AppShellContextValue => {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error("useAppShellContext must be used within an AppShellContext");
  }

  return context;
};
