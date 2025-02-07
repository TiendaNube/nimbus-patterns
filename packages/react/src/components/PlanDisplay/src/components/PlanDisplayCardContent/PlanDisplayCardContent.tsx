import React from "react";
import { Box } from "@nimbus-ds/components";
import { PlanDisplayCardContentProps } from "./planDisplayCardContent.types";
import PlanDisplayCardSpacing from "../PlanDisplayCardSpacing";

const PlanDisplayCardContent: React.FC<PlanDisplayCardContentProps> = ({
  children,
}) => (
  <Box>
    <PlanDisplayCardSpacing />

    <Box display="flex" flexDirection="column" gap="1" py="2">
      {children}
    </Box>
  </Box>
);

export { PlanDisplayCardContent };
