import React from "react";

import { DataListRowProps } from "./dataListRow.types";
import { rowPadding } from "./dataListRow.definitions";

import { Box } from "@nimbus-ds/components";

const DataListRow: React.FC<DataListRowProps> = ({
  className: _className,
  style: _style,
  children,
  padding = "base",
  ...rest
}: DataListRowProps) => (
  <Box
    role="listitem"
    borderStyle="solid"
    borderWidth="1px 0 0 0"
    borderColor="neutral.surfaceHighlight"
    display="flex"
    flexDirection="column"
    padding={rowPadding[padding]}
    {...rest}
  >
    {children}
  </Box>
);

export { DataListRow };
