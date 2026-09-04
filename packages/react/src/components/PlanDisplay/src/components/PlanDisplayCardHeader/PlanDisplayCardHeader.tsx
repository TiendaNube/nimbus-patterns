import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayCardHeaderProps } from "./planDisplayCardHeader.types";

const PlanDisplayCardHeader: React.FC<PlanDisplayCardHeaderProps> = ({
  subtitle,
  title,
  tag,
  children,
}) => (
  <Box display="flex" flexDirection="column">
    <Box display="flex" alignItems="center" gap="2">
      <Text fontWeight="bold" fontSize="highlight">
        {subtitle}
      </Text>
      {tag}
    </Box>
    {title}

    {children && (
      <Box pt="3" pb="4">
        {children}
      </Box>
    )}
  </Box>
);

export { PlanDisplayCardHeader };
