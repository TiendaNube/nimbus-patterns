import { ElementNode, RangeSelection, TextNode } from "lexical";
import { $isAtNodeEnd } from "@lexical/selection";
import {
  EditorAction,
  EditorActionKind,
  initialEditorContext,
} from "../../contexts";

export const GAP = 16;
export const PADDING = 16;
export const ELIPSIS_BUTTON = 32;

export const reducer = (
  state: typeof initialEditorContext.state,
  action: EditorAction
) => {
  switch (action.type) {
    case EditorActionKind.BLOCK_TYPE:
      return {
        ...state,
        blockType: action.payload,
      };
    case EditorActionKind.CAN_REDO:
      return {
        ...state,
        canRedo: action.payload,
      };
    case EditorActionKind.CAN_UNDO:
      return {
        ...state,
        canUndo: action.payload,
      };
    case EditorActionKind.IS_BOLD:
      return {
        ...state,
        isBold: action.payload,
      };
    case EditorActionKind.IS_ITALIC:
      return {
        ...state,
        isItalic: action.payload,
      };
    case EditorActionKind.IS_LINK:
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
  const { anchor } = selection;
  const { focus } = selection;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  }
  return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
};
