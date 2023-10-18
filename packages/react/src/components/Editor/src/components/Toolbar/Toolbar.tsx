import React, { useEffect, useState, useRef } from "react";
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from "lexical";
import { Box, Icon, Text, Popover } from "@nimbus-ds/components";
import { EllipsisIcon } from "@nimbus-ds/icons";
import { mergeRegister } from "@lexical/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { headerTranslations } from "../../actions/Header/header.definitions";
import { EditorContext } from "../../contexts";
import { useToolbar } from "../../hooks";
import { Button } from "../Button";
import { ToolbarProps } from "./toolbar.types";
import { ELIPSIS_BUTTON, PADDING } from "./toolbar.definitions";

const Toolbar: React.FC<ToolbarProps> = ({ children, className }) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<HTMLDivElement[]>([]);

  const { calcButtonWidths, calcVisibleButtons, updateToolbar, context } =
    useToolbar();

  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const [visibleButtons, setVisibleButtons] = useState<React.ReactNode[]>(
    React.Children.toArray(children)
  );
  const [buttonWidths, setButtonWidths] = useState<number[]>([]);
  const [hiddenButtons, setHiddenButtons] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    setButtonWidths(calcButtonWidths(buttonRefs));
  }, [buttonRefs, calcButtonWidths]);

  const availableWidth =
    (toolbarRef.current?.clientWidth ?? 0) - (PADDING + ELIPSIS_BUTTON);

  useEffect(() => {
    const maxVisibleButtons = calcVisibleButtons(buttonWidths, availableWidth);
    const buttons = React.Children.toArray(children);
    setVisibleButtons(buttons.slice(0, maxVisibleButtons));
    setHiddenButtons(buttons.slice(maxVisibleButtons));
  }, [buttonWidths, availableWidth, calcVisibleButtons, children]);

  useEffect(
    () =>
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          setActiveEditor(newEditor);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
    [editor, updateToolbar]
  );

  useEffect(() => {
    mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [updateToolbar, activeEditor]);

  return (
    <>
      <div ref={toolbarRef} className={className}>
        <EditorContext.Provider value={context}>
          <Box display="flex" alignItems="center" gap="2" flexWrap="wrap">
            {visibleButtons.map((button, index) => (
              <div
                key={`button-toolbar-${index}`} // eslint-disable-line react/no-array-index-key
                ref={(ref) => {
                  if (ref) buttonRefs.current[index] = ref;
                }}
              >
                {button}
              </div>
            ))}
          </Box>
          {!!hiddenButtons.length && (
            <Popover
              width="fit-content"
              maxWidth={`${(toolbarRef.current?.clientWidth ?? 0) - PADDING}px`}
              padding="small"
              offset={8}
              content={
                <Box
                  display="flex"
                  gap="2"
                  flexWrap="wrap"
                  justifyContent="flex-end"
                >
                  {hiddenButtons.filter(
                    (child) =>
                      !(child as unknown as { key: string })?.key.includes(
                        "divider"
                      )
                  )}
                </Box>
              }
              arrow={false}
              position="bottom-end"
            >
              <Button>
                <Icon source={<EllipsisIcon />} color="currentColor" />
              </Button>
            </Popover>
          )}
        </EditorContext.Provider>
      </div>
      <Box
        display={{ xs: "block", md: "none" }}
        position="absolute"
        bottom="0"
        py="1"
        px="2"
        width="100%"
        borderWidth="none"
        borderTopWidth="1"
        borderColor="neutral-surfaceHighlight"
        borderStyle="solid"
      >
        <Text fontSize="caption" lineHeight="caption">
          {headerTranslations[context.state.blockType]}
        </Text>
      </Box>
    </>
  );
};

export { Toolbar };
