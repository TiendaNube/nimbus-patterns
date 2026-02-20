import { HTMLAttributes, FC } from "react";
import { EditorThemeClasses } from "lexical";
import { IconProps } from "@nimbus-ds/icons";
import { initialTranslationContext } from "./contexts";

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
  /**
   * List of toolbar module keys to display. Only these modules are loaded in the toolbar.
   * When omitted, the default toolbar with all modules is used.
   */
  modules?: Module[];
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
  translations?: Partial<typeof initialTranslationContext.translations>;
}

export type EditorProps = EditorProperties &
  Omit<HTMLAttributes<HTMLElement>, "onChange" | "color">;
