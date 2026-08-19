import React from "react";
import { Box, Divider } from "@nimbus-ds/components";
import { PlanDisplayCardSpacingProps } from "./planDisplayCardSpacing.types";

// Issue #185 validation amendment — "Divider primitive": every gray
// separator between PlanDisplay content blocks (content and footer alike)
// must render through the Nimbus `Divider` component rather than
// reproducing the line with a `Box` border. The outer `Box` here is an
// internal wrapper used only for spacing — it carries the vertical margin
// that previously lived on the bordered `Box` — and does not change
// `PlanDisplay.Spacing`'s existing public API.
const PlanDisplayCardSpacing: React.FC<PlanDisplayCardSpacingProps> = (
  props
) => (
  <Box {...props} my="1">
    <Divider appearance="neutral" />
  </Box>
);

export { PlanDisplayCardSpacing };
