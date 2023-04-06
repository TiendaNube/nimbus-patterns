import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line
import { useArgs } from "@storybook/client-api";
import { Select, Radio, Box } from "@nimbus-ds/components";
import { ExclamationCircleIcon } from "@nimbus-ds/icons";

import { FormField } from "./FormField";

export default {
  title: "Patterns/FormField",
  component: FormField,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "FormField.Input": FormField.Input,
    "FormField.Select": FormField.Select,
    "FormField.Textarea": FormField.Textarea,
  },
  argTypes: {
    label: { control: "text" },
    helpText: { control: "text" },
    helpIcon: { control: { disable: true } },
    children: { control: { disable: true } },
    showHelpText: { defaultValue: false },
  },
} as ComponentMeta<typeof FormField>;

const InputTemplate: ComponentStory<typeof FormField.Input> = (args) => (
  <FormField.Input {...args} placeholder="Placeholder" />
);

const SelectTemplate: ComponentStory<typeof FormField.Select> = (args) => (
  <FormField.Select {...args} placeholder="Placeholder" />
);

const TextareaTemplate: ComponentStory<typeof FormField.Textarea> = (args) => (
  <FormField.Textarea {...args} placeholder="Placeholder" />
);

const TemplateWithState: ComponentStory<typeof FormField.Input> = (args) => {
  const [{ showHelpText }, updateArgs] = useArgs();
  const setShowTrue = () => updateArgs({ showHelpText: true });
  const setShowFalse = () => updateArgs({ showHelpText: false });
  return (
    <FormField.Input
      onFocus={setShowTrue}
      onBlur={setShowFalse}
      showHelpText={showHelpText}
      {...args}
    />
  );
};

const CustomTemplate: ComponentStory<typeof FormField> = (args) => (
  <FormField {...args}>
    <Box display="flex" gap="1">
      <Radio as="button" checked name="radio" id="radio-1" label="Radio 1" />
      <Radio as="button" name="radio" id="radio-2" label="Radio 2" />
      <Radio as="button" name="radio" id="radio-3" label="Radio 3" />
      <Radio as="button" name="radio" id="radio-4" label="Radio 4" />
    </Box>
  </FormField>
);

export const asInput = InputTemplate.bind({});
asInput.args = {
  label: "Label text",
  helpText: "Help text",
  id: "input-id",
  helpIcon: ExclamationCircleIcon,
};

export const asSelect = SelectTemplate.bind({});
asSelect.args = {
  label: "Label text",
  helpText: "Help text",
  id: "select-id",
  children: (
    <>
      <Select.Option label="Option 1" value="option-1" />
      <Select.Option label="Option 2" value="option-2" />
      <Select.Option label="Option 3" value="option-3" />
      <Select.Option label="Option 4" value="option-4" />
    </>
  ),
  helpIcon: ExclamationCircleIcon,
};

export const asTextarea = TextareaTemplate.bind({});
asTextarea.args = {
  label: "Label text",
  helpText: "Help text",
  id: "textarea-id",
  helpIcon: ExclamationCircleIcon,
};

export const showHelpTextOnFocus = TemplateWithState.bind({});
showHelpTextOnFocus.args = {
  label: "Click the input to display the help text",
  helpText: "Help text",
  id: "input-id",
  helpIcon: ExclamationCircleIcon,
};

export const customContent = CustomTemplate.bind({});
customContent.args = {
  label: "Label text",
  helpText: "Help text",
  helpIcon: ExclamationCircleIcon,
};
