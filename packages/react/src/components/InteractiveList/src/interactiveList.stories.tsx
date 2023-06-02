import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag, Box } from "@nimbus-ds/components";

import { InteractiveList } from "./InteractiveList";

const meta: Meta<typeof InteractiveList> = {
  title: "Patterns/InteractiveList",
  component: InteractiveList,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InteractiveList>;

export const basic: Story = {
  args: {
    title: "Title",
    bottomDivider: false,
    children: (
      <InteractiveList.ButtonItem
        title="First element"
        description="Description of the first element"
        iconButton={{
          onClick: () => console.log("clicked"),
        }}
        topDivider={false}
      >
        <Box display="flex" gap="1" mt="2">
          <Tag>Text</Tag>
          <Tag>Text</Tag>
          <Tag>Text</Tag>
        </Box>
      </InteractiveList.ButtonItem>
    ),
  },
};

export const asCheckbox: Story = {
  render: ({ children, ...args }) => (
    <InteractiveList {...args}>
      <InteractiveList.CheckboxItem
        title="First element"
        description="Description of the first element"
        checkbox={{
          name: "InteractiveList elements",
        }}
      >
        {children}
      </InteractiveList.CheckboxItem>
      <InteractiveList.CheckboxItem
        title="Second element"
        description="Description of the second element"
        checkbox={{
          name: "InteractiveList elements",
        }}
      >
        {children}
      </InteractiveList.CheckboxItem>
      <InteractiveList.CheckboxItem
        title="Third element"
        description="Description of the third element"
        checkbox={{
          name: "InteractiveList elements",
        }}
      >
        {children}
      </InteractiveList.CheckboxItem>
    </InteractiveList>
  ),
  args: {
    title: "Title",
    children: (
      <Box display="flex" gap="1" mt="2">
        <Tag>Text</Tag>
        <Tag>Text</Tag>
        <Tag>Text</Tag>
      </Box>
    ),
  },
};

export const asRadio: Story = {
  render: ({ children, ...args }) => (
    <InteractiveList {...args}>
      <InteractiveList.RadioItem
        title="First element"
        description="Description of the first element"
        radio={{ name: "InteractiveList elements" }}
      >
        {children}
      </InteractiveList.RadioItem>
      <InteractiveList.RadioItem
        title="Second element"
        description="Description of the second element"
        radio={{ name: "InteractiveList elements" }}
      >
        {children}
      </InteractiveList.RadioItem>
      <InteractiveList.RadioItem
        title="Third element"
        description="Description of the third element"
        radio={{ name: "InteractiveList elements" }}
      >
        {children}
      </InteractiveList.RadioItem>
    </InteractiveList>
  ),
  args: {
    title: "Title",
    children: (
      <Box display="flex" gap="1" mt="2">
        <Tag>Text</Tag>
        <Tag>Text</Tag>
        <Tag>Text</Tag>
      </Box>
    ),
  },
};

export const asToggle: Story = {
  render: ({ children, ...args }) => (
    <InteractiveList {...args}>
      <InteractiveList.ToggleItem
        title="First element"
        description="Description of the first element"
        toggle={{ name: "InteractiveList elements" }}
      >
        {children}
      </InteractiveList.ToggleItem>
      <InteractiveList.ToggleItem
        title="Second element"
        description="Description of the second element"
        toggle={{ name: "InteractiveList elements" }}
      >
        {children}
      </InteractiveList.ToggleItem>
      <InteractiveList.ToggleItem
        title="Third element"
        description="Description of the third element"
        toggle={{ name: "InteractiveList elements" }}
      >
        {children}
      </InteractiveList.ToggleItem>
    </InteractiveList>
  ),
  args: {
    title: "Title",
    children: (
      <Box display="flex" gap="1" mt="2">
        <Tag>Text</Tag>
        <Tag>Text</Tag>
        <Tag>Text</Tag>
      </Box>
    ),
  },
};

export const asButton: Story = {
  render: ({ children, ...args }) => (
    <InteractiveList {...args}>
      <InteractiveList.ButtonItem
        title="First element"
        description="Description of the first element"
        iconButton={{ onClick: () => console.log("clicked") }}
      >
        {children}
      </InteractiveList.ButtonItem>
      <InteractiveList.ButtonItem
        title="Second element"
        description="Description of the second element"
        iconButton={{ onClick: () => console.log("clicked") }}
      >
        {children}
      </InteractiveList.ButtonItem>
      <InteractiveList.ButtonItem
        title="Third element"
        description="Description of the third element"
        iconButton={{ onClick: () => console.log("clicked") }}
      >
        {children}
      </InteractiveList.ButtonItem>
    </InteractiveList>
  ),
  args: {
    title: "Title",
    children: (
      <Box display="flex" gap="1" mt="2">
        <Tag>Text</Tag>
        <Tag>Text</Tag>
        <Tag>Text</Tag>
      </Box>
    ),
  },
};
