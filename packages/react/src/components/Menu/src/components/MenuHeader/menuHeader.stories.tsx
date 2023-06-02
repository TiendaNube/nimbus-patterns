import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ExternalLinkIcon, TiendanubeIcon } from "@nimbus-ds/icons";
import { Box, IconButton, Icon, Text } from "@nimbus-ds/components";

import { Menu } from "../../Menu";

const meta: Meta<typeof Menu.Header> = {
  title: "Patterns/Menu/Menu.Header",
  component: Menu.Header,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <Menu>
      <Menu.Header {...args} />
    </Menu>
  ),
};

export default meta;
type Story = StoryObj<typeof Menu.Header>;

export const basic: Story = {
  args: {
    children: (
      <Box display="flex" gap="2" alignItems="center" width="100%">
        <Icon
          color="neutral-textHigh"
          source={<TiendanubeIcon size="medium" />}
        />
        <Box display="inline-flex" flex="1">
          <Text fontSize="base" color="neutral-textHigh" fontWeight="bold">
            Tienda demo
          </Text>
        </Box>
        <IconButton source={<ExternalLinkIcon />} size="2rem" />
      </Box>
    ),
  },
};
