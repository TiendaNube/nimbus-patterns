import React from "react";
import { Icon } from "@nimbus-ds/components";
import { RemoveFormatIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { Button } from "../../components";
import { CLEAR_FORMATTING_COMMAND } from "../../utils";

const ClearFormatting: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <Button
      aria-label="Undo"
      onClick={() =>
        editor.dispatchCommand(CLEAR_FORMATTING_COMMAND, undefined)
      }
    >
      <Icon source={<RemoveFormatIcon />} color="currentColor" />
    </Button>
  );
};

export { ClearFormatting };
