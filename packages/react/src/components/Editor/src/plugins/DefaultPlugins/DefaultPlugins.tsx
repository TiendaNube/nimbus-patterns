import React from "react";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { MATCHERS, validateUrl } from "./defaultPlugins.definitions";

const DefaultPlugins: React.FC = () => (
  <>
    <ListPlugin />
    <LinkPlugin validateUrl={validateUrl} />
    <AutoLinkPlugin matchers={MATCHERS} />
    <AutoFocusPlugin />
    <HistoryPlugin />
    <TabIndentationPlugin />
  </>
);

export { DefaultPlugins };
