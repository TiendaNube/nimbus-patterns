import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayCardHeaderProps } from "./planDisplayCardHeader.types";

const PlanDisplayCardHeader: React.FC<PlanDisplayCardHeaderProps> = ({
  subtitle,
  title,
  tag,
  children,
}) => (
  <Box display="flex" flexDirection="column" gap="3">
    {tag ? (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="2"
      >
        <Text fontWeight="bold" fontSize="highlight">
          {subtitle}
        </Text>
        {tag}
      </Box>
    ) : (
      <Text fontWeight="bold" fontSize="highlight" color="neutral-textHigh">
        {subtitle}
      </Text>
    )}
    {title}

    {children && <Box pb="4">{children}</Box>}
  </Box>
);

export { PlanDisplayCardHeader };
