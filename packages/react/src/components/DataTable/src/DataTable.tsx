import React from "react";

import { Box, Table } from "@nimbus-ds/components";

import {
  DataTableBulkActions,
  DataTableFooter,
  DataTableHeader,
  DataTableRow,
} from "./components";

import { DataTableProps, DataTableComponents } from "./dataTable.types";

const DataTable: React.FC<DataTableProps> & DataTableComponents = ({
  className: _className,
  style: _style,
  bulkActions,
  header,
  footer,
  children,
  ...rest
}: DataTableProps) => (
  <Box>
    <Box
      position="relative"
      borderRadius=".5rem"
      borderColor="neutral-surfaceHighlight"
      borderStyle="solid"
      borderWidth="1px"
    >
      {bulkActions}
      <Table {...rest}>
        {header}
        <Table.Body>{children}</Table.Body>
      </Table>
    </Box>
    {footer}
  </Box>
);

export { DataTable };

DataTable.displayName = "DataTable";

DataTable.BulkActions = DataTableBulkActions;
DataTable.Header = DataTableHeader;
DataTable.Footer = DataTableFooter;
DataTable.Row = DataTableRow;

DataTable.BulkActions.displayName = "DataTable.BulkActions";
DataTable.Header.displayName = "DataTable.Header";
DataTable.Footer.displayName = "DataTable.Footer";
DataTable.Row.displayName = "DataTable.Row";
