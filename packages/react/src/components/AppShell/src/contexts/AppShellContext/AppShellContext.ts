import { createContext } from "react";
import { AppShellContextValue } from "./AppShellContext.types";

export const AppShellContext = createContext<AppShellContextValue>({
  isMenuCollapsed: false,
});
