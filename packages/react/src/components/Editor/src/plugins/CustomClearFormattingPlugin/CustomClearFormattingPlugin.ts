import { useEffect } from "react";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_NORMAL,
} from "lexical";
import { $isHeadingNode, $isQuoteNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";

import { CLEAR_FORMATTING_COMMAND } from "../../utils";
import {
  clearNodeFormatting,
  isCursorAtTheSamePosition,
} from "./customClear.definitions";

const CustomClearFormattingPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      CLEAR_FORMATTING_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const { anchor, focus } = selection;
          const nodes = selection.getNodes();

          if (isCursorAtTheSamePosition(anchor, focus)) {
            return true;
          }

          nodes.forEach((node, idx) => {
            if ($isTextNode(node)) {
              if (idx === 0 && anchor.offset !== 0) {
                node = node.splitText(anchor.offset)[1] || node; // eslint-disable-line no-param-reassign
              }
              if (idx === nodes.length - 1) {
                node = node.splitText(focus.offset)[0] || node; // eslint-disable-line no-param-reassign
              }
              clearNodeFormatting(node);
            } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
              node.replaceWith($createParagraphNode(), true);
            } else if ($isDecoratorBlockNode(node)) {
              clearNodeFormatting(node);
            }
          });
        }
        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor]);

  return null;
};

export { CustomClearFormattingPlugin };
