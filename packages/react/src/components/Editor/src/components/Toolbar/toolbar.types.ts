import { initialContext } from "../../contexts";

export enum ToolbarActionKind {
  BLOCK_TYPE = "BLOCK_TYPE",
  CAN_UNDO = "CAN_UNDO",
  CAN_REDO = "CAN_REDO",
  IS_BOLD = "IS_BOLD",
  IS_ITALIC = "IS_ITALIC",
  IS_LINK = "IS_LINK",
}

export interface ToolbarAction {
  type: ToolbarActionKind;
  payload: any;
}

export type ToolbarState = typeof initialContext.state;
