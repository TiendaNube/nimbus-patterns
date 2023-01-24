import { HTMLAttributes } from "react";

import { FormFieldProps } from "../../formField.types";
import { InputProps } from "@nimbus-ds/input";

export type FormFieldInputProps = Omit<FormFieldProps, "children"> &
  Omit<InputProps, "appearance"> &
  HTMLAttributes<HTMLElement>;
