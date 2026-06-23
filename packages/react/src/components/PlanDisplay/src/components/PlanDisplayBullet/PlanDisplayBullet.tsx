import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayBulletProps } from "./planDisplayBullet.types";

const PlanDisplayBullet: React.FC<PlanDisplayBulletProps> = ({
  icon,
  disabled,
  badge,
  children,
}) => (
  <Box display="flex" gap="2" alignItems="flex-start">
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
    {badge ? (
      <Text
        fontWeight="regular"
        color={disabled ? "neutral-interactive" : "neutral-textLow"}
      >
        {children}{" "}
        <Box
          as="span"
          display="inline-flex"
          gap="2"
          style={{ verticalAlign: "middle" }}
        >
          {badge}
        </Box>
      </Text>
    ) : (
      <Text
        fontWeight="regular"
        color={disabled ? "neutral-interactive" : "neutral-textLow"}
      >
        {children}
      </Text>
    )}
  </Box>
);

export { PlanDisplayBullet };
