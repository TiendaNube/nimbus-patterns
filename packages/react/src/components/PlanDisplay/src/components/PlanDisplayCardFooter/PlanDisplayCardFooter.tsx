import React from "react";
import { Box, Divider } from "@nimbus-ds/components";
import { PlanDisplayCardFooterProperties } from "./planDisplayCardFooter.types";

const PlanDisplayCardFooter: React.FC<PlanDisplayCardFooterProperties> = ({
  icon,
  children,
}) => (
  <Box display="flex" flexDirection="column">
    <Box mb="3">
      <Divider />
    </Box>

    {icon ? (
      <Box display="flex" gap="2" alignItems="flex-start">
        <Box display="flex" alignItems="center">
          {icon}
        </Box>
        <Box>{children}</Box>
      </Box>
    ) : (
      <Box>{children}</Box>
    )}
  </Box>
);

export { PlanDisplayCardFooter };
