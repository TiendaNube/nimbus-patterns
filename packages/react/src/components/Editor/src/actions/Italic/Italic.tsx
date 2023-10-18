import React from "react";
import { Icon } from "@nimbus-ds/components";
import { ItalicIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

import { Button } from "../../components";
import { useEditorState } from "../../hooks";

const Italic: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useEditorState();
  return (
    <Button
      aria-label="Format ItalicIcon"
      onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      selected={state.isItalic}
    >
      <Icon source={<ItalicIcon />} color="currentColor" />
    </Button>
  );
};

export { Italic };
