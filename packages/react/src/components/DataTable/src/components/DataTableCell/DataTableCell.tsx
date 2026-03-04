import React from "react";

import { Table } from "@nimbus-ds/components";

import { DataTableCellProps } from "./dataTableCell.types";

const DataTableCell: React.FC<DataTableCellProps> = ({
  style: _style,
  children,
  ...rest
}: DataTableCellProps) => <Table.Cell {...rest}>{children}</Table.Cell>;

export { DataTableCell };
