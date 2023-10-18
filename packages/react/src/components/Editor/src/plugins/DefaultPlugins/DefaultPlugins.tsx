import React from "react";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

const DefaultPlugins: React.FC = () => (
  <>
    <ListPlugin />
    <LinkPlugin />
    <AutoFocusPlugin />
    <HistoryPlugin />
    <TabIndentationPlugin />
  </>
);

export { DefaultPlugins };
