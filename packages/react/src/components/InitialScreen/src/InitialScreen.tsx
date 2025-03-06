import React from "react";

import { Box } from "@nimbus-ds/components";
import * as Components from "./components";

import {
  InitialScreenComponents,
  InitialScreenProps,
} from "./initialScreen.types";

/**
 * This component provides a consistent layout and spacing for displaying a landing or welcome screen. It introduces users to an application or service, offering options to access more information or proceed further.
 */
const InitialScreen: React.FC<InitialScreenProps> & InitialScreenComponents = ({
  children,
  ...rest
}: InitialScreenProps) => (
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

InitialScreen.Bullet = Components.InitialScreenBullet;
InitialScreen.Card = Components.InitialScreenCard;
InitialScreen.CardLayout = Components.InitialScreenCardLayout;
InitialScreen.Feature = Components.InitialScreenFeature;
InitialScreen.FeatureItem = Components.InitialScreenFeatureItem;
InitialScreen.FeatureItemSpacing = Components.InitialScreenFeatureItemSpacing;
InitialScreen.Hero = Components.InitialScreenHero;
InitialScreen.Module = Components.InitialScreenModule;
InitialScreen.Section = Components.InitialScreenSection;

InitialScreen.displayName = "InitialScreen";
InitialScreen.Bullet.displayName = "InitialScreen.Bullet";
InitialScreen.Card.displayName = "InitialScreen.Card";
InitialScreen.CardLayout.displayName = "InitialScreen.CardLayout";
InitialScreen.Feature.displayName = "InitialScreen.Feature";
InitialScreen.FeatureItem.displayName = "InitialScreen.FeatureItem";
InitialScreen.FeatureItemSpacing.displayName =
  "InitialScreen.FeatureItemSpacing";
InitialScreen.Hero.displayName = "InitialScreen.Hero";
InitialScreen.Module.displayName = "InitialScreen.Module";
InitialScreen.Section.displayName = "InitialScreen.Section";

export { InitialScreen };
