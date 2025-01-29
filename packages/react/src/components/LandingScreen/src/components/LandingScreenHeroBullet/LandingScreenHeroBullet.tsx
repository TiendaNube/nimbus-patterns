import React from "react";
import { Box, Icon, Text } from "@nimbus-ds/components";
import { PropsWithChildren } from "react";

export type LandingScreenheroBulletProps = {
  icon: React.ReactNode;
  text: string;
};

const LandingScreenheroBullet: React.FC<
  PropsWithChildren<LandingScreenheroBulletProps>
> = ({ icon, text }) => {
  return (
    <Box display="flex" gap="3">
      <Icon color="primary-interactive" source={icon}></Icon>
      <Text color="danger-textHigh">{text}</Text>
    </Box>
  );
};

export { LandingScreenheroBullet };
