import React from "react";

import { DataListProps, DataListComponents } from "./dataList.types";

import { DataListRow } from "./components";

import { Box } from "@nimbus-ds/components";

const DataList: React.FC<DataListProps> & DataListComponents = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: DataListProps) => (
  <Box
    role="list"
    borderStyle="solid"
    borderWidth="0 0 1px 0"
    borderColor="neutral.surfaceHighlight"
    backgroundColor="neutral.background"
    display="flex"
    flexDirection="column"
    width="100%"
    {...rest}
  >
    {children}
  </Box>
);

DataList.Row = DataListRow;

DataList.displayName = "DataList"
DataListRow.displayName = "DataList.Row"

export { DataList };
