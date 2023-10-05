import { createContext } from "react";
import { ToolbarContextProps } from "./toolbarContext.types";
import { initialContext } from "./toolbarContext.definitions";

export const ToolbarContext = createContext<ToolbarContextProps>(
  initialContext as ToolbarContextProps
);
