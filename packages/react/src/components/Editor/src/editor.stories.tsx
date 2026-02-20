import type { Meta, StoryObj } from "@storybook/react";
import { Editor } from "./Editor";
import { defaultModules } from "./editor.definitions";

const meta: Meta<typeof Editor> = {
  title: "Patterns/Editor",
  component: Editor,
  tags: ["autodocs"],
  args: {
    modules: defaultModules,
  },
  argTypes: {
    modules: {
      control: { type: "object" },
      description:
        "List of toolbar module keys (strings). Example: [\"bold\", \"italic\", \"link\"]. Only these modules are loaded in the toolbar.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const Basic: Story = {
  args: {},
};
