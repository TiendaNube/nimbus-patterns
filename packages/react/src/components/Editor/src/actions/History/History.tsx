import React from "react";
import { Icon } from "@nimbus-ds/components";
import { RedoIcon, UndoIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { REDO_COMMAND, UNDO_COMMAND } from "lexical";

import { TollbarButton } from "../../components";
import { useToolbar } from "../../hooks";

const History: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useToolbar();
  return (
    <>
      <TollbarButton
        aria-label="Undo"
        disabled={!state.canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <Icon source={<UndoIcon />} color="currentColor" />
      </TollbarButton>
      <TollbarButton
        aria-label="Redo"
        disabled={!state.canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <Icon source={<RedoIcon />} color="currentColor" />
      </TollbarButton>
    </>
  );
};

export { History };
