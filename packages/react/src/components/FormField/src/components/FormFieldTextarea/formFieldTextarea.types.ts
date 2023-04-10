import { HTMLAttributes } from "react";

import { TextareaProperties } from "@nimbus-ds/components";
import { FormFieldProperties } from "../../formField.types";

export type FormFieldTextareaProperties = Omit<
  FormFieldProperties,
  "children"
> &
  Omit<TextareaProperties, "appearance">;

export type FormFieldTextareaProps = FormFieldTextareaProperties &
  HTMLAttributes<HTMLElement>;
