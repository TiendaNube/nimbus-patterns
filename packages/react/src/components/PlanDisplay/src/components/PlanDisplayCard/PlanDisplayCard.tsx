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
  const hasRibbon = Boolean(ribbonLabel);

  // ribbonLabel takes precedence: when present, the gradient is fully
  // suppressed — not layered underneath the ribbon (validation amendment,
  // AC-02).
  const showGradient = Boolean(gradient) && !hasRibbon;

  return (
    <Box display="flex" flexDirection="column" height="100%" {...rest}>
      {/*
        Ribbon and card surface share this single rounded, clipped, bordered
        wrapper so they read as one continuous shape with no visible seam
        (validation amendment — ribbon visual contract). The 2px
        primary-interactive border and the level-2 shadow are mutually
        exclusive: the border takes over as the emphasis cue whenever a
        ribbon is present, and the default shadow is suppressed.
      */}
      <Box
        data-testid="plan-display-card-surface"
        display="flex"
        flexDirection="column"
        flex="1"
        borderRadius="2"
        overflow="hidden"
        boxShadow={hasRibbon ? undefined : "2"}
        borderWidth={hasRibbon ? "2" : undefined}
        borderStyle={hasRibbon ? "solid" : undefined}
        borderColor={hasRibbon ? "primary-interactive" : undefined}
      >
        {/*
          Every card reserves this same full-width ribbon area, including
          cards without a ribbonLabel, so comparable cards in a comparison
          stay aligned (AC-07). When there is no ribbonLabel the area carries
          no background and no border — it is invisible, but occupies the
          same height as a rendered ribbon via the placeholder text below.
        */}
        <Box
          data-testid="plan-display-card-ribbon"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          py="1"
          backgroundColor={hasRibbon ? "primary-interactive" : undefined}
        >
          <Text
            as="span"
            fontWeight="bold"
            fontSize="caption"
            textAlign="center"
            color="neutral-background"
            aria-hidden={hasRibbon ? undefined : true}
            style={hasRibbon ? undefined : { visibility: "hidden" }}
          >
            {ribbonLabel ?? " "}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flex="1"
          padding="4"
          backgroundColor={showGradient ? undefined : "neutral-background"}
          backgroundImage={showGradient ? gradientBackground : undefined}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export { PlanDisplayCard };
