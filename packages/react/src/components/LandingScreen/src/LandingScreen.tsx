import React from "react";

import { Box } from "@nimbus-ds/components";
import { LandingScreenHero } from "./components";
import LandingScreenheroBullet from "./components/LandingScreenHeroBullet";
import LandingScreenSection from "./components/LandingScreenSection";
import {
  LandingScreenComponents,
  LandingScreenProps,
} from "./landingScreen.types";
import LandingScreenCard from "./components/LandingScreenCard";
import LandingScreenList from "./components/LandingScreenList";

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
LandingScreen.Bullet = LandingScreenheroBullet;
LandingScreen.Section = LandingScreenSection;
LandingScreen.Card = LandingScreenCard;
LandingScreen.List = LandingScreenList;

LandingScreen.displayName = "LandingScreen";
LandingScreen.Hero.displayName = "LandingScreen.LandingScreenHero";
LandingScreen.Bullet.displayName = "LandingScreen.LandingScreenheroBullet";
LandingScreen.Section.displayName = "LandingScreen.LandingScreenSection";

export { LandingScreen };
