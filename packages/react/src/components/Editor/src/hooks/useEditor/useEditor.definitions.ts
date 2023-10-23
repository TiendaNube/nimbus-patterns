import { $getRoot, $insertNodes, LexicalEditor } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";

export const parserDOM = new DOMParser();

export const setContentHTML = (editor: LexicalEditor, value: string) => {
  const dom = parserDOM.parseFromString(value, "text/html");
  const nodes = $generateNodesFromDOM(editor, dom);
  $getRoot().select();
  $insertNodes(nodes);
};

export const setContentJSON = (editor: LexicalEditor, value: string) => {
  const state = editor.parseEditorState(value);
  editor.setEditorState(state);
};

export const isEmptyContent = () => {
  const root = $getRoot();
  return root?.getFirstChild?.()?.isEmpty() && root.getChildrenSize() === 1;
};
