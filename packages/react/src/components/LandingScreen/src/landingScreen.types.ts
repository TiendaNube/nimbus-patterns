import React from "react";

import { BoxProps } from "@nimbus-ds/components";

import { LandingScreenHero } from "./components";
import LandingScreenheroBullet from "./components/LandingScreenHeroBullet";
import LandingScreenSection from "./components/LandingScreenSection";

export interface LandingScreenComponents {
  Hero: typeof LandingScreenHero;
  Bullet: typeof LandingScreenheroBullet;
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
