import { HTMLAttributes } from "react";

import { SelectProps } from "@nimbus-ds/select";
import { FormFieldProps } from "../../formField.types";

export type FormFieldSelectProps = Omit<FormFieldProps, "children"> &
  Omit<SelectProps, "appearance"> &
  HTMLAttributes<HTMLElement>;
