import { HTMLAttributes, ReactNode } from "react";
import { Icon as IconType } from "@tiendanube/icons";
import { FormFieldSelect, FormFieldTextarea, FormFieldInput } from "./components";

type Extend = HTMLAttributes<HTMLElement>;

export interface FormFieldComponents {
  Select: typeof FormFieldSelect;
  Textarea: typeof FormFieldTextarea;
  Input: typeof FormFieldInput;
}

export interface FormFieldProps extends Extend {
  label?: ReactNode;
  helpText?: string;
  helpIcon?: IconType;
  appearance?: "danger" | "warning" | "success" | "none";
  showHelpText?: boolean;
  children: ReactNode;
}
