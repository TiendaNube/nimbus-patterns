import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayBulletProps } from "./planDisplayBullet.types";
import { VisuallyHidden } from "./VisuallyHidden";

const PlanDisplayBullet: React.FC<PlanDisplayBulletProps> = ({
  icon,
  badge,
  disabled,
  unavailableLabel,
  children,
}) => (
  <Box display="flex" gap="2">
    <Box display="flex" alignItems="center">
      <Text
        as="span"
        color={disabled ? "neutral-interactive" : "primary-interactive"}
      >
        <Box display="flex" alignItems="center">
          {icon}
        </Box>
      </Text>
    </Box>
    <Text
      fontWeight="medium"
      color={disabled ? "neutral-interactive" : "neutral-textLow"}
    >
      {children}
    </Text>
    {badge}
    {disabled && unavailableLabel && (
      <VisuallyHidden>{unavailableLabel}</VisuallyHidden>
    )}
  </Box>
);

export { PlanDisplayBullet };
