import { HTMLAttributes } from "react";
import { SelectProperties, SelectProps } from "@nimbus-ds/components";
import { FormFieldProperties } from "../../formField.types";

export type FormFieldSelectProperties = Omit<FormFieldProperties, "children"> &
  Omit<SelectProperties, "appearance">;

export type FormFieldSelectBaseProps = FormFieldSelectProperties &
  Omit<SelectProps, "appearance"> &
  HTMLAttributes<HTMLElement>;
