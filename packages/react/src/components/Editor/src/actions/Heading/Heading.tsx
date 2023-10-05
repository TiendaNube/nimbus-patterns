import React from "react";
import { Box, Icon, Text, Popover } from "@nimbus-ds/components";
import { TextSizeIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { useToolbar } from "../../hooks";
import {
  headingTranslations,
  supportedHeadingTypes,
} from "./heading.definitions";

const Heading: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useToolbar();

  return (
    <Popover
      width="fit-content"
      offset={5}
      content={
        <Box display="flex" flexDirection="column" gap="2">
          {supportedHeadingTypes.map((supportedHeadingType) => (
            <Box
              key={supportedHeadingType.tag}
              as="button"
              onClick={() =>
                editor.dispatchCommand(
                  supportedHeadingType.command,
                  supportedHeadingType.tag
                )
              }
            >
              {headingTranslations[supportedHeadingType.tag]}
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
        justifyContent="flex-start"
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
        {headingTranslations[state.blockType] && (
          <Text as="span" color="currentColor">
            {headingTranslations[state.blockType]}
          </Text>
        )}
      </Box>
    </Popover>
  );
};

export { Heading };
