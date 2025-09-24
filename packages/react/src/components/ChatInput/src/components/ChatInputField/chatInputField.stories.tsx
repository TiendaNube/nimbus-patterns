import type { Meta, StoryObj } from "@storybook/react";

import { ChatInput } from "../../ChatInput";

const meta: Meta<typeof ChatInput.Field> = {
  title: "Patterns/ChatInput/ChatInput.Field",
  component: ChatInput.Field,
  argTypes: {
    appearance: {
      control: { type: "select" },
      options: ["none", "danger", "warning", "success", "ai-generative"],
    },
    lines: {
      control: { type: "number", min: 1, max: 10 },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatInput.Field>;

export const basic: Story = {
  args: {
    placeholder: "Type your message here...",
    lines: 3,
    appearance: "none",
  },
};
