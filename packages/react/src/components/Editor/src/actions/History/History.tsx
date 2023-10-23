import React, { useEffect } from "react";
import { Icon } from "@nimbus-ds/components";
import { RedoIcon, UndoIcon } from "@nimbus-ds/icons";
import { mergeRegister } from "@lexical/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";

import { EditorActionKind } from "../../contexts";
import { Button } from "../../components";
import { useEditorState } from "../../hooks";

const History: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state, dispatch } = useEditorState();

  useEffect(() => {
    mergeRegister(
      editor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          dispatch({
            type: EditorActionKind.CAN_UNDO,
            payload,
          });
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          dispatch({
            type: EditorActionKind.CAN_REDO,
            payload,
          });
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [editor, dispatch]);

  return (
    <>
      <Button
        aria-label="Undo"
        disabled={!state.canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <Icon source={<UndoIcon />} color="currentColor" />
      </Button>
      <Button
        aria-label="Redo"
        disabled={!state.canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <Icon source={<RedoIcon />} color="currentColor" />
      </Button>
    </>
  );
};

export { History };
