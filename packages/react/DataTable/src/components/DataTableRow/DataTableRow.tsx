import React from "react";

import { Table } from "@nimbus-ds/table";
import { Checkbox } from "@nimbus-ds/checkbox";

import { DataTableRowProps } from "./dataTableRow.types";

const DataTableRow: React.FC<DataTableRowProps> = ({
  className: _className,
  style: _style,
  checkbox,
  children,
  ...rest
}: DataTableRowProps) => (
  <Table.Row {...rest}>
    <Table.Cell width="1rem">
      <Checkbox {...checkbox} />
    </Table.Cell>
    {children}
  </Table.Row>
);

export { DataTableRow };
