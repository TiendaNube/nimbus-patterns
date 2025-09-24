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

export const aiGenerative: Story = {
  args: {
    placeholder: "Ask AI to help you...",
    lines: 3,
    appearance: "ai-generative",
  },
};

export const withDanger: Story = {
  args: {
    placeholder: "This field has an error",
    lines: 3,
    appearance: "danger",
  },
};

export const withWarning: Story = {
  args: {
    placeholder: "This field has a warning",
    lines: 3,
    appearance: "warning",
  },
};

export const withSuccess: Story = {
  args: {
    placeholder: "This field is valid",
    lines: 3,
    appearance: "success",
  },
};

export const singleLine: Story = {
  args: {
    placeholder: "Single line input",
    lines: 1,
    appearance: "none",
  },
};

export const multipleLines: Story = {
  args: {
    placeholder: "Multiple lines input for longer messages...",
    lines: 6,
    appearance: "none",
  },
};
