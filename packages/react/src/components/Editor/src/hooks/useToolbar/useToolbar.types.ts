import { EditorProps } from "../../editor.types";

export type Parser = "html" | "json";

export interface useToolbarProps extends Pick<EditorProps, "onChange"> {
  parser: Parser;
}
