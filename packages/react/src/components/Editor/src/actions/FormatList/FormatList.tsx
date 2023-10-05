import React from "react";
import { Icon } from "@nimbus-ds/components";
import { ListIcon, OrderedListIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";

import { TollbarButton } from "../../components";
import { useToolbar } from "../../hooks";
import { LexicalCommand } from "lexical";

const FormatList: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useToolbar();

  const onClick = (type: "ul" | "ol", command: LexicalCommand<unknown>) => {
    if (state.blockType !== type) {
      editor.dispatchCommand(command, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  return (
    <>
      <TollbarButton
        aria-label="List Ordered"
        onClick={() => onClick("ol", INSERT_ORDERED_LIST_COMMAND)}
        selected={state.blockType === "ol"}
      >
        <Icon source={<OrderedListIcon />} color="currentColor" />
      </TollbarButton>
      <TollbarButton
        aria-label="List Unordered"
        onClick={() => onClick("ul", INSERT_UNORDERED_LIST_COMMAND)}
        selected={state.blockType === "ul"}
      >
        <Icon source={<ListIcon />} color="currentColor" />
      </TollbarButton>
    </>
  );
};

export { FormatList };
