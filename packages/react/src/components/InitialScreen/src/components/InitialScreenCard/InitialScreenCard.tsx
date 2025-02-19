import React from "react";
import { Box, Icon, Title, Text } from "@nimbus-ds/components";
import {
  InitialScreenCardProps,
  InitialScreenCardLayoutProps,
} from "./initialScreenCard.types";

/**
 * Card component for the InitialScreen. It is used to display a card with an icon, a title and a text, generally used for descriptive purposes.
 */
const InitialScreenCard: React.FC<InitialScreenCardProps> = ({
  icon,
  title,
  description,
  ...rest
}) => (
  <Box p="4" borderRadius="2" boxShadow="2" flexGrow="1" width="100%" {...rest}>
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
      <Text color="neutral-textHigh" fontSize="caption" lineHeight="caption">
        {description}
      </Text>
    </Box>
  </Box>
);

/**
 * Layout for the InitialScreenCard component. It is used to display multiple cards in a row or column, depending on the
 * screen size, as it is a responsive component.
 */
const InitialScreenCardLayout: React.FC<InitialScreenCardLayoutProps> = ({
  children,
  ...rest
}) => (
  <Box
    display="flex"
    flexDirection={{ xs: "column", md: "row" }}
    gap="4"
    {...rest}
  >
    {children}
  </Box>
);

export { InitialScreenCard, InitialScreenCardLayout };
