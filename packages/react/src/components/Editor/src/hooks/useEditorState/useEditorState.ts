import { useContext } from "react";

import { EditorContext, EditorContextProps } from "../../contexts";

export const useEditorState: () => EditorContextProps = () => {
  const context = useContext(EditorContext);
  return context;
};
