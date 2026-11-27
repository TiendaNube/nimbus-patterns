import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar, Button, Box } from "@nimbus-ds/components";
import { CogIcon } from "@nimbus-ds/icons";

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

export const norteUi: Story = {
  render: (args) => (
    <Box display="flex" gap="6" alignItems="flex-start">
      <Box display="flex" width="240px" height="640px">
        <DefaultMenu {...args} expanded />
      </Box>
      <Box display="flex" width="48px" height="640px">
        <DefaultMenu {...args} expanded={false} />
      </Box>
      <Box display="flex" flexDirection="column" gap="2" width="240px">
        <Menu>
          <Menu.Footer label="Configuración" startIcon={CogIcon} active />
        </Menu>
        <Menu>
          <Menu.Footer label="Configuración" startIcon={CogIcon} disabled />
        </Menu>
      </Box>
    </Box>
  ),
  parameters: { nimbusTheme: "next-norteui" },
};

export const norteUiCollapsedRail: Story = {
  render: (args) => (
    <Box display="flex" width="48px" height="640px">
      <DefaultMenu {...args} expanded={false} />
    </Box>
  ),
  args: {
    expanded: false,
  },
  parameters: { nimbusTheme: "next-norteui" },
};
