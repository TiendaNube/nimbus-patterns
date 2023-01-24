import { HTMLAttributes } from "react";

import { FormFieldProps } from "../../formField.types";
import { SelectProps } from "@nimbus-ds/select";

export type FormFieldSelectProps = Omit<FormFieldProps, "children"> &
  Omit<SelectProps, "appearance"> &
  HTMLAttributes<HTMLElement>;
