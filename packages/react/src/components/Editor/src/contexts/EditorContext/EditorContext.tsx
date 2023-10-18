import { createContext } from "react";
import { EditorContextProps } from "./editorContext.types";
import { initialContext } from "./editorContext.definitions";

export const EditorContext = createContext<EditorContextProps>(
  initialContext as EditorContextProps
);
