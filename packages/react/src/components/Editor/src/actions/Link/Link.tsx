import React, { useCallback } from "react";
import { Icon } from "@nimbus-ds/components";
import { LinkIcon } from "@nimbus-ds/icons";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { Button } from "../../components";
import { useEditorState } from "../../hooks";
import { sanitizeUrl } from "./link.definitions";

const Link: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useEditorState();

  const insertLink = useCallback(() => {
    if (!state.isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, state.isLink]);

  return (
    <Button aria-label="Undo" onClick={insertLink} selected={state.isLink}>
      <Icon source={<LinkIcon />} color="currentColor" />
    </Button>
  );
};

export { Link };
