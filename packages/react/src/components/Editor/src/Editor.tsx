import React from "react";
import { Box, Icon, Text } from "@nimbus-ds/components";
import { editor as editorStyles } from "@nimbus-ds/styles";
import { EditorState, LexicalEditor } from "lexical";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { Placeholder, Toolbar } from "./components";
import { EditorProps } from "./editor.types";
import {
  defaultTheme,
  defaultModules,
  aliasModules,
  editorAppearance,
  helpTextAppearance,
  nodes,
} from "./editor.definitions";
import {
  CustomHeadingPlugin,
  CustomParagraphPlugin,
  CustomClearFormattingPlugin,
  DefaultPlugins,
  CustomYouTubePlugin,
  CustomAutoEmbedPlugin,
} from "./plugins";

import { useEditor } from "./hooks";

const Editor: React.FC<EditorProps> = ({
  style: _style,
  className: _className,
  theme,
  modules,
  placeholder,
  value,
  parser = "json",
  helpText,
  helpIcon: IconSrc,
  appearance = "none",
  onChange,
  ...rest
}) => {
  const { setContent, onChangeEditor, onError } = useEditor({
    parser,
    onChange,
  });

  const initialConfig: InitialConfigType = {
    namespace: "@nimbus-ds/editor",
    theme: theme ?? defaultTheme,
    editorState: (editor: LexicalEditor) => setContent(editor, value),
    nodes,
    onError,
  };

  return (
    <Box position="relative" {...rest}>
      <Box
        as={LexicalComposer}
        initialConfig={initialConfig}
        position="relative"
        backgroundColor="danger-interactive"
      >
        <Toolbar
          className={
            editorStyles.classnames.toolbar[editorAppearance[appearance]]
          }
        >
          {modules ??
            defaultModules.map((defaultModule) => {
              const Module = aliasModules[defaultModule] ?? null;
              return <Module key={defaultModule} />;
            })}
        </Toolbar>
        <Box position="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={
                  editorStyles.classnames.content[editorAppearance[appearance]]
                }
              />
            }
            placeholder={<Placeholder text={placeholder} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </Box>
        {helpText && (
          <Box mt="2">
            <Box display="inline-flex" gap="1">
              {IconSrc && (
                <Icon
                  color={helpTextAppearance[appearance]}
                  source={<IconSrc size={12} />}
                />
              )}
              <Text color={helpTextAppearance[appearance]} fontSize="caption">
                {helpText}
              </Text>
            </Box>
          </Box>
        )}
        <DefaultPlugins />
        <CustomAutoEmbedPlugin />
        <CustomHeadingPlugin />
        <CustomParagraphPlugin />
        <CustomClearFormattingPlugin />
        <CustomYouTubePlugin />
        <OnChangePlugin
          onChange={(editorState: EditorState, editor: LexicalEditor) => {
            onChangeEditor(editorState, editor);
          }}
        />
      </Box>
    </Box>
  );
};

Editor.displayName = "Editor";

export { Editor };
