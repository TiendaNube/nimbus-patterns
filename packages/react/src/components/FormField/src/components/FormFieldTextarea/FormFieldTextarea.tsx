import React, { ComponentPropsWithRef, forwardRef, useRef } from "react";

import { Textarea } from "@nimbus-ds/components";
import { useRefObjectAsForwardedRef } from "@nimbus-ds/typings";

import { FormField } from "../../FormField";
import { FormFieldTextareaBaseProps } from "./formFieldTextarea.types";
import { textAreaAppearances } from "./FormFieldTextarea.definitions";

const FormFieldTextarea = forwardRef<
  HTMLTextAreaElement,
  FormFieldTextareaBaseProps
>(
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
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useRefObjectAsForwardedRef(ref, textAreaRef);

    return (
      <FormField
        label={label}
        helpText={helpText}
        helpIcon={IconSrc}
        appearance={appearance}
        showHelpText={showHelpText}
        id={rest.id}
      >
        <Textarea
          ref={textAreaRef}
          {...rest}
          appearance={textAreaAppearances[appearance]}
        />
      </FormField>
    );
  }
);

export type FormFieldTextareaProps = ComponentPropsWithRef<
  typeof FormField.Textarea
>;
export { FormFieldTextarea };
