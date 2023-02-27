import React from "react";

import { Box } from "@nimbus-ds/box";
import { Table } from "@nimbus-ds/table";

import {
  DataTableBulkActions,
  DataTableFooter,
  DataTableHeader,
  DataTableRow
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
  <Box {...rest}>
    <Box
      position="relative"
      borderRadius=".5rem"
      borderColor="neutral.surfaceHighlight"
      borderStyle="solid"
      borderWidth="1px"
    >
      {bulkActions}
      <Table>
        {header}
        <Table.Body>{children}</Table.Body>
      </Table>
    </Box>
    {footer}
  </Box>
);

export { DataTable };

DataTable.displayName = "DataTable";
DataTableBulkActions.displayName = "DataTable.BulkActions";
DataTableHeader.displayName = "DataTable.Header";
DataTableFooter.displayName = "DataTable.Footer";
DataTableRow.displayName = "DataTable.Row";

DataTable.BulkActions = DataTableBulkActions;
DataTable.Header = DataTableHeader;
DataTable.Footer = DataTableFooter;
DataTable.Row = DataTableRow;
