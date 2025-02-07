import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayCardHeaderProps } from "./planDisplayCardHeader.types";

const PlanDisplayCardHeader: React.FC<PlanDisplayCardHeaderProps> = ({
  subtitle,
  title,
  children,
}) => (
  <Box display="flex" flexDirection="column">
    <Text fontWeight="bold" fontSize="highlight">
      {subtitle}
    </Text>
    {title}

    {children && <Box pt="2">{children}</Box>}
  </Box>
);

export { PlanDisplayCardHeader };
