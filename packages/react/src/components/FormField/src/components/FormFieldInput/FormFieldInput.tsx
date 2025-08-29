import React, {
  ComponentPropsWithRef,
  forwardRef,
  useMemo,
  useRef,
} from "react";

import { Input } from "@nimbus-ds/components";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";

import { FormField } from "../../FormField";
import { FormFieldInputBaseProps } from "./formFieldInput.types";
import { inputAppearance } from "../../formField.definitions";
import { FormFieldProperties } from "../../formField.types";

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

    /**
     * Extract the appearance from the form field to avoid conflicts with the input appearance.
     */
    const formFieldAppearance: FormFieldProperties["appearance"] = useMemo(
      () =>
        appearance === "ai-generative"
          ? "none"
          : (appearance as FormFieldProperties["appearance"]),
      [appearance]
    );

    return (
      <FormField
        label={label}
        helpText={helpText}
        helpIcon={IconSrc}
        appearance={formFieldAppearance}
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
