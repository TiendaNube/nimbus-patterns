import { createContext } from "react";
import { AppShellContextValue } from "./AppShellContext.types";
import { initialAppShellContext } from "./AppShellContext.definitions";

export const AppShellContext = createContext<AppShellContextValue>(
  initialAppShellContext as AppShellContextValue
);
