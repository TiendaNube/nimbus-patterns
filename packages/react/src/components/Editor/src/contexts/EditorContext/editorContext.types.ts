import { initialContext } from "./editorContext.definitions";

// eslint-disable-next-line no-shadow
export enum EditorActionKind {
  BLOCK_TYPE = "BLOCK_TYPE",
  CAN_UNDO = "CAN_UNDO",
  CAN_REDO = "CAN_REDO",
  IS_BOLD = "IS_BOLD",
  IS_ITALIC = "IS_ITALIC",
  IS_LINK = "IS_LINK",
}

export interface EditorAction {
  type: EditorActionKind;
  payload: any;
}

export interface EditorContextProps {
  state: typeof initialContext.state;
  dispatch: (action: EditorAction) => void;
}
