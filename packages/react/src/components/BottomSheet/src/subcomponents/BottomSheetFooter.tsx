import React from "react";
import { Box } from "@nimbus-ds/components";

import { PADDING_TOKEN_MAP } from "../bottomSheet.constants";
import { BottomSheetFooterProps } from "../bottomSheet.types";

/**
 * Optional chrome region rendered below `BottomSheet.Body`, laid out as a
 * right-aligned row (e.g. Cancel/Confirm actions). Omitting `Footer` entirely
 * is how a sheet renders without a footer region — the `Body` simply extends
 * to the bottom of the panel.
 */
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
