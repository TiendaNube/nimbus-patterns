import { HTMLAttributes, FC } from "react";
import { EditorThemeClasses } from "lexical";
import { IconProps } from "@nimbus-ds/icons";

export type Module =
  | "bold"
  | "clearFormating"
  | "orderedList"
  | "unorderedList"
  | "header"
  | "history"
  | "italic"
  | "link"
  | "video"
  | "divider";

export type Parser = "html" | "json";

export interface EditorProperties {
  modules?: Module;
  placeholder?: string;
  value?: string;
  parser?: Parser;
  theme?: EditorThemeClasses;
  onChange?: (data: string) => void;
  /**
   * Icon supporting the help text message.
   * @TJS-type React.FC<IconProps>
   */
  helpIcon?: FC<IconProps>;
  /**
   * Help text displaying optional hints or validation messages under the field.
   */
  helpText?: string;
  /**
   * Appearance of the field and help text elements.
   * @default none
   */
  appearance?: "danger" | "warning" | "success" | "none";
}

export type EditorProps = EditorProperties &
  Omit<HTMLAttributes<HTMLElement>, "onChange" | "color">;
