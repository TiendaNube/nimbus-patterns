import { HTMLAttributes } from "react";

import { TextareaProps } from "@nimbus-ds/textarea";
import { FormFieldProps } from "../../formField.types";

export type FormFieldTextareaProps = Omit<FormFieldProps, "children"> &
  Omit<TextareaProps, "appearance"> &
  HTMLAttributes<HTMLElement>;
