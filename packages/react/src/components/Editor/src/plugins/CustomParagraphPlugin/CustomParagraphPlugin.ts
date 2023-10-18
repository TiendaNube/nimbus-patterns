import { useEffect } from "react";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { $setBlocksType } from "@lexical/selection";
import { FORMAT_PARAGRAPH_COMMAND } from "../../utils";

const CustomParagraphPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      FORMAT_PARAGRAPH_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor]);

  return null;
};

export { CustomParagraphPlugin };
