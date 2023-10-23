import React from "react";
import { Icon } from "@nimbus-ds/components";
import { PlayIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_EMBED_COMMAND } from "@lexical/react/LexicalAutoEmbedPlugin";

import { Button } from "../../components";
import { YoutubeEmbedConfig } from "../../plugins";

const Video: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <Button
      aria-label="Insert Video"
      onClick={() =>
        editor.dispatchCommand(INSERT_EMBED_COMMAND, YoutubeEmbedConfig.type)
      }
    >
      <Icon source={<PlayIcon />} color="currentColor" />
    </Button>
  );
};

export { Video };
