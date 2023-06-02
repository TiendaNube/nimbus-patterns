import type { Meta, StoryObj } from "@storybook/react";

import { DataTable } from "../../DataTable";
import { DataTableRender } from "../../dataTable.utils";

const meta: Meta<typeof DataTable.Row> = {
  title: "Patterns/DataTable/DataTable.Row",
  component: DataTable.Row,
  argTypes: {
    checkbox: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: DataTableRender,
};

export default meta;
type Story = StoryObj<typeof DataTable.Row>;

export const basic: Story = {
  args: {},
};
