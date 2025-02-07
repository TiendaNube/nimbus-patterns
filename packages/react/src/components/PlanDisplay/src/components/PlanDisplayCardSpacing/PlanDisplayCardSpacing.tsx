import React from "react";
import { Box } from "@nimbus-ds/components";
import { PlanDisplayCardSpacingProps } from "./planDisplayCardSpacing.types";

const PlanDisplayCardSpacing: React.FC<PlanDisplayCardSpacingProps> = () => (
  <Box
    borderTopWidth="1"
    borderColor="neutral-surface"
    borderStyle="solid"
    my="1"
  />
);

export { PlanDisplayCardSpacing };
