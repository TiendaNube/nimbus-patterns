import React from "react";
import { Icon } from "@nimbus-ds/components";
import { RemoveFormatIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { TollbarButton } from "../../components";
import { CLEAR_FORMATING_COMMAND } from "../../utils";

const ClearFormatting: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <TollbarButton
      aria-label="Undo"
      onClick={() => editor.dispatchCommand(CLEAR_FORMATING_COMMAND, undefined)}
    >
      <Icon source={<RemoveFormatIcon />} color="currentColor" />
    </TollbarButton>
  );
};

export { ClearFormatting };
