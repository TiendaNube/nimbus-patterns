import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag, Box } from "@nimbus-ds/components";

import { InteractiveList } from "../../InteractiveList";

const meta: Meta<typeof InteractiveList.ButtonItemSkeleton> = {
  title: "Patterns/InteractiveList/InteractiveList.ButtonItemSkeleton",
  component: InteractiveList.ButtonItemSkeleton,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <InteractiveList>
      <InteractiveList.ButtonItemSkeleton {...args} />
      <InteractiveList.ButtonItemSkeleton
        {...args}
        title="Second element"
        description="Description of the second element"
      />
      <InteractiveList.ButtonItemSkeleton
        {...args}
        title="Third element"
        description="Description of the third element"
      />
    </InteractiveList>
  ),
};

export default meta;
type Story = StoryObj<typeof InteractiveList.ButtonItemSkeleton>;

export const basic: Story = {
  args: {
    title: "First element",
    description: "Description of the first element",
    children: (
      <Box display="flex" gap="1" mt="2">
        <Tag.Skeleton />
        <Tag.Skeleton />
        <Tag.Skeleton />
      </Box>
    ),
  },
};
