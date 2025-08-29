import React, { ComponentPropsWithRef, forwardRef, useRef } from "react";

import { Select } from "@nimbus-ds/components";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";

import { FormField } from "../../FormField";
import { FormFieldSelectBaseProps } from "./formFieldSelect.types";
import { selectAppearances } from "./FormFieldSelect.definitions";

const FormFieldSelect = forwardRef<HTMLSelectElement, FormFieldSelectBaseProps>(
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
    const selectRef = useRef<HTMLSelectElement>(null);
    useRefObjectAsForwardedRef(ref, selectRef);

    return (
      <FormField
        label={label}
        helpText={helpText}
        helpIcon={IconSrc}
        appearance={appearance}
        showHelpText={showHelpText}
        id={rest.id}
      >
        <Select
          ref={selectRef}
          {...rest}
          appearance={selectAppearances[appearance]}
        />
      </FormField>
    );
  }
);

export type FormFieldSelectProps = ComponentPropsWithRef<
  typeof FormField.Select
>;
export { FormFieldSelect };
