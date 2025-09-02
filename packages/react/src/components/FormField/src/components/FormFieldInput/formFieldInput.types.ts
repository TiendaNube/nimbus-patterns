import { HTMLAttributes } from "react";
import { InputProperties, InputProps } from "@nimbus-ds/components";
import { FormFieldProperties } from "../../formField.types";

export type FormFieldInputProperties = Omit<FormFieldProperties, "children"> &
  Omit<InputProperties, "appearance"> & {
    appearance?:
      | FormFieldProperties["appearance"]
      | InputProperties["appearance"];
  };

export type FormFieldInputBaseProps = Omit<
  FormFieldInputProperties,
  "appearance"
> &
  Omit<InputProps, "appearance"> & {
    appearance?:
      | FormFieldProperties["appearance"]
      | InputProperties["appearance"];
  } & HTMLAttributes<HTMLElement>;
