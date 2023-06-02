import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag, Box } from "@nimbus-ds/components";

import { InteractiveList } from "../../InteractiveList";

const meta: Meta<typeof InteractiveList.ButtonItem> = {
  title: "Patterns/InteractiveList/InteractiveList.ButtonItem",
  component: InteractiveList.ButtonItem,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InteractiveList.ButtonItem>;

export const basic: Story = {
  render: (args) => (
    <InteractiveList>
      <InteractiveList.ButtonItem {...args} />
      <InteractiveList.ButtonItem
        {...args}
        title="Second element"
        description="Description of the second element"
        iconButton={{ onClick: () => console.log("clicked") }}
      />
      <InteractiveList.ButtonItem
        {...args}
        title="Third element"
        description="Description of the third element"
        iconButton={{ onClick: () => console.log("clicked") }}
      />
    </InteractiveList>
  ),
  args: {
    title: "First element",
    description: "Description of the first element",
    iconButton: { onClick: () => console.log("clicked") },
    children: (
      <Box display="flex" gap="1" mt="2">
        <Tag>Text</Tag>
        <Tag>Text</Tag>
        <Tag>Text</Tag>
      </Box>
    ),
  },
};
