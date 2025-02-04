import React from "react";
import { Box, Icon, Title } from "@nimbus-ds/components";
import {
  LandingScreenCardProps,
  LandingScreenLayoutProps,
} from "./landingScreenCard.types";

const LandingScreenCard: React.FC<LandingScreenCardProps> = ({
  icon,
  title,
  children,
}) => (
  <Box p="4" borderRadius="2" boxShadow="2">
    <Box
      backgroundColor="primary-surface"
      borderRadius="5"
      width="fit-content"
      p="2"
      marginBottom="4"
    >
      <Icon color="primary-interactive" source={icon} />
    </Box>
    <Box display="flex" flexDirection="column" gap="2">
      <Title as="h4">{title}</Title>
      {children}
    </Box>
  </Box>
);

const LandingScreenCardLayout: React.FC<LandingScreenLayoutProps> = ({
  children,
  ...rest
}) => (
  <Box
    display="flex"
    flexDirection={{ xs: "column", md: "row" }}
    gap="3"
    {...rest}
  >
    {children}
  </Box>
);

export { LandingScreenCard, LandingScreenCardLayout };
