import { FORMAT_HEADING_COMMAND, FORMAT_PARAGRAPH_COMMAND } from "../../utils";

export const supportedHeadingTypes = [
  { tag: "h3", command: FORMAT_HEADING_COMMAND },
  { tag: "h4", command: FORMAT_HEADING_COMMAND },
  { tag: "paragraph", command: FORMAT_PARAGRAPH_COMMAND },
];

export const headingTranslations = {
  h3: "Título",
  h4: "Subtítulo",
  paragraph: "Parágrafo",
} as { [key: string]: string };
