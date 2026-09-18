import React from "react";
import { Box, Divider } from "@nimbus-ds/components";
import { PlanDisplayCardSpacingProps } from "./planDisplayCardSpacing.types";

const PlanDisplayCardSpacing: React.FC<PlanDisplayCardSpacingProps> = (
  props
) => (
  <Box {...props} my="3">
    <Divider />
  </Box>
);

export { PlanDisplayCardSpacing };
