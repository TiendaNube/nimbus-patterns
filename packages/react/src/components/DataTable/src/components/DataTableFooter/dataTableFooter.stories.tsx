import type { Meta, StoryObj } from "@storybook/react";

import { DataTable } from "../../DataTable";
import { DataTableRender } from "../../dataTable.utils";

const meta: Meta<typeof DataTable.Footer> = {
  title: "Patterns/DataTable/DataTable.Footer",
  component: DataTable.Footer,
  argTypes: {
    itemCount: { control: { disable: true } },
    pagination: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: DataTableRender,
};

export default meta;
type Story = StoryObj<typeof DataTable.Footer>;

export const basic: Story = {
  args: {},
};
