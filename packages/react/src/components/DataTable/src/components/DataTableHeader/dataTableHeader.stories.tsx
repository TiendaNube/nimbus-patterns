import type { Meta, StoryObj } from "@storybook/react";

import { DataTable } from "../../DataTable";
import { DataTableRender } from "../../dataTable.utils";

const meta: Meta<typeof DataTable.Header> = {
  title: "Patterns/DataTable/DataTable.Header",
  component: DataTable.Header,
  argTypes: {
    checkbox: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: DataTableRender,
};

export default meta;
type Story = StoryObj<typeof DataTable.Header>;

export const basic: Story = {
  args: {},
};
