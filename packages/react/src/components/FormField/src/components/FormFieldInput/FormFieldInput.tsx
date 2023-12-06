import React, { ComponentPropsWithRef, forwardRef, useRef } from "react";

import { Input } from "@nimbus-ds/components";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";

import { FormField } from "../../FormField";
import { FormFieldInputBaseProps } from "./formFieldInput.types";
import { inputAppearance } from "../../formField.definitions";

const FormFieldInput = forwardRef<HTMLInputElement, FormFieldInputBaseProps>(
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
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useRefObjectAsForwardedRef(ref, inputRef);

    return (
      <FormField
        label={label}
        helpText={helpText}
        helpIcon={IconSrc}
        appearance={appearance}
        showHelpText={showHelpText}
        id={rest.id}
      >
        <Input
          ref={inputRef}
          {...rest}
          appearance={inputAppearance[appearance]}
        />
      </FormField>
    );
  }
);

export type FormFieldInputProps = ComponentPropsWithRef<typeof FormField.Input>;
export { FormFieldInput };
