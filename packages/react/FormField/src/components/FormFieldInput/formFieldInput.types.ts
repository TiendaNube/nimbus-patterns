import { HTMLAttributes } from "react";

import { InputProps } from "@nimbus-ds/input";
import { FormFieldProps } from "../../formField.types";

export type FormFieldInputProps = Omit<FormFieldProps, "children"> &
  Omit<InputProps, "appearance"> &
  HTMLAttributes<HTMLElement>;
