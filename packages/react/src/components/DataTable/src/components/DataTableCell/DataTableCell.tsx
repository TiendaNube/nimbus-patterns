import React from "react";

import { Table } from "@nimbus-ds/components";

import { DataTableCellProps } from "./dataTableCell.types";

const DataTableCell: React.FC<DataTableCellProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: DataTableCellProps) => <Table.Cell {...rest}>{children}</Table.Cell>;

export { DataTableCell };
