import React from "react";
import { Icon } from "@nimbus-ds/components";
import { PlayIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { UNDO_COMMAND } from "lexical";
import { Button } from "../../components";

const Video: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <Button
      aria-label="Undo"
      onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
    >
      <Icon source={<PlayIcon />} color="currentColor" />
    </Button>
  );
};

export { Video };
