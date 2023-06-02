import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ExclamationCircleIcon } from "@nimbus-ds/icons";
import { Select } from "@nimbus-ds/components";

import { FormField } from "../../FormField";

const meta: Meta<typeof FormField.Select> = {
  title: "Patterns/FormField/FormField.Select",
  component: FormField.Select,
  argTypes: {
    helpIcon: { control: { disable: true } },
    showHelpText: { defaultValue: false },
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormField.Select>;

export const basic: Story = {
  args: {
    label: "Label text",
    helpText: "Help text",
    helpIcon: ExclamationCircleIcon,
    children: (
      <>
        <Select.Option label="Option 1" value="option-1" />
        <Select.Option label="Option 2" value="option-2" />
        <Select.Option label="Option 3" value="option-3" />
        <Select.Option label="Option 4" value="option-4" />
      </>
    ),
  },
};
