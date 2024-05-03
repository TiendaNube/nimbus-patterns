import React from "react";

import { Box } from "@nimbus-ds/components";

import { EmptyAppComponents, EmptyAppProps } from "./emptyApp.types";

import {
  EmptyAppContentImageElement,
  EmptyAppContentSection,
  EmptyAppContentTextElement,
  EmptyAppHeroSection,
  EmptyAppPlanCard,
  EmptyAppPlanItem
} from "./components";

const EmptyApp: React.FC<EmptyAppProps> & EmptyAppComponents = ({
  children,
  ...rest
}: EmptyAppProps) => (
  <Box
    width="100%"
    display="flex"
    flexDirection="column"
    backgroundColor="neutral-background"
    pb="8"
    {...rest}
  >
    {children}
  </Box>
);

EmptyApp.ContentImageElement = EmptyAppContentImageElement;
EmptyApp.ContentSection = EmptyAppContentSection;
EmptyApp.ContentTextElement = EmptyAppContentTextElement;
EmptyApp.HeroSection = EmptyAppHeroSection;
EmptyApp.PlanCard = EmptyAppPlanCard;
EmptyApp.PlanItem = EmptyAppPlanItem;

EmptyApp.displayName = "EmptyApp";
EmptyApp.ContentImageElement.displayName = "EmptyApp.ContentImageElement";
EmptyApp.ContentSection.displayName = "EmptyApp.ContentSection";
EmptyApp.ContentTextElement.displayName = "EmptyApp.ContentTextElement";
EmptyApp.HeroSection.displayName = "EmptyApp.HeroSection";
EmptyApp.PlanCard.displayName = "EmptyApp.PlanCard";
EmptyApp.PlanItem.displayName = "EmptyApp.PlanItem";

export { EmptyApp };
