import React from "react";
import { Box } from "@nimbus-ds/components";
import { PlanDisplayCardFooterProperties } from "./planDisplayCardFooter.types";
import PlanDisplayCardSpacing from "../PlanDisplayCardSpacing";

const PlanDisplayCardFooter: React.FC<PlanDisplayCardFooterProperties> = ({
  children,
}) => (
  <Box display="flex" flexDirection="column" gap="4">
    <PlanDisplayCardSpacing />

    <Box>{children}</Box>
  </Box>
);

export { PlanDisplayCardFooter };
