import React from "react";
import { Box, Icon, Text } from "@nimbus-ds/components";
import { LandingScreenBulletProps } from "./landingScreenBullet.types";

/**
 * Bullet component for the LandingScreen. It is used to display a bullet point with an icon and a text.
 */
const LandingScreenBullet: React.FC<LandingScreenBulletProps> = ({
  icon,
  text,
}) => (
  <Box display="flex" gap="3">
    <Icon color="primary-interactive" source={icon} />
    <Text color="danger-textHigh">{text}</Text>
  </Box>
);

export { LandingScreenBullet };
