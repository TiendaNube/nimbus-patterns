import type { Meta, StoryObj } from "@storybook/react";
import { ExclamationCircleIcon } from "@nimbus-ds/icons";

import { FormField } from "../../FormField";

const meta: Meta<typeof FormField.Textarea> = {
  title: "Patterns/FormField/FormField.Textarea",
  component: FormField.Textarea,
  argTypes: {
    helpIcon: { control: { disable: true } },
    showHelpText: { defaultValue: false },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormField.Textarea>;

export const basic: Story = {
  args: {
    placeholder: "Placeholder",
    label: "Label text",
    helpText: "Help text",
    helpIcon: ExclamationCircleIcon,
  },
};
