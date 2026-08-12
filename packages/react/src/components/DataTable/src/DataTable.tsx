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

// The container below needs to clip its content to its own rounded corners
// (see `DataTableBulkActions`, which sits flush against this box's top edge
// and relies on it for its own rounded top corners). `overflow="hidden"`
// clips visually, but any `overflow` value other than `visible` also turns
// its element into a CSS "scroll container" - the reference point the browser
// uses to resolve `position: sticky` on descendants - even when, like here,
// the container itself never actually scrolls. Since the bulk-actions bar's
// intended scroll ancestor is the page, not this non-scrolling container,
// that reclassification breaks its sticky-to-viewport behavior once it stops
// being pinned to a container that scrolls with the page.
// `overflow: clip` clips identically without establishing a scroll container,
// avoiding the regression, but `@nimbus-ds/components`'s `Box` only accepts
// "visible" | "hidden" | "scroll" | "auto" for its typed `overflow` prop, so
// it's applied here via a scoped class instead.
const CONTAINER_CLIP_CLASS_NAME = "nimbus-data-table-container";

const DataTable: React.FC<DataTableProps> & DataTableComponents = ({
  className,
  style: _style,
  bulkActions,
  header,
  footer,
  children,
  containerProps,
  ...rest
}: DataTableProps) => (
  <Box className={className}>
    <style>{`.${CONTAINER_CLIP_CLASS_NAME} { overflow: clip; }`}</style>
    <Box
      position="relative"
      borderRadius="2"
      borderColor="neutral-surfaceHighlight"
      borderStyle="solid"
      borderWidth="1"
      backgroundColor="neutral-surface"
      {...containerProps}
      className={[CONTAINER_CLIP_CLASS_NAME, containerProps?.className]
        .filter(Boolean)
        .join(" ")}
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
