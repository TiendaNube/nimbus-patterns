import { HTMLAttributes } from "react";
import { SelectProperties } from "@nimbus-ds/components";
import { FormFieldProperties } from "../../formField.types";

export type FormFieldSelectProperties = Omit<FormFieldProperties, "children"> &
  Omit<SelectProperties, "appearance">;

export type FormFieldSelectProps = FormFieldSelectProperties &
  HTMLAttributes<HTMLElement>;
