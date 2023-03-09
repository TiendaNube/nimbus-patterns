import { HTMLAttributes, ReactNode, FC } from "react";
import { IconProps } from "@nimbus-ds/icons";
import {
  FormFieldSelect,
  FormFieldTextarea,
  FormFieldInput,
} from "./components";

type Extend = HTMLAttributes<HTMLElement>;

export interface FormFieldComponents {
  Select: typeof FormFieldSelect;
  Textarea: typeof FormFieldTextarea;
  Input: typeof FormFieldInput;
}

export interface FormFieldProps extends Extend {
  /** Optional label for the field component */
  label?: ReactNode;
  /** Help text displaying optional hints or validation messages under the field */
  helpText?: string;
  /** Icon supporting the help text message */
  helpIcon?: FC<IconProps>;
  /** Appearance of the field and help text elements */
  appearance?: "danger" | "warning" | "success" | "none";
  /** Control to conditionally show the help text and icon */
  showHelpText?: boolean;
  /** Content of the field */
  children: ReactNode;
}
