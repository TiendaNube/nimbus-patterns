import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar, Button, Box } from "@nimbus-ds/components";

import { Menu } from "./Menu";
import { MenuStories as DefaultMenu } from "./menu.utils";

const meta: Meta<typeof Menu> = {
  title: "Patterns/Menu",
  component: Menu,
  argTypes: {
    children: { control: { disable: true } },
    expanded: { control: "boolean", defaultValue: true },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const basic: Story = {
  render: (args) => <DefaultMenu {...args} />,
  args: {},
};

export const menuInsideSidebar: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen((prevState) => !prevState);
    return (
      <>
        <Button onClick={handleClose}>Open</Button>
        <Sidebar {...args} onRemove={handleClose} open={open}>
          <DefaultMenu {...args} />
        </Sidebar>
      </>
    );
  },
  args: {
    expanded: false,
  },
};

export const menuInsideFixedBar: Story = {
  render: (args) => (
    <Box display="flex" gap="4">
      <Box
        display="flex"
        flex="0 1 auto"
        width="20rem"
        height="100vh"
        borderColor="neutral-surfaceHighlight"
        borderStyle="solid"
        borderWidth="none"
        borderRightWidth="1"
        position="sticky"
        left="0"
        top="0"
        overflow="hidden"
      >
        <DefaultMenu {...args} />
      </Box>
      <Box
        display="flex"
        flex="1 1 auto"
        backgroundColor="primary-surface"
        borderColor="primary-interactive"
        borderStyle="dashed"
        borderWidth="1"
        borderRadius="2"
        height="100vh"
        width="100%"
        padding="4"
      />
    </Box>
  ),
  args: {
    expanded: true,
  },
};

export const menuCollapsed: Story = {
  render: (args) => (
    <Box display="flex" gap="4" width={args.expanded ? "200px" : "50px"}>
      <DefaultMenu {...args} />
    </Box>
  ),
  args: {
    expanded: false,
  },
};
