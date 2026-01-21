import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@nimbus-ds/icons";
import { Tag, Box, Chip, IconButton, TableColumnLayout } from "@nimbus-ds/components";
import { DataTable } from "./DataTable";

export interface RowProps {
  id: number;
  clientName: string;
  total: string;
  qty: string;
  status: boolean;
}

type OrderProps = RowProps;

export const generateOrders = (count: number): OrderProps[] => {
  const orders: OrderProps[] = [];
  for (let i = 1; i <= count; i += 1) {
    orders.push({
      id: i,
      clientName: faker.name.fullName(),
      total: faker.finance.amount(3, 100000, 2, "R$", true),
      qty: faker.random.numeric(),
      status: false,
    });
  }
  return orders.reverse();
};

export const DataTableRender = (args: any) => {
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
      <DataTable.Cell column={1} width="120px">
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
      </DataTable.Cell>
      <DataTable.Cell column={2} width="auto">Client name</DataTable.Cell>
      <DataTable.Cell column={3} width="120px">Total</DataTable.Cell>
      <DataTable.Cell column={4} width="120px">Qty. of products</DataTable.Cell>
      <DataTable.Cell column={5} width="120px">Order status</DataTable.Cell>
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

  const columnLayout: TableColumnLayout[] = [
    { id: "column-checkbox", width: "40px", fixed: args.fixedLeftColumn ? "left" : undefined },
    { id: "column-order-number", width: "80px", fixed: args.fixedLeftColumn ? "left" : undefined},
    { id: "column-client-name", width: "150px" },
    { id: "column-total", grow: 1 },
    { id: "column-qty", grow: 1 },
    { id: "column-status", width: "120px", grow: 1 },
  ];

  return (
    <DataTable
      columnLayout={columnLayout}
      {...args}
      header={tableHeader}
      footer={tableFooter}
      bulkActions={hasBulkActions}
      minWidth="600px"
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
            <DataTable.Cell column={1}>#{row.id}</DataTable.Cell>
            <DataTable.Cell column={2}>{row.clientName}</DataTable.Cell>
            <DataTable.Cell column={3}>{row.total}</DataTable.Cell>
            <DataTable.Cell column={4}>{row.qty}</DataTable.Cell>
            <DataTable.Cell column={5}>
              <Tag appearance={statusAppearance}>
                {statusIcon}
                {statusMsg}
              </Tag>
            </DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};
