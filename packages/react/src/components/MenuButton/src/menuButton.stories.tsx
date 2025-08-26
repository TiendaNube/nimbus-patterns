import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { ChevronRightIcon, HomeIcon } from "@nimbus-ds/icons";
import { Tag, Badge, Icon, Box } from "@nimbus-ds/components";

import { MenuButton, MenuButtonProps } from "./MenuButton";
import { MenuExpandContext } from "@common/contexts";

export const Basic: React.FC<MenuButtonProps> = (props: MenuButtonProps) => (
  <MenuButton {...props} />
);
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

export const stressedAppMenuButton: Story = {
  args: {
    label:
      "This is a very stressed menu button with a very long text to showcase what happens when the text overflows the button",
    startIcon: HomeIcon,
    children: <Tag appearance="primary">Children tag</Tag>,
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

export const menuButtonCollapsed: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState(false);
    return (
      <MenuExpandContext.Provider value={{ expanded }}>
        Click the button to {expanded ? "collapse" : "expand"}
        <Box maxWidth="200px">
          <MenuButton {...args} onClick={() => setExpanded(!expanded)} />
        </Box>
      </MenuExpandContext.Provider>
    );
  },
  args: {
    label: "Menu button",
    startIcon: HomeIcon,
  },
};

export const accordionMenuButtonCollapsed: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState(false);
    return (
      <MenuExpandContext.Provider value={{ expanded }}>
        Click the accordion to {expanded ? "collapse" : "expand"}
        <Box maxWidth="200px">
          <MenuButton.Accordion
            contentid="content-1"
            menuButton={{
              ...args,
              id: "control-1",
              "aria-controls": "content-1",
            }}
            onClick={() => setExpanded(!expanded)}
          >
            <MenuButton label="First item" />
            <MenuButton label="Second item" />
          </MenuButton.Accordion>
        </Box>
      </MenuExpandContext.Provider>
    );
  },
  args: {
    label: "Button collapsed",
    startIcon: HomeIcon,
  },
};
