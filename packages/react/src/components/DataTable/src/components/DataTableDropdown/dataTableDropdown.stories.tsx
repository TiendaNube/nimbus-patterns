import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box, Icon, Link } from "@nimbus-ds/components";
import {
  ChevronDownIcon,
  EyeIcon,
  EyeOffIcon,
  TrashIcon,
} from "@nimbus-ds/icons";

import { DataTable } from "../../DataTable";

const meta: Meta<typeof DataTable.Dropdown> = {
  title: "Patterns/DataTable/DataTable.Dropdown",
  component: DataTable.Dropdown,
  argTypes: {
    children: { control: { disable: true } },
    trigger: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable.Dropdown>;

const dropdownActions = (
  <>
    <DataTable.DropdownSection>
      <DataTable.DropdownAction icon={<TrashIcon />} label="Exclude" />
      <DataTable.DropdownAction icon={<EyeIcon />} label="View in store" />
      <DataTable.DropdownAction
        icon={<EyeOffIcon />}
        label="Hide from store"
        disabled
      />
    </DataTable.DropdownSection>
    <DataTable.DropdownDivider />
    <DataTable.DropdownSection>
      <DataTable.DropdownAction label="Delete orders" />
    </DataTable.DropdownSection>
  </>
);

export const basic: Story = {
  args: {
    placeholder: "Choose an action",
  },
  render: (args) => (
    <Box padding="4">
      <DataTable.Dropdown {...args}>{dropdownActions}</DataTable.Dropdown>
    </Box>
  ),
};

export const withCustomTrigger: Story = {
  args: {
    trigger: (
      <Link textDecoration="none" as="button">
        More actions
        <Icon color="currentColor" source={<ChevronDownIcon />} />
      </Link>
    ),
  },
  render: (args) => (
    <Box padding="4">
      <DataTable.Dropdown {...args}>{dropdownActions}</DataTable.Dropdown>
    </Box>
  ),
};
