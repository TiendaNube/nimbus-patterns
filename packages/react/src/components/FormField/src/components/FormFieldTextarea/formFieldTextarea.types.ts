import { HTMLAttributes } from "react";

import { TextareaProperties, TextareaProps } from "@nimbus-ds/components";
import { FormFieldProperties } from "../../formField.types";

export type FormFieldTextareaProperties = Omit<
  FormFieldProperties,
  "children"
> &
  Omit<TextareaProperties, "appearance">;

export type FormFieldTextareaBaseProps = FormFieldTextareaProperties &
  Omit<TextareaProps, "appearance"> &
  HTMLAttributes<HTMLElement>;
