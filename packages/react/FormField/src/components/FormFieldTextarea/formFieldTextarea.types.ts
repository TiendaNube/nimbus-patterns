import { HTMLAttributes } from "react";

import { FormFieldProps } from "../../formField.types";
import { TextareaProps } from "@nimbus-ds/textarea";

export type FormFieldTextareaProps = Omit<FormFieldProps, "children"> &
  Omit<TextareaProps, "appearance"> &
  HTMLAttributes<HTMLElement>;
