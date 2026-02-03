import React from "react";

import { Box, Table } from "@nimbus-ds/components";

import {
  DataTableBulkActions,
  DataTableCell,
  DataTableDropdown,
  DataTableDropdownAction,
  DataTableDropdownDivider,
  DataTableDropdownSection,
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
  containerProps,
  ...rest
}: DataTableProps) => (
  <Box>
    <Box
      position="relative"
      borderRadius="2"
      borderColor="neutral-surfaceHighlight"
      borderStyle="solid"
      borderWidth="1"
      {...containerProps}
      // overflow="hidden"
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
DataTable.Cell = DataTableCell;
DataTable.Dropdown = DataTableDropdown;
DataTable.DropdownAction = DataTableDropdownAction;
DataTable.DropdownDivider = DataTableDropdownDivider;
DataTable.DropdownSection = DataTableDropdownSection;
DataTable.Footer = DataTableFooter;
DataTable.Header = DataTableHeader;
DataTable.Row = DataTableRow;

DataTable.BulkActions.displayName = "DataTable.BulkActions";
DataTable.Cell.displayName = "DataTable.Cell";
DataTable.Dropdown.displayName = "DataTable.Dropdown";
DataTable.DropdownAction.displayName = "DataTable.DropdownAction";
DataTable.DropdownDivider.displayName = "DataTable.DropdownDivider";
DataTable.DropdownSection.displayName = "DataTable.DropdownSection";
DataTable.Footer.displayName = "DataTable.Footer";
DataTable.Header.displayName = "DataTable.Header";
DataTable.Row.displayName = "DataTable.Row";
