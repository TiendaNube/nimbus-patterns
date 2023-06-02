import type { Meta, StoryObj } from "@storybook/react";

import { DataTable } from "../../DataTable";
import { DataTableRender } from "../../dataTable.utils";

const meta: Meta<typeof DataTable.Cell> = {
  title: "Patterns/DataTable/DataTable.Cell",
  component: DataTable.Cell,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: DataTableRender,
};

export default meta;
type Story = StoryObj<typeof DataTable.Cell>;

export const basic: Story = {
  args: {},
};
