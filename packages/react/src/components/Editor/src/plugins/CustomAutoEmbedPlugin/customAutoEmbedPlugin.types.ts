import { EmbedConfig } from "@lexical/react/LexicalAutoEmbedPlugin";
import React from "react";

export interface PlaygroundEmbedConfig extends EmbedConfig {
  // Human readable name of the embeded content e.g. Tweet or Google Map.
  contentName: string;
  // Icon for display.
  icon?: React.ReactElement;
  // An example of a matching url https://twitter.com/jack/status/20
  exampleUrl: string;
  // For extra searching.
  keywords: Array<string>;
  // Embed a Figma Project.
  description?: string;
}
