import React from "react";

import { BoxProps } from "@nimbus-ds/components";

import {
  LandingScreenBullet,
  LandingScreenCard,
  LandingScreenCardLayout,
  LandingScreenFeature,
  LandingScreenFeatureImage,
  LandingScreenFeatureItem,
  LandingScreenFeatureItemSpacing,
  LandingScreenHero,
  LandingScreenModule,
  LandingScreenSection,
} from "./components";

export interface LandingScreenComponents {
  Bullet: typeof LandingScreenBullet;
  Card: typeof LandingScreenCard;
  CardLayout: typeof LandingScreenCardLayout;
  Feature: typeof LandingScreenFeature;
  FeatureImage: typeof LandingScreenFeatureImage;
  FeatureItem: typeof LandingScreenFeatureItem;
  FeatureItemSpacing: typeof LandingScreenFeatureItemSpacing;
  Hero: typeof LandingScreenHero;
  Module: typeof LandingScreenModule;
  Section: typeof LandingScreenSection;
}

export interface LandingScreenBaseProps {
  /**
   * Content of the EmptyApp
   * @TJS-type React.ReactNode
   */
  children: React.ReactNode;
}

export type LandingScreenProps = LandingScreenBaseProps &
  Omit<
    BoxProps,
    | "width"
    | "display"
    | "flexDirection"
    | "backgroundColor"
    | "pb"
    | "children"
  >;
