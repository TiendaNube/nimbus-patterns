import type { Meta, StoryObj } from "@storybook/react";
import { Editor } from "./Editor";

const meta: Meta<typeof Editor> = {
  title: "Patterns/Editor",
  component: Editor,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const Basic: Story = {
  args: {},
};
