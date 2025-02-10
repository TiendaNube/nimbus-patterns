import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayBulletProps } from "./planDisplayBullet.types";

const PlanDisplayBullet: React.FC<PlanDisplayBulletProps> = ({
  icon,
  disabled,
  children,
}) => (
  <Box display="flex" gap="2">
    <Box display="flex" alignItems="center">
      <Text color={disabled ? "neutral-textDisabled" : "success-textLow"}>
        <Box display="flex" alignItems="center">
          {icon}
        </Box>
      </Text>
    </Box>
    <Text
      fontWeight="medium"
      color={disabled ? "neutral-textDisabled" : "neutral-textHigh"}
    >
      {children}
    </Text>
  </Box>
);

export { PlanDisplayBullet };
