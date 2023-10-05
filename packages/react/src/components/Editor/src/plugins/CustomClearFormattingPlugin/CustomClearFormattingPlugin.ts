import { useEffect } from "react";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_NORMAL,
} from "lexical";
import { $getNearestBlockElementAncestorOrThrow } from "@lexical/utils";
import { $isHeadingNode, $isQuoteNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";

import { CLEAR_FORMATING_COMMAND } from "../../utils";

const CustomClearFormattingPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      CLEAR_FORMATING_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchor = selection.anchor;
          const focus = selection.focus;
          const nodes = selection.getNodes();

          if (anchor.key === focus.key && anchor.offset === focus.offset) {
            return true;
          }

          nodes.forEach((node, idx) => {
            // We split the first and last node by the selection
            // So that we don't format unselected text inside those nodes
            if ($isTextNode(node)) {
              if (idx === 0 && anchor.offset !== 0) {
                node = node.splitText(anchor.offset)[1] || node;
              }
              if (idx === nodes.length - 1) {
                node = node.splitText(focus.offset)[0] || node;
              }

              if (node.__style !== "") {
                node.setStyle("");
              }
              if (node.__format !== 0) {
                node.setFormat(0);
                $getNearestBlockElementAncestorOrThrow(node).setFormat("");
              }
            } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
              node.replace($createParagraphNode(), true);
            } else if ($isDecoratorBlockNode(node)) {
              node.setFormat("");
            }
          });
        }
        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, []);

  return null;
};

export { CustomClearFormattingPlugin };
