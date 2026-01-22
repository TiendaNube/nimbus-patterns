import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Icon, TableColumnLayout } from "@nimbus-ds/components";
import { EditIcon } from "@nimbus-ds/icons";
import { DataTable } from "./DataTable";
import { DataTableRender } from "./dataTable.utils";
import { DataTableProperties } from "./dataTable.types";

type ExtendedDataTableProps = DataTableProperties & {
  fixedLeftColumn: boolean;
};

const meta: Meta<ExtendedDataTableProps> = {
  title: "Patterns/DataTable",
  component: DataTable,
  argTypes: {
    bulkActions: { control: { disable: true } },
    header: { control: { disable: true } },
    footer: { control: { disable: true } },
    children: { control: { disable: true } },
    fixedLeftColumn: { control: { type: "boolean" } },
  },
  tags: ["autodocs"],
  render: DataTableRender,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const basic: Story = {
  args: {},
};

export const withFixedLeftColumn: Story = {
  render: () => {
    const columnLayout: TableColumnLayout[] = [
      { id: "column-id", width: "80px", fixed: "left" },
      { id: "column-name", width: "150px", fixed: "left" },
      { id: "column-email", grow: 1 },
      { id: "column-actions", grow: 1 },
    ];

    const data = [
      {
        id: "001",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
        department: "Engineering",
        location: "New York",
        status: "Active",
      },
      {
        id: "002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Manager",
        department: "Marketing",
        location: "Los Angeles",
        status: "Active",
      },
      {
        id: "003",
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        role: "Developer",
        department: "Engineering",
        location: "Chicago",
        status: "Inactive",
      },
      {
        id: "004",
        name: "Alice Brown",
        email: "alice.brown@example.com",
        role: "Designer",
        department: "Design",
        location: "San Francisco",
        status: "Active",
      },
      {
        id: "005",
        name: "Charlie Wilson",
        email: "charlie.wilson@example.com",
        role: "Analyst",
        department: "Finance",
        location: "Boston",
        status: "Active",
      },
    ];

    return (
      <DataTable
        columnLayout={columnLayout}
        header={
          <DataTable.Header
            checkbox={{ name: "check-all-rows", checked: false }}
          >
            <DataTable.Cell column={1}>Name</DataTable.Cell>
            <DataTable.Cell column={2}>Email</DataTable.Cell>
            <DataTable.Cell column={3}>Actions</DataTable.Cell>
          </DataTable.Header>
        }
      >
        <DataTable.Row checkbox={{ name: "check-all-rows", checked: false }}>
          <DataTable.Cell column={1}>{data[0].name}</DataTable.Cell>
          <DataTable.Cell column={2}>{data[0].email}</DataTable.Cell>
          <DataTable.Cell column={3}>
            <Button>
              <Icon source={<EditIcon />} />
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    );
  },
};
