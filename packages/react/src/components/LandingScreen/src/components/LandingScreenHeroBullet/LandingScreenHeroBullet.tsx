import React, { PropsWithChildren } from "react";
import { Box, Icon, Text } from "@nimbus-ds/components";

export type LandingScreenHeroBulletProps = {
  icon: React.ReactNode;
  text: string;
};

const LandingScreenHeroBullet: React.FC<
  PropsWithChildren<LandingScreenHeroBulletProps>
> = ({ icon, text }) => (
  <Box display="flex" gap="3">
    <Icon color="primary-interactive" source={icon} />
    <Text color="danger-textHigh">{text}</Text>
  </Box>
);

export { LandingScreenHeroBullet };
