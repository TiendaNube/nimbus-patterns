import React from "react";
import { Box } from "@nimbus-ds/components";
import { EditorState, LexicalEditor } from "lexical";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
// import { $generateHtmlFromNodes } from "@lexical/html";
import { HeadingNode } from "@lexical/rich-text";
import { LinkNode } from "@lexical/link";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { Placeholder, Toolbar } from "./components";
import { EditorProps } from "./editor.types";
import { theme } from "./editor.definitions";
import {
  CustomHeadingPlugin,
  CustomParagraphPlugin,
  CustomClearFormattingPlugin,
} from "./plugins";

const Editor: React.FC<EditorProps> = ({
  className: _className,
  style: _style,
}) => {
  const onChange = (editorState: EditorState, editor: LexicalEditor) => {
    // const editorStateJSON = editorState.toJSON();
    // const editorHtmlString = editorState.read(() =>
    //   $generateHtmlFromNodes(editor)
    // );
    // console.log("editorStateJSON", editorStateJSON);
    // console.log("editorHtmlString", editorHtmlString);
  };

  const onError = (error: Error) => {
    console.error(error);
  };

  const initialConfig = {
    namespace: "@nimbus-ds/editor",
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode, LinkNode],
  } satisfies InitialConfigType;

  return (
    <Box
      as={LexicalComposer}
      initialConfig={initialConfig}
      data-style="nimbus-editor"
    >
      <Toolbar />
      <Box position="relative">
        <RichTextPlugin
          contentEditable={<ContentEditable className="content" />}
          placeholder={<Placeholder text="Enter some text..." />}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </Box>
      <ListPlugin />
      <LinkPlugin />
      <AutoFocusPlugin />
      <HistoryPlugin />
      <TabIndentationPlugin />
      <CustomHeadingPlugin />
      <CustomParagraphPlugin />
      <CustomClearFormattingPlugin />
      <OnChangePlugin onChange={onChange} />
    </Box>
  );
};

Editor.displayName = "Editor";

export { Editor };
