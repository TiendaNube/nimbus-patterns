import React from "react";

import { BoxProps } from "@nimbus-ds/components";

import {
  LandingScreenCard,
  LandingScreenHero,
  LandingScreenHeroBullet,
  LandingScreenList,
  LandingScreenSection,
} from "./components";

export interface LandingScreenComponents {
  Hero: typeof LandingScreenHero;
  Bullet: typeof LandingScreenHeroBullet;
  Section: typeof LandingScreenSection;
  Card: typeof LandingScreenCard;
  List: typeof LandingScreenList;
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
