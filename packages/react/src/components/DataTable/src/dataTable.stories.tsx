import React, { useState, useEffect } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@nimbus-ds/icons";

import { Table, Tag, Box, Chip, IconButton } from "@nimbus-ds/components";

import { DataTable } from "./DataTable";

import { RowProps, generateOrders } from "./dataTable.utils";

export default {
  title: "Patterns/DataTable",
  component: DataTable,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "DataTable.BulkActions": DataTable.BulkActions,
    "DataTable.Footer": DataTable.Footer,
    "DataTable.Header": DataTable.Header,
    "DataTable.Row": DataTable.Row,
  },
  argTypes: {
    bulkActions: { control: { disable: true } },
    header: { control: { disable: true } },
    footer: { control: { disable: true } },
    children: { control: { disable: true } },
  },
} as ComponentMeta<typeof DataTable>;

const Template: ComponentStory<typeof DataTable> = (args) => {
  const [rows, setRows] = useState<RowProps[]>(generateOrders(30));
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  const [headerCheckboxStatus, setHeaderCheckboxStatus] = useState(false);
  const [headerIndeterminateStatus, setHeaderIndeterminateStatus] =
    useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("descending");
  const [sortColumn, setSortColumn] = useState<"id" | "clientName">("id");

  useEffect(() => {
    if (checkedRows.length === rows.length) {
      setHeaderCheckboxStatus(true);
      setHeaderIndeterminateStatus(false);
    } else if (checkedRows.length > 0) {
      setHeaderCheckboxStatus(false);
      setHeaderIndeterminateStatus(true);
    } else {
      setHeaderCheckboxStatus(false);
      setHeaderIndeterminateStatus(false);
    }
  }, [checkedRows.length, rows.length]);

  const handleRowClick = (id: number) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((rowId) => rowId !== id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const handleHeaderCheckboxClick = () => {
    if (headerCheckboxStatus) {
      setCheckedRows([]);
    } else {
      const rowIds = rows.map((row) => row.id);
      setCheckedRows(rowIds);
    }
  };

  const handleBulkUpdateStatusClick = (status: boolean) => {
    const updatedRows = rows.map((row) => {
      const checked = checkedRows.includes(row.id);
      return { ...row, status: checked ? status : row.status };
    });
    setRows(updatedRows);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleSort = (column: "id" | "clientName") => {
    if (column === sortColumn) {
      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      setSortColumn(column);
      setSortDirection("ascending");
    }
  };

  const sortCompareFunction = (rowA: RowProps, rowB: RowProps) => {
    if (sortColumn === "id") {
      return sortDirection === "ascending"
        ? rowA.id - rowB.id
        : rowB.id - rowA.id;
    }
    if (sortColumn === "clientName") {
      return sortDirection === "ascending"
        ? rowA.clientName.localeCompare(rowB.clientName)
        : rowB.clientName.localeCompare(rowA.clientName);
    }
    return 0;
  };

  const getDisplayedRows = (): RowProps[] => {
    const sortedRows = rows.slice().sort(sortCompareFunction);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedRows.slice(startIndex, endIndex);
  };

  const displayedRows = getDisplayedRows();
  const totalRows = rows.length;
  const firstRow = (currentPage - 1) * pageSize + 1;
  const lastRow = Math.min(currentPage * pageSize, totalRows);

  const tableHeader = (
    <DataTable.Header
      checkbox={{
        name: "check-all-rows",
        checked: headerCheckboxStatus,
        onClick: handleHeaderCheckboxClick,
        indeterminate: headerIndeterminateStatus,
      }}
    >
      <Table.Cell width="120px">
        <Box display="flex" gap="2" alignItems="center">
          Order no.
          <IconButton
            source={
              sortDirection === "ascending" ? (
                <ChevronUpIcon size={10} />
              ) : (
                <ChevronDownIcon size={10} />
              )
            }
            size="1rem"
            onClick={() => handleSort("id")}
          />
        </Box>
      </Table.Cell>
      <Table.Cell width="auto">Client name</Table.Cell>
      <Table.Cell width="120px">Total</Table.Cell>
      <Table.Cell width="120px">Qty. of products</Table.Cell>
      <Table.Cell width="120px">Order status</Table.Cell>
    </DataTable.Header>
  );

  const tableFooter = (
    <DataTable.Footer
      itemCount={`Showing ${firstRow}-${lastRow} orders of ${totalRows}`}
      pagination={{
        pageCount: Math.ceil(totalRows / pageSize),
        activePage: currentPage,
        onPageChange: handlePageChange,
      }}
    />
  );

  const hasBulkActions = checkedRows.length > 0 && (
    <DataTable.BulkActions
      checkbox={{
        name: "check-all",
        checked: headerCheckboxStatus,
        onClick: handleHeaderCheckboxClick,
        indeterminate: headerIndeterminateStatus,
      }}
      label={`${checkedRows.length} selected`}
      action={
        <Box display="flex" gap="1">
          <Chip
            onClick={() => handleBulkUpdateStatusClick(true)}
            text="Fulfill orders"
          />
          <Chip
            onClick={() => handleBulkUpdateStatusClick(false)}
            text="Unfulfill orders"
          />
        </Box>
      }
    />
  );

  return (
    <DataTable
      {...args}
      header={tableHeader}
      footer={tableFooter}
      bulkActions={hasBulkActions}
    >
      {displayedRows.map((row) => {
        const { id, status } = row;
        const statusIcon = status ? (
          <CheckCircleIcon />
        ) : (
          <ExclamationTriangleIcon />
        );
        const statusAppearance = status ? "success" : "warning";
        const statusMsg = status ? "Fulfilled" : "Pending";

        return (
          <DataTable.Row
            key={id}
            onClick={() => handleRowClick(id)}
            backgroundColor={
              checkedRows.includes(id)
                ? {
                    rest: "primary-surface",
                    hover: "primary-surfaceHighlight",
                  }
                : {
                    rest: "neutral-background",
                    hover: "neutral-surface",
                  }
            }
            checkbox={{
              name: `check-${id}`,
              checked: checkedRows.includes(id),
              onClick: () => handleRowClick(id),
            }}
          >
            <Table.Cell>#{row.id}</Table.Cell>
            <Table.Cell>{row.clientName}</Table.Cell>
            <Table.Cell>{row.total}</Table.Cell>
            <Table.Cell>{row.qty}</Table.Cell>
            <Table.Cell>
              <Tag appearance={statusAppearance}>
                {statusIcon}
                {statusMsg}
              </Tag>
            </Table.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};

export const base = Template.bind({});
base.args = {};
