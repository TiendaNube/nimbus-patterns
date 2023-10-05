import React, { useCallback } from "react";
import { Icon } from "@nimbus-ds/components";
import { LinkIcon } from "@nimbus-ds/icons";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { TollbarButton } from "../../components";
import { useToolbar } from "../../hooks";
import { sanitizeUrl } from "./link.definitions";

const Link: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useToolbar();

  const insertLink = useCallback(() => {
    if (!state.isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, state.isLink]);

  return (
    <TollbarButton aria-label="Undo" onClick={insertLink}>
      <Icon source={<LinkIcon />} color="currentColor" />
    </TollbarButton>
  );
};

export { Link };
