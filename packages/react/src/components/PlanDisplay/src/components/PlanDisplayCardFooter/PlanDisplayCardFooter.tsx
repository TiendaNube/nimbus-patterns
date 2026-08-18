import React from "react";
import { Box } from "@nimbus-ds/components";
import { PlanDisplayCardFooterProperties } from "./planDisplayCardFooter.types";
import PlanDisplayCardSpacing from "../PlanDisplayCardSpacing";

const PlanDisplayCardFooter: React.FC<PlanDisplayCardFooterProperties> = ({
  icon,
  children,
}) => (
  // mt="auto" anchors the footer to the bottom of an equal-height card,
  // keeping footers aligned across cards in the same comparison.
  <Box display="flex" flexDirection="column" gap="4" mt="auto">
    <PlanDisplayCardSpacing />

    <Box display="flex" alignItems="center" gap="2">
      {icon}
      <Box>{children}</Box>
    </Box>
  </Box>
);

export { PlanDisplayCardFooter };
