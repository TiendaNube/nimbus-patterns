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
  PlanDisplayPrice,
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
    // Cards stretch to match the tallest card in their row, so comparable
    // content and bottom-anchored footers stay aligned across a comparison.
    alignItems="stretch"
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
PlanDisplay.Price = PlanDisplayPrice;

PlanDisplay.displayName = "PlanDisplay";
PlanDisplay.Card.displayName = "PlanDisplay.Card";
PlanDisplay.Bullet.displayName = "PlanDisplay.Bullet";
PlanDisplay.Header.displayName = "PlanDisplay.CardHeader";
PlanDisplay.Content.displayName = "PlanDisplay.CardContent";
PlanDisplay.Spacing.displayName = "PlanDisplay.CardSpacing";
PlanDisplay.Price.displayName = "PlanDisplay.Price";

export { PlanDisplay };
