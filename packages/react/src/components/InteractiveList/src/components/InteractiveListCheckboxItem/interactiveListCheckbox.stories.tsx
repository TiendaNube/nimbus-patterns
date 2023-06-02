import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag, Box } from "@nimbus-ds/components";

import { InteractiveList } from "../../InteractiveList";

const meta: Meta<typeof InteractiveList.CheckboxItem> = {
  title: "Patterns/InteractiveList/InteractiveList.CheckboxItem",
  component: InteractiveList.CheckboxItem,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <InteractiveList>
      <InteractiveList.CheckboxItem {...args} />
      <InteractiveList.CheckboxItem
        {...args}
        title="Second element"
        description="Description of the second element"
        checkbox={{
          name: "InteractiveList elements",
        }}
      />
      <InteractiveList.CheckboxItem
        {...args}
        title="Third element"
        description="Description of the third element"
        checkbox={{
          name: "InteractiveList elements",
        }}
      />
    </InteractiveList>
  ),
};

export default meta;
type Story = StoryObj<typeof InteractiveList.CheckboxItem>;

export const basic: Story = {
  args: {
    title: "First element",
    description: "Description of the first element",
    checkbox: {
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
