import { LexicalNode } from "lexical";
import { PointType } from "lexical/LexicalSelection";
import { $getNearestBlockElementAncestorOrThrow } from "@lexical/utils";

export const isCursorAtTheSamePosition = (
  anchor: PointType,
  focus: PointType
) => anchor.key === focus.key && anchor.offset === focus.offset;

export const clearNodeFormatting = (node: LexicalNode) => {
  // eslint-disable-next-line no-underscore-dangle
  if (node.__style !== "") {
    node.setStyle("");
  }
  // eslint-disable-next-line no-underscore-dangle
  if (node.__format !== 0) {
    node.setFormat(0);
    $getNearestBlockElementAncestorOrThrow(node).setFormat("");
  }
};
