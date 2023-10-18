import React from "react";
import { Icon } from "@nimbus-ds/components";
import { OrderedListIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";

import { LexicalCommand } from "lexical";
import { Button } from "../../components";
import { useEditorState } from "../../hooks";

const OrderedList: React.FC = () => {
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
      aria-label="List Ordered"
      onClick={() => onClick("ol", INSERT_ORDERED_LIST_COMMAND)}
      selected={state.blockType === "ol"}
    >
      <Icon source={<OrderedListIcon />} color="currentColor" />
    </Button>
  );
};

export { OrderedList };
