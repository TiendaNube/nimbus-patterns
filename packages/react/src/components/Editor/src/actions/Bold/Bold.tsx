import React from "react";
import { Icon } from "@nimbus-ds/components";
import { BoldIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

import { Button } from "../../components";
import { useEditorState } from "../../hooks";

const Bold: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useEditorState();
  return (
    <Button
      aria-label="Format Bold"
      onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      selected={state.isBold}
    >
      <Icon source={<BoldIcon />} color="currentColor" />
    </Button>
  );
};

export { Bold };
