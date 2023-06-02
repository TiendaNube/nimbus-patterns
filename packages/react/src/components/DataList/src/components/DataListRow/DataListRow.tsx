import React from "react";
import { Box } from "@nimbus-ds/components";

import { DataListRowProps } from "./dataListRow.types";
import { rowPadding } from "./dataListRow.definitions";

const DataListRow: React.FC<DataListRowProps> = ({
  className: _className,
  style: _style,
  children,
  padding = "base",
  topDivider = true,
  ...rest
}: DataListRowProps) => (
  <Box
    role="listitem"
    borderStyle="solid"
    borderWidth="none"
    borderTopWidth={topDivider ? "1" : "none"}
    borderColor="neutral-surfaceHighlight"
    display="flex"
    flexDirection="column"
    padding={rowPadding[padding]}
    {...rest}
  >
    {children}
  </Box>
);

export { DataListRow };
