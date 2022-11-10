import React from "react";
import { ChevronRightIcon } from "@tiendanube/icons";
import { Card } from "@nimbus-ds/card";
import { Box } from "@nimbus-ds/box";
import { Stack } from "@nimbus-ds/stack";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";
import { Link } from "@nimbus-ds/link";

import {
  cardBackground,
  iconBackground,
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
  <Card backgroundColor={cardBackground[appearance]} {...rest}>
    <Stack display="flex" justifyContent="space-between" gap="1,5">
      <Stack display="flex" gap="1,5">
        <Box
          backgroundColor={iconBackground[appearance]}
          height="36px"
          width="36px"
          borderRadius="8px"
        >
          <Stack
            display="flex"
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              data-testid="callout-card-icon"
              color={iconColor[appearance]}
              source={<Source size="medium" />}
            />
          </Stack>
        </Box>
        <Stack display="flex" flexDirection="column">
          <Text
            data-testid="callout-card-title"
            color={textColor[appearance]}
            fontSize="caption"
            lineHeight="base"
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
          {link && (
            <Box mt="2">
              <Link {...link} appearance="primary" />
            </Box>
          )}
        </Stack>
      </Stack>
      {!link && (
        <Icon
          data-testid="callout-card-open-icon"
          cursor="pointer"
          onClick={onClick}
          color={iconColor[appearance]}
          source={<ChevronRightIcon size="small" />}
        />
      )}
    </Stack>
  </Card>
);

CalloutCard.displayName = "CalloutCard";

export { CalloutCard };
