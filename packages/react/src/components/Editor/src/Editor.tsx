import React, { useMemo } from "react";
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
  CustomYouTubePlugin,
  CustomAutoEmbedPlugin,
  CustomFloatingLinkEditor,
  DefaultPlugins,
} from "./plugins";

import { useEditor } from "./hooks";
import { TranslateContext, initialTranslationContext } from "./contexts";

const Editor: React.FC<EditorProps> = ({
  style: _style,
  className: _className,
  theme,
  modules,
  renderModules,
  placeholder,
  value,
  parser = "json",
  helpText,
  helpIcon: IconSrc,
  appearance = "none",
  translations,
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

  const context = useMemo(
    () => ({
      translations: {
        ...initialTranslationContext.translations,
        ...translations,
      },
    }),
    [translations]
  );

  return (
    <>
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className={
          editorStyles.classnames.container[editorAppearance[appearance]]
        }
        {...rest}
      >
        <Box
          as={LexicalComposer}
          initialConfig={initialConfig}
          position="relative"
          backgroundColor="danger-interactive"
        >
          <TranslateContext.Provider value={context}>
            <Toolbar className={editorStyles.classnames.toolbar}>
              {renderModules != null && Array.isArray(renderModules)
                ? renderModules
                    .map((key) => {
                      const Component = aliasModules[key];
                      return Component ? <Component key={key} /> : null;
                    })
                    .filter(Boolean)
                : modules ?? defaultModules.map((key) => {
                    const Component = aliasModules[key];
                    return Component ? <Component key={key} /> : null;
                  })}
            </Toolbar>
            <Box position="relative">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className={editorStyles.classnames.content}
                  />
                }
                placeholder={<Placeholder text={placeholder} />}
                ErrorBoundary={LexicalErrorBoundary}
              />
            </Box>
            <DefaultPlugins />
            <CustomAutoEmbedPlugin />
            <CustomHeadingPlugin />
            <CustomParagraphPlugin />
            <CustomFloatingLinkEditor />
            <CustomClearFormattingPlugin />
            <CustomYouTubePlugin />
            <OnChangePlugin
              onChange={(editorState: EditorState, editor: LexicalEditor) => {
                onChangeEditor(editorState, editor);
              }}
            />
          </TranslateContext.Provider>
        </Box>
      </div>
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
    </>
  );
};

Editor.displayName = "Editor";

export { Editor };
