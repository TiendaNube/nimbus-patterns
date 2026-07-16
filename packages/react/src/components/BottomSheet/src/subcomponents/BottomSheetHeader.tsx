import React from "react";
import { Box } from "@nimbus-ds/components";

import { PADDING_TOKEN_MAP } from "../bottomSheet.constants";
import { BottomSheetHeaderProps } from "../bottomSheet.types";

export const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({
  children,
  padding = "base",
  ...rest
}) => (
  <Box padding={PADDING_TOKEN_MAP[padding]} flex="none" {...rest}>
    {children}
  </Box>
);

BottomSheetHeader.displayName = "BottomSheetHeader";
