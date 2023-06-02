import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag, Box } from "@nimbus-ds/components";

import { InteractiveList } from "../../InteractiveList";

const meta: Meta<typeof InteractiveList.CheckboxItemSkeleton> = {
  title: "Patterns/InteractiveList/InteractiveList.CheckboxItemSkeleton",
  component: InteractiveList.CheckboxItemSkeleton,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <InteractiveList>
      <InteractiveList.CheckboxItemSkeleton {...args} />
      <InteractiveList.CheckboxItemSkeleton
        {...args}
        title="Second element"
        description="Description of the second element"
      />
      <InteractiveList.CheckboxItemSkeleton
        {...args}
        title="Third element"
        description="Description of the third element"
      />
    </InteractiveList>
  ),
};

export default meta;
type Story = StoryObj<typeof InteractiveList.CheckboxItemSkeleton>;

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
