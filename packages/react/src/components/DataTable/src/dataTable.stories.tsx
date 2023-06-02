import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import { DataTableRender } from "./dataTable.utils";

const meta: Meta<typeof DataTable> = {
  title: "Patterns/DataTable",
  component: DataTable,
  argTypes: {
    bulkActions: { control: { disable: true } },
    header: { control: { disable: true } },
    footer: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: DataTableRender,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const basic: Story = {
  args: {},
};
