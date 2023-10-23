import React, { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { ChevronRightIcon, HomeIcon } from "@nimbus-ds/icons";
import { Tag, Badge, Icon } from "@nimbus-ds/components";

import { MenuButton, MenuButtonProps } from "./MenuButton";

export const Basic: React.FC<MenuButtonProps> = forwardRef(
  ({ children = "Button", ...props }: MenuButtonProps) => (
    <MenuButton {...props}>{children}</MenuButton>
  )
) as React.FC<MenuButtonProps>;
Basic.displayName = "MenuButton";

const meta: Meta<typeof Basic> = {
  title: "Patterns/MenuButton",
  component: Basic,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => {
    const [{ active }, updateArgs] = useArgs();
    const handleActive = () => updateArgs({ active: !active });
    return <Basic {...args} onClick={handleActive} active={active} />;
  },
};

export default meta;
type Story = StoryObj<typeof MenuButton>;

export const basic: Story = {
  args: {
    label: "Menu button",
    startIcon: HomeIcon,
  },
};

export const sampleAppMenuButton: Story = {
  args: {
    label: "Menu button",
    startIcon: HomeIcon,
  },
};

export const accordionMenuButton: Story = {
  render: (args) => (
    <MenuButton.Accordion
      contentid="content-1"
      menuButton={{
        ...args,
        id: "control-1",
        "aria-controls": "content-1",
      }}
    >
      <MenuButton label="First item" />
      <MenuButton label="Second item" />
    </MenuButton.Accordion>
  ),
  args: {
    label: "Menu accordion",
    startIcon: HomeIcon,
  },
};

export const menuButtonWithTag: Story = {
  args: {
    label: "Button with tag children",
    startIcon: HomeIcon,
    children: <Tag appearance="primary">Children tag</Tag>,
  },
};

export const menuButtonWithBadge: Story = {
  args: {
    label: "Button with badge children",
    startIcon: HomeIcon,
    children: <Badge count="9999" appearance="primary" />,
  },
};

export const menuButtonWithRightIcon: Story = {
  args: {
    label: "Button with right icon children",
    startIcon: HomeIcon,
    children: <Icon source={<ChevronRightIcon />} />,
  },
};
