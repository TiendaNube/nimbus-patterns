import { ElementNode, RangeSelection, TextNode } from "lexical";
import { $isAtNodeEnd } from "@lexical/selection";

import {
  ToolbarState,
  ToolbarAction,
  ToolbarActionKind,
} from "./toolbar.types";

export const reducer = (state: ToolbarState, action: ToolbarAction) => {
  switch (action.type) {
    case ToolbarActionKind.BLOCK_TYPE:
      return {
        ...state,
        blockType: action.payload,
      };
    case ToolbarActionKind.CAN_REDO:
      return {
        ...state,
        canRedo: action.payload,
      };
    case ToolbarActionKind.CAN_UNDO:
      return {
        ...state,
        canUndo: action.payload,
      };
    case ToolbarActionKind.IS_BOLD:
      return {
        ...state,
        isBold: action.payload,
      };
    case ToolbarActionKind.IS_ITALIC:
      return {
        ...state,
        isItalic: action.payload,
      };
    case ToolbarActionKind.IS_LINK:
      return {
        ...state,
        isLink: action.payload,
      };
    default:
      return state;
  }
};

export const getSelectedNode = (
  selection: RangeSelection
): TextNode | ElementNode => {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
  }
};
