import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag, Box } from "@nimbus-ds/components";

import { InteractiveList } from "../../InteractiveList";

const meta: Meta<typeof InteractiveList.ToggleItem> = {
  title: "Patterns/InteractiveList/InteractiveList.ToggleItem",
  component: InteractiveList.ToggleItem,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <InteractiveList>
      <InteractiveList.ToggleItem {...args} />
      <InteractiveList.ToggleItem
        {...args}
        title="Second element"
        description="Description of the second element"
        toggle={{ name: "InteractiveList elements" }}
      />
      <InteractiveList.ToggleItem
        {...args}
        title="Third element"
        description="Description of the third element"
        toggle={{ name: "InteractiveList elements" }}
      />
    </InteractiveList>
  ),
};

export default meta;
type Story = StoryObj<typeof InteractiveList.ToggleItem>;

export const basic: Story = {
  args: {
    title: "First element",
    description: "Description of the first element",
    toggle: {
      name: "InteractiveList elements",
    },
    children: (
      <Box display="flex" gap="1" mt="2">
        <Tag>Text</Tag>
        <Tag>Text</Tag>
        <Tag>Text</Tag>
      </Box>
    ),
  },
};
