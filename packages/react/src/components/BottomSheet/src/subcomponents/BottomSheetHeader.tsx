import React from "react";
import { Box } from "@nimbus-ds/components";

import { PADDING_TOKEN_MAP } from "../bottomSheet.constants";
import { BottomSheetHeaderProps } from "../bottomSheet.types";

/**
 * Chrome region rendered above `BottomSheet.Body`. Accepts any content
 * (title, actions, icons) — the drag grabber is separate sheet chrome
 * rendered above this region, not part of it. Optional: a sheet composed
 * without a `Header` simply has no chrome above its `Body`.
 *
 * When rendered, `BottomSheet` automatically labels the dialog via
 * `aria-labelledby` pointing at this element, unless the consumer passes an
 * explicit `aria-label`/`aria-labelledby` on `BottomSheet` itself.
 */
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
