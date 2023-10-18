import { EditorProps } from "../../editor.types";

export type Parser = "html" | "json";

export interface useEditorProps extends Pick<EditorProps, "onChange"> {
  parser: Parser;
}
