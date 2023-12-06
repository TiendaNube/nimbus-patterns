import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select, Radio, Box } from "@nimbus-ds/components";
import { ExclamationCircleIcon } from "@nimbus-ds/icons";

import { FormField } from "./FormField";
import { FormFieldSelectProps } from "./components/FormFieldSelect/FormFieldSelect";
import { FormFieldTextareaProps } from "./components/FormFieldTextarea/FormFieldTextarea";

const meta: Meta<typeof FormField> = {
  title: "Patterns/FormField",
  component: FormField,
  argTypes: {
    helpIcon: { control: { disable: true } },
    children: { control: { disable: true } },
    showHelpText: { defaultValue: false },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const basic: Story = {
  render: (args) => <FormField.Input {...args} placeholder="Placeholder" />,
  args: {
    label: "Label text",
    helpText: "Help text",
    id: "input-id",
    helpIcon: ExclamationCircleIcon,
  },
};

export const asInput: Story = {
  render: (args) => <FormField.Input {...args} placeholder="Placeholder" />,
  args: {
    label: "Label text",
    helpText: "Help text",
    id: "input-id",
    helpIcon: ExclamationCircleIcon,
  },
};

export const asSelect = {
  render: (args: FormFieldSelectProps) => (
    <FormField.Select {...args} placeholder="Placeholder" />
  ),
  args: {
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
  },
};

export const asTextarea = {
  render: (args: FormFieldTextareaProps) => (
    <FormField.Textarea {...args} placeholder="Placeholder" />
  ),
  args: {
    label: "Label text",
    helpText: "Help text",
    id: "textarea-id",
    helpIcon: ExclamationCircleIcon,
  },
};

export const showHelpTextOnFocus: Story = {
  render: (args) => {
    const [showHelpText, setShowHelpText] = useState(false);
    const handleShowTrue = () => setShowHelpText((prevState) => !prevState);

    return (
      <FormField.Input
        onFocus={handleShowTrue}
        onBlur={handleShowTrue}
        showHelpText={showHelpText}
        {...args}
      />
    );
  },
  args: {
    label: "Click the input to display the help text",
    helpText: "Help text",
    id: "input-id",
    helpIcon: ExclamationCircleIcon,
  },
};

export const customContent: Story = {
  render: (args) => (
    <FormField {...args}>
      <Box display="flex" gap="1">
        <Radio as="button" checked name="radio" id="radio-1" label="Radio 1" />
        <Radio as="button" name="radio" id="radio-2" label="Radio 2" />
        <Radio as="button" name="radio" id="radio-3" label="Radio 3" />
        <Radio as="button" name="radio" id="radio-4" label="Radio 4" />
      </Box>
    </FormField>
  ),
  args: {
    label: "Label text",
    helpText: "Help text",
    helpIcon: ExclamationCircleIcon,
  },
};
