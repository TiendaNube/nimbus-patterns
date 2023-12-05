import React, { forwardRef } from "react";

import { Input } from "@nimbus-ds/components";

import { FormField } from "../../FormField";
import { FormFieldInputProps } from "./formFieldInput.types";
import { inputAppearance } from "../../formField.definitions";

const FormFieldInput = forwardRef<HTMLInputElement, FormFieldInputProps>(
  (
    {
      label,
      helpText,
      helpIcon: IconSrc,
      appearance = "none",
      showHelpText = false,
      ...rest
    },
    ref
  ) => (
    <FormField
      label={label}
      helpText={helpText}
      helpIcon={IconSrc}
      appearance={appearance}
      showHelpText={showHelpText}
      id={rest.id}
    >
      <Input ref={ref} {...rest} appearance={inputAppearance[appearance]} />
    </FormField>
  )
);

export { FormFieldInput };
