import { FORMAT_HEADING_COMMAND, FORMAT_PARAGRAPH_COMMAND } from "../../utils";

export const supportedHeaderTypes = [
  { tag: "h3", command: FORMAT_HEADING_COMMAND },
  { tag: "h4", command: FORMAT_HEADING_COMMAND },
  { tag: "paragraph", command: FORMAT_PARAGRAPH_COMMAND },
];

export const headerTranslations = {
  h3: "Título",
  h4: "Subtítulo",
  paragraph: "Parágrafo",
} as { [key: string]: string };
