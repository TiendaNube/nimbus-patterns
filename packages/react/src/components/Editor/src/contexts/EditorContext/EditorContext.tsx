import { createContext } from "react";
import { EditorContextProps } from "./editorContext.types";
import { initialEditorContext } from "./editorContext.definitions";

export const EditorContext = createContext<EditorContextProps>(
  initialEditorContext as EditorContextProps
);
