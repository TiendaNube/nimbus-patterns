import React from "react";
import { Box, Icon, Title } from "@nimbus-ds/components";
import {
  LandingScreenCardProps,
  LandingScreenLayoutProps,
} from "./landingScreenCard.types";

/**
 * Card component for the LandingScreen. It is used to display a card with an icon, a title and children, generally used for
 * descriptive purposes.
 */
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

/**
 * Layout for the LandingScreenCard component. It is used to display multiple cards in a row or column, depending on the
 * screen size, as it is a responsive component.
 */
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
