import React from "react";

import { LandingScreenHero } from "./components";
import { Box } from "@nimbus-ds/components";
import LandingScreenheroBullet from "./components/LandingScreenHeroBullet";
import LandingScreenSection from "./components/LandingScreenSection";
import {
  LandingScreenComponents,
  LandingScreenProps,
} from "./landingScreen.types";

const LandingScreen: React.FC<LandingScreenProps> & LandingScreenComponents = ({
  children,
}) => {
  return <Box>{children}</Box>;
};

LandingScreen.Hero = LandingScreenHero;
LandingScreen.Bullet = LandingScreenheroBullet;
LandingScreen.Section = LandingScreenSection;

LandingScreen.displayName = "LandingScreen";
LandingScreen.Hero.displayName = "LandingScreen.LandingScreenHero";
LandingScreen.Bullet.displayName = "LandingScreen.LandingScreenheroBullet";
LandingScreen.Section.displayName = "LandingScreen.LandingScreenSection";

export { LandingScreen };
