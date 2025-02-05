import React from "react";

import { Box } from "@nimbus-ds/components";
import * as Components from "./components";

import {
  LandingScreenComponents,
  LandingScreenProps,
} from "./landingScreen.types";

/**
 * LandingScreen component. It is used to display a landing or welcome screen, with a consistent layout and spacing, to present the user
 * with information about an application or a service, providing the ability to access it or learn more about it.
 */
const LandingScreen: React.FC<LandingScreenProps> & LandingScreenComponents = ({
  children,
  ...rest
}: LandingScreenProps) => (
  <Box
    width="100%"
    paddingTop={{ xs: "4", md: "20" }}
    px={{ xs: "8", md: "8" }}
    maxWidth="1200px"
    {...rest}
  >
    {children}
  </Box>
);

LandingScreen.Bullet = Components.LandingScreenBullet;
LandingScreen.Card = Components.LandingScreenCard;
LandingScreen.CardLayout = Components.LandingScreenCardLayout;
LandingScreen.Feature = Components.LandingScreenFeature;
LandingScreen.FeatureItem = Components.LandingScreenFeatureItem;
LandingScreen.FeatureItemSpacing = Components.LandingScreenFeatureItemSpacing;
LandingScreen.Hero = Components.LandingScreenHero;
LandingScreen.Module = Components.LandingScreenModule;
LandingScreen.Section = Components.LandingScreenSection;

LandingScreen.displayName = "LandingScreen";
LandingScreen.Bullet.displayName = "LandingScreen.LandingScreenBullet";
LandingScreen.Card.displayName = "LandingScreen.Card";
LandingScreen.CardLayout.displayName = "LandingScreen.CardLayout";
LandingScreen.Feature.displayName = "LandingScreen.Feature";
LandingScreen.FeatureItem.displayName = "LandingScreen.FeatureItem";
LandingScreen.FeatureItemSpacing.displayName =
  "LandingScreen.FeatureItemSpacing";
LandingScreen.Hero.displayName = "LandingScreen.Hero";
LandingScreen.Module.displayName = "LandingScreen.Module";
LandingScreen.Section.displayName = "LandingScreen.Section";

export { LandingScreen };
