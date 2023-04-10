import { HTMLAttributes } from "react";
import { InputProperties } from "@nimbus-ds/components";
import { FormFieldProperties } from "../../formField.types";

export type FormFieldInputProperties = Omit<FormFieldProperties, "children"> &
  Omit<InputProperties, "appearance">;

export type FormFieldInputProps = FormFieldInputProperties &
  HTMLAttributes<HTMLElement>;
