import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar, Button, Box } from "@nimbus-ds/components";

import { Menu } from "./Menu";
import { MenuStories as render } from "./menu.utils";

const meta: Meta<typeof Menu> = {
  title: "Patterns/Menu",
  component: Menu,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const basic: Story = {
  render: () => render,
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
          {render}
        </Sidebar>
      </>
    );
  },
  args: {},
};

export const menuInsideFixedBar: Story = {
  render: () => (
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
        {render}
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
  args: {},
};
