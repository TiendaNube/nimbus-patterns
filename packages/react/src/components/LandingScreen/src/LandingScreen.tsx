import React from "react";

import { Box } from "@nimbus-ds/components";
import {
  LandingScreenBullet,
  LandingScreenCard,
  LandingScreenHero,
  LandingScreenFeature,
  LandingScreenSection,
  LandingScreenFeatureItem,
  LandingScreenFeatureImage,
  LandingScreenFeatureItemSpacing,
} from "./components";
import {
  LandingScreenComponents,
  LandingScreenProps,
} from "./landingScreen.types";

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

LandingScreen.Hero = LandingScreenHero;
LandingScreen.Bullet = LandingScreenBullet;
LandingScreen.Section = LandingScreenSection;
LandingScreen.Card = LandingScreenCard;
LandingScreen.Feature = LandingScreenFeature;
LandingScreen.FeatureItem = LandingScreenFeatureItem;
LandingScreen.FeatureImage = LandingScreenFeatureImage;
LandingScreen.FeatureItemSpacing = LandingScreenFeatureItemSpacing;

LandingScreen.displayName = "LandingScreen";
LandingScreen.Hero.displayName = "LandingScreen.LandingScreenHero";
LandingScreen.Bullet.displayName = "LandingScreen.LandingScreenBullet";
LandingScreen.Section.displayName = "LandingScreen.LandingScreenSection";

export { LandingScreen };
