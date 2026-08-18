import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

// Fixed Plans 2.0 gradient (decision 11): consumers select it with the
// boolean `gradient` prop, they cannot supply their own gradient value.
const gradientBackground =
  "linear-gradient(194.55deg, var(--nimbus-colors-primary-surface) 4.18%, var(--nimbus-colors-neutral-background) 45.97%)";

const PlanDisplayCard: React.FC<PlanDisplayCardProps> = ({
  ribbonLabel,
  gradient,
  children,
  ...rest
}) => {
  // ribbonLabel takes precedence: when present, the gradient is fully suppressed.
  const showGradient = Boolean(gradient) && !ribbonLabel;

  return (
    <Box display="flex" flexDirection="column" height="100%" {...rest}>
      {/*
        Every card reserves the same top ribbon area, including cards without
        a ribbonLabel, so comparable cards in a comparison stay aligned.
      */}
      <Box pt="0-5" pb="2">
        {ribbonLabel && (
          <Text
            as="span"
            fontWeight="bold"
            fontSize="caption"
            color="primary-interactive"
          >
            {ribbonLabel}
          </Text>
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        padding="4"
        borderRadius="2"
        boxShadow="2"
        backgroundColor={showGradient ? undefined : "neutral-background"}
        backgroundImage={showGradient ? gradientBackground : undefined}
      >
        {children}
      </Box>
    </Box>
  );
};

export { PlanDisplayCard };
