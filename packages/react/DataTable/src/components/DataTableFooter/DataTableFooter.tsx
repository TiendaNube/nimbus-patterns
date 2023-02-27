import React from "react";

import { Text, Pagination, Box } from "@nimbus-ds/components";

import { DataTableFooterProps } from "./dataTableFooter.types";

const DataTableFooter: React.FC<DataTableFooterProps> = ({
  className: _className,
  style: _style,
  itemCount,
  pagination,
  ...rest
}: DataTableFooterProps) => (
  <Box
    {...rest}
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    p="2"
  >
    <Text fontSize="caption" color="neutral.textLow">
      {itemCount}
    </Text>
    {pagination && <Pagination {...pagination} />}
  </Box>
);

export { DataTableFooter };
