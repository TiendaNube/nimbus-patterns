import { createContext } from "react";
import { AppShellMenuContextValue } from "./AppShellMenuContext.types";
import { initialAppShellMenuContext } from "./AppShellMenuContext.definitions";

export const AppShellMenuContext = createContext<AppShellMenuContextValue>(
  initialAppShellMenuContext
);
