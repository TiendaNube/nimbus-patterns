import React from "react";
import { Box, Icon, Text, Popover } from "@nimbus-ds/components";
import { TextSizeIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { useToolbar } from "../../hooks";
import { supportedBlockTypes } from "./block.definitions";

const Block: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useToolbar();
  return (
    <Popover
      width="fit-content"
      offset={5}
      content={
        <Box display="flex" flexDirection="column">
          {supportedBlockTypes.map((supportedBlockType) => (
            <Box as="button" key={supportedBlockType}>
              {supportedBlockType}
            </Box>
          ))}
        </Box>
      }
      arrow={false}
      position="bottom-start"
    >
      <Box
        as="button"
        aria-label="Formatting options for text style"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1"
        p="2"
        borderWidth="none"
        borderRadius="1"
        color="primary-interactive"
        backgroundColor={{
          hover: "primary-surface",
          xs: "transparent",
        }}
        cursor="pointer"
      >
        <Icon source={<TextSizeIcon />} color="currentColor" />
        <Text as="span" color="currentColor">
          {state.blockType}
        </Text>
      </Box>
    </Popover>
  );
};

export { Block };
