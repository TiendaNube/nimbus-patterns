import React from "react";

import { Textarea } from "@nimbus-ds/textarea";

import { FormField } from "../../FormField";
import { FormFieldTextareaProps } from "./formFieldTextarea.types";
import { inputAppearance } from "../../formField.definitions";

const FormFieldTextarea: React.FC<FormFieldTextareaProps> = ({
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
    <Textarea {...rest} appearance={inputAppearance[appearance]} />
  </FormField>
);

export { FormFieldTextarea };
