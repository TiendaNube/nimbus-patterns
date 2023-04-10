import React from "react";

import { Select } from "@nimbus-ds/components";

import { FormField } from "../../FormField";
import { FormFieldSelectProps } from "./formFieldSelect.types";
import { inputAppearance } from "../../formField.definitions";

const FormFieldSelect: React.FC<FormFieldSelectProps> = ({
  label,
  helpText,
  helpIcon: IconSrc,
  appearance = "none",
  showHelpText = false,
  ...rest
}) => (
  <FormField
    label={label}
    helpText={helpText}
    helpIcon={IconSrc}
    appearance={appearance}
    showHelpText={showHelpText}
    id={rest.id}
  >
    <Select {...rest} appearance={inputAppearance[appearance]} />
  </FormField>
);

export { FormFieldSelect };
