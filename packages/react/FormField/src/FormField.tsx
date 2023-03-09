import React from "react";

import { Box, Text, Icon, Label } from "@nimbus-ds/components";

import { FormFieldProps, FormFieldComponents } from "./formField.types";
import { helpTextAppearance } from "./formField.definitions";

import {
  FormFieldSelect,
  FormFieldTextarea,
  FormFieldInput,
} from "./components";

const FormField: React.FC<FormFieldProps> & FormFieldComponents = ({
  label,
  helpText,
  helpIcon: IconSrc,
  appearance = "none",
  showHelpText = false,
  children,
  ...rest
}: FormFieldProps) => (
  <Box display="flex" flexDirection="column" gap="2" width="100%">
    {label && <Label htmlFor={rest.id}>{label}</Label>}
    {children}
    {showHelpText && (
      <Box display="inline-flex" gap="1">
        {IconSrc && (
          <Icon
            color={helpTextAppearance[appearance]}
            source={<IconSrc size={12} />}
          />
        )}
        {helpText && (
          <Text color={helpTextAppearance[appearance]} fontSize="caption">
            {helpText}
          </Text>
        )}
      </Box>
    )}
  </Box>
);

FormField.Select = FormFieldSelect;
FormField.Textarea = FormFieldTextarea;
FormField.Input = FormFieldInput;

FormField.displayName = "FormField";
FormField.Input.displayName = "FormField.Input";
FormField.Select.displayName = "FormField.Select";
FormField.Textarea.displayName = "FormField.Textarea";

export { FormField };
