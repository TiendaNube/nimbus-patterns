import React from "react";

import { Box } from "@nimbus-ds/components";

import { PlanDisplayComponents, PlanDisplayProps } from "./planDisplay.types";

import {
  PlanDisplayBullet,
  PlanDisplayCard,
  PlanDisplayCardContent,
  PlanDisplayCardFooter,
  PlanDisplayCardHeader,
  PlanDisplayCardSpacing,
} from "./components";

const PlanDisplay: React.FC<PlanDisplayProps> & PlanDisplayComponents = ({
  minPlanWidth = "225px",
  children,
  ...rest
}: PlanDisplayProps) => (
  <Box
    display="grid"
    gridTemplateColumns={`repeat(auto-fit, minmax(${minPlanWidth}, 1fr))`}
    gap="6"
    justifyContent="center"
    alignItems="flex-start"
    mx="18"
    {...rest}
  >
    {children}
  </Box>
);

PlanDisplay.Card = PlanDisplayCard;
PlanDisplay.Header = PlanDisplayCardHeader;
PlanDisplay.Content = PlanDisplayCardContent;
PlanDisplay.Spacing = PlanDisplayCardSpacing;
PlanDisplay.Bullet = PlanDisplayBullet;
PlanDisplay.Footer = PlanDisplayCardFooter;

PlanDisplay.displayName = "PlanDisplay";
PlanDisplay.Card.displayName = "PlanDisplay.PlanDisplayCard";
PlanDisplay.Bullet.displayName = "PlanDisplay.PlanDisplayBullet";
PlanDisplay.Header.displayName = "PlanDisplay.PlanDisplayCardHeader";
PlanDisplay.Content.displayName = "PlanDisplay.PlanDisplayCardContent";
PlanDisplay.Spacing.displayName = "PlanDisplay.PlanDisplayCardSpacing";

export { PlanDisplay };
