import React from "react";

import { BoxProps } from "@nimbus-ds/components";

import {
  LandingScreenCard,
  LandingScreenHero,
  LandingScreenBullet,
  LandingScreenFeature,
  LandingScreenSection,
  LandingScreenFeatureItem,
  LandingScreenFeatureImage,
  LandingScreenFeatureItemSpacing,
} from "./components";

export interface LandingScreenComponents {
  Hero: typeof LandingScreenHero;
  Bullet: typeof LandingScreenBullet;
  Section: typeof LandingScreenSection;
  Card: typeof LandingScreenCard;
  Feature: typeof LandingScreenFeature;
  FeatureItem: typeof LandingScreenFeatureItem;
  FeatureImage: typeof LandingScreenFeatureImage;
  FeatureItemSpacing: typeof LandingScreenFeatureItemSpacing;
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
