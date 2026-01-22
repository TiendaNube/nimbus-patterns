import React from "react";

import { Table, Checkbox } from "@nimbus-ds/components";

import { DataTableHeaderProps } from "./dataTableHeader.types";

const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  className: _className,
  style: _style,
  checkbox,
  children,
  ...rest
}: DataTableHeaderProps) => (
  <Table.Head {...rest}>
    <Table.Row backgroundColor="neutral-surface">
      <Table.Cell as="th" column={0} width="1rem">
        <Checkbox {...checkbox} />
      </Table.Cell>
      {children}
    </Table.Row>
  </Table.Head>
);

export { DataTableHeader };
