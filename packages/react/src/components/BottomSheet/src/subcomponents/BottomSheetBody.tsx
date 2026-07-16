import React from "react";
import { Box } from "@nimbus-ds/components";

import { PADDING_TOKEN_MAP } from "../bottomSheet.constants";
import { BottomSheetBodyProps } from "../bottomSheet.types";

export const BottomSheetBody: React.FC<BottomSheetBodyProps> = ({
  children,
  padding = "base",
  ...rest
}) => (
  <Box
    padding={PADDING_TOKEN_MAP[padding]}
    flex="1"
    minHeight="0"
    overflowY="auto"
    {...rest}
  >
    {children}
  </Box>
);

BottomSheetBody.displayName = "BottomSheetBody";
