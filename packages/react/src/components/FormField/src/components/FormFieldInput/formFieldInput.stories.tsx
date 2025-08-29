import type { Meta, StoryObj } from "@storybook/react";
import { ExclamationCircleIcon } from "@nimbus-ds/icons";

import { FormField } from "../../FormField";

const meta: Meta<typeof FormField.Input> = {
  title: "Patterns/FormField/FormField.Input",
  component: FormField.Input,
  argTypes: {
    helpIcon: { control: { disable: true } },
    showHelpText: { defaultValue: false },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormField.Input>;

export const basic: Story = {
  args: {
    placeholder: "Placeholder",
    label: "Label text",
    helpText: "Help text",
    helpIcon: ExclamationCircleIcon,
  },
};

export const aiGenerated: Story = {
  args: {
    placeholder: "Placeholder",
    label: "Label text",
    helpText: "Help text",
    helpIcon: ExclamationCircleIcon,
    aiGenerated: true,
  },
};
