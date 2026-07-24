import React from "react";
import { Box } from "@nimbus-ds/components";

import { PADDING_TOKEN_MAP } from "../bottomSheet.constants";
import { BottomSheetBodyProps } from "../bottomSheet.types";

/**
 * The sheet's scrollable content region, rendered between `Header` and
 * `Footer`. The only subcomponent whose `children` is required — every
 * `BottomSheet` composition is expected to include a `Body`. Handles its own
 * vertical scrolling (`flex="1"`, `minHeight="0"`, `overflowY="auto"`), which
 * is what lets the outer panel avoid clipping floating content (e.g. a
 * `Popover` opened from inside it) with its own `overflow`.
 */
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
