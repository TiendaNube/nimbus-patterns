import { HTMLAttributes, ReactNode, FC } from "react";
import { IconProps } from "@nimbus-ds/icons";
import {
  FormFieldSelect,
  FormFieldTextarea,
  FormFieldInput,
} from "./components";

export interface FormFieldComponents {
  Select: typeof FormFieldSelect;
  Textarea: typeof FormFieldTextarea;
  Input: typeof FormFieldInput;
}

export interface FormFieldProperties {
  /**
   * Optional label for the field component.
   * @TJS-type React.ReactNode
   */
  label?: ReactNode;
  /**
   * Help text displaying optional hints or validation messages under the field.
   */
  helpText?: string;
  /**
   * Icon supporting the help text message.
   * @TJS-type React.FC<IconProps>
   */
  helpIcon?: FC<IconProps>;
  /**
   * Appearance of the field and help text elements.
   * @default none
   */
  appearance?:
    | "danger"
    | "warning"
    | "success"
    | "none"
    | "ai-generative"
    | "ai-generated";
  /**
   * Control to conditionally show the help text and icon.
   * @default false
   */
  showHelpText?: boolean;
  /**
   * Content of the field.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type FormFieldProps = FormFieldProperties & HTMLAttributes<HTMLElement>;
