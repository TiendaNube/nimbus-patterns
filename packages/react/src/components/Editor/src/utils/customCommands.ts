import { LexicalCommand, createCommand } from "lexical";

export const FORMAT_HEADING_COMMAND: LexicalCommand<string> = createCommand(
  "FORMAT_HEADING_COMMAND"
);
export const FORMAT_PARAGRAPH_COMMAND: LexicalCommand<string> = createCommand(
  "FORMAT_PARAGRAPH_COMMAND"
);
export const CLEAR_FORMATTING_COMMAND = createCommand(
  "CLEAR_FORMATING_COMMAND"
);
export const INSERT_YOUTUBE_COMMAND: LexicalCommand<string> = createCommand(
  "INSERT_YOUTUBE_COMMAND"
);
