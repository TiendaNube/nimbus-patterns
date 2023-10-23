import React from "react";
import { Icon } from "@nimbus-ds/components";
import { ListIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";

import { LexicalCommand } from "lexical";
import { Button } from "../../components";
import { useEditorState } from "../../hooks";

const UnorderedList: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useEditorState();

  const onClick = (type: "ul" | "ol", command: LexicalCommand<unknown>) => {
    if (state.blockType !== type) {
      editor.dispatchCommand(command, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  return (
    <Button
      aria-label="List Unordered"
      onClick={() => onClick("ul", INSERT_UNORDERED_LIST_COMMAND)}
      selected={state.blockType === "ul"}
    >
      <Icon source={<ListIcon />} color="currentColor" />
    </Button>
  );
};

export { UnorderedList };
