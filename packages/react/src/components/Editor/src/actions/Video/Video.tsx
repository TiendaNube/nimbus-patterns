import React from "react";
import { Icon } from "@nimbus-ds/components";
import { PlayIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { TollbarButton } from "../../components";
import { useToolbar } from "../../hooks";

const Video: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useToolbar();
  return (
    <TollbarButton
      aria-label="Undo"
      onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
    >
      <Icon source={<PlayIcon />} color="currentColor" />
    </TollbarButton>
  );
};

export { Video };
