import React from "react";
import { Box, Icon, Text, Popover } from "@nimbus-ds/components";
import { TextSizeIcon } from "@nimbus-ds/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { useEditorState } from "../../hooks";
import { headerTranslations, supportedHeaderTypes } from "./header.definitions";

const Header: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const { state } = useEditorState();

  return (
    <Popover
      width="fit-content"
      padding="small"
      offset={8}
      content={
        <Box display="flex" flexDirection="column" gap="1">
          {supportedHeaderTypes.map((supportedHeaderType) => (
            <Box
              key={supportedHeaderType.tag}
              as="button"
              type="button"
              cursor="pointer"
              borderWidth="none"
              color="primary-interactive"
              display="flex"
              gap="1"
              p="2"
              borderRadius="1"
              backgroundColor={{
                hover: "primary-surface",
                xs:
                  state.blockType === supportedHeaderType.tag
                    ? "primary-surface"
                    : "transparent",
              }}
              onClick={() =>
                editor.dispatchCommand(
                  supportedHeaderType.command,
                  supportedHeaderType.tag
                )
              }
            >
              <Icon source={<TextSizeIcon />} color="currentColor" />
              <Text color="currentColor">
                {headerTranslations[supportedHeaderType.tag]}
              </Text>
            </Box>
          ))}
        </Box>
      }
      arrow={false}
      position="bottom-start"
    >
      <Box
        as="button"
        type="button"
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
        <Box display={{ xs: "none", md: "flex" }}>
          {headerTranslations[state.blockType] && (
            <Text as="span" color="currentColor">
              {headerTranslations[state.blockType]}
            </Text>
          )}
        </Box>
      </Box>
    </Popover>
  );
};

export { Header };
