import React from "react";
import { ChevronRightIcon } from "@nimbus-ds/icons";
import { Box, Icon, Text } from "@nimbus-ds/components";

import {
  cardBackground,
  iconBackground,
  cardBorder,
  iconColor,
  textColor,
} from "./calloutCard.definitions";
import { CalloutCardProps } from "./calloutCard.types";

const CalloutCard: React.FC<CalloutCardProps> = ({
  appearance,
  title,
  subtitle,
  link,
  onClick,
  icon: Source,
  ...rest
}) => (
  <Box
    {...rest}
    display="flex"
    backgroundColor={cardBackground[appearance]}
    borderColor={cardBorder[appearance]}
    borderStyle="solid"
    borderWidth="1px"
    borderRadius=".5rem"
    cursor="pointer"
    flex="0 1 auto"
    gap="2"
    p="2"
  >
    <Box
      backgroundColor={iconBackground[appearance]}
      height="36px"
      width="36px"
      minHeight="36px"
      minWidth="36px"
      borderRadius="8px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Icon
        data-testid="callout-card-icon"
        color={iconColor[appearance]}
        source={<Source size="medium" />}
      />
    </Box>
    <Box display="flex" flex="1 1 auto" flexDirection="column">
      <Text
        data-testid="callout-card-title"
        color={textColor[appearance]}
        fontSize="caption"
        fontWeight="bold"
      >
        {title}
      </Text>
      <Text
        data-testid="callout-card-subtitle"
        color={textColor[appearance]}
        fontSize="caption"
      >
        {subtitle}
      </Text>
      {link && <Box mt="2">{link}</Box>}
    </Box>
    {!link && (
      <Icon
        data-testid="callout-card-open-icon"
        cursor="pointer"
        onClick={onClick}
        color={iconColor[appearance]}
        source={<ChevronRightIcon size="small" />}
      />
    )}
  </Box>
);

CalloutCard.displayName = "CalloutCard";

export { CalloutCard };
