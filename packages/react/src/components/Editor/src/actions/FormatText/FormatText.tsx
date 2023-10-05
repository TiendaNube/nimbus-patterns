import React from "react";
import { Icon } from "@nimbus-ds/components";
import { BoldIcon, ItalicIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

import { TollbarButton } from "../../components";
import { useToolbar } from "../../hooks";

const FormatText: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useToolbar();
  return (
    <>
      <TollbarButton
        aria-label="Format Bold"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        selected={state.isBold}
      >
        <Icon source={<BoldIcon />} color="currentColor" />
      </TollbarButton>
      <TollbarButton
        aria-label="Format ItalicIcon"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        selected={state.isItalic}
      >
        <Icon source={<ItalicIcon />} color="currentColor" />
      </TollbarButton>
    </>
  );
};

export { FormatText };
