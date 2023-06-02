import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag, Box } from "@nimbus-ds/components";

import { InteractiveList } from "../../InteractiveList";

const meta: Meta<typeof InteractiveList.RadioItem> = {
  title: "Patterns/InteractiveList/InteractiveList.RadioItem",
  component: InteractiveList.RadioItem,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <InteractiveList>
      <InteractiveList.RadioItem {...args} />
      <InteractiveList.RadioItem
        {...args}
        title="Second element"
        description="Description of the second element"
        radio={{ name: "InteractiveList elements" }}
      />
      <InteractiveList.RadioItem
        {...args}
        title="Third element"
        description="Description of the third element"
        radio={{ name: "InteractiveList elements" }}
      />
    </InteractiveList>
  ),
};

export default meta;
type Story = StoryObj<typeof InteractiveList.RadioItem>;

export const basic: Story = {
  args: {
    title: "First element",
    description: "Description of the first element",
    radio: {
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
