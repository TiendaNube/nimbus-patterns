import React from "react";
import { Box, Icon, Text } from "@nimbus-ds/components";
import { InitialScreenBulletProps } from "./initialScreenBullet.types";

/**
 * Bullet component for the InitialScreen. It is used to display a bullet point with an icon and a text.
 */
const InitialScreenBullet: React.FC<InitialScreenBulletProps> = ({
  icon,
  text,
}) => (
  <Box display="flex" gap="3">
    <Icon color="primary-interactive" source={icon} />
    <Text color="danger-textHigh">{text}</Text>
  </Box>
);

export { InitialScreenBullet };
