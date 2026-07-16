import React from "react";
import { Box } from "@nimbus-ds/components";

import { PADDING_TOKEN_MAP } from "../bottomSheet.constants";
import { BottomSheetFooterProps } from "../bottomSheet.types";

export const BottomSheetFooter: React.FC<BottomSheetFooterProps> = ({
  children,
  padding = "base",
  ...rest
}) => (
  <Box
    padding={PADDING_TOKEN_MAP[padding]}
    flex="none"
    display="flex"
    gap="2"
    justifyContent="flex-end"
    {...rest}
  >
    {children}
  </Box>
);

BottomSheetFooter.displayName = "BottomSheetFooter";
