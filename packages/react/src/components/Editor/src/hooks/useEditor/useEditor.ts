import { EditorState, LexicalEditor } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";

import { useEditorProps } from "./useEditor.types";
import {
  setContentHTML,
  setContentJSON,
  isEmptyContent,
} from "./useEditor.definitions";

export const useEditor = ({
  parser,
  onChange: handleChange,
}: useEditorProps) => {
  const setContent = (editor: LexicalEditor, value?: string) => {
    if (!value) return false;
    switch (parser) {
      case "html":
        return setContentHTML(editor, value);
      default:
        return setContentJSON(editor, value);
    }
  };

  const onChangeJSON = (editorState: EditorState) => {
    const editorContentJSON = editorState.toJSON();
    handleChange?.(JSON.stringify(editorContentJSON));
    return editorContentJSON;
  };

  const onChangeHTML = (editorState: EditorState, editor: LexicalEditor) => {
    const editorContentHtml = editorState.read(() => {
      if (isEmptyContent()) return "";
      return $generateHtmlFromNodes(editor);
    });
    handleChange?.(editorContentHtml);
    return editorContentHtml;
  };

  const onChangeEditor = (editorState: EditorState, editor: LexicalEditor) => {
    switch (parser) {
      case "html":
        return onChangeHTML(editorState, editor);
      default:
        return onChangeJSON(editorState);
    }
  };

  const onError = (error: Error) => {
    console.error(error);
  };

  return { setContent, onChangeEditor, onError };
};
