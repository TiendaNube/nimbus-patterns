import type { Meta, StoryObj } from "@storybook/react";

import { DataTable } from "../../DataTable";
import { DataTableRender } from "../../dataTable.utils";

const meta: Meta<typeof DataTable.BulkActions> = {
  title: "Patterns/DataTable/DataTable.BulkActions",
  component: DataTable.BulkActions,
  argTypes: {
    link: { control: { disable: true } },
    action: { control: { disable: true } },
    checkbox: { control: { disable: true } },
    label: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: DataTableRender,
};

export default meta;
type Story = StoryObj<typeof DataTable.BulkActions>;

export const basic: Story = {
  args: {},
};
