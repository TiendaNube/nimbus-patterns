import React from "react";

import { BoxProps } from "@nimbus-ds/components";

import {
  LandingScreenBullet,
  LandingScreenCard,
  LandingScreenCardLayout,
  LandingScreenFeature,
  LandingScreenFeatureItem,
  LandingScreenFeatureItemSpacing,
  LandingScreenHero,
  LandingScreenModule,
  LandingScreenSection,
} from "./components";

export interface LandingScreenComponents {
  /**
   * Used to display a bullet point with an icon and a text, generally implemented when a list of app features is needed,
   * using icons to make it more visually appealing.
   */
  Bullet: typeof LandingScreenBullet;
  /**
   * Used to display a card with an icon, a title and children, generally used for
   * descriptive purposes.
   */
  Card: typeof LandingScreenCard;
  /**
   * Used to display multiple cards in a row or column, depending on the
   * screen size, as it is a responsive component.
   */
  CardLayout: typeof LandingScreenCardLayout;
  /**
   * Used to display a feature with content and an image, side by side.
   */
  Feature: typeof LandingScreenFeature;
  /**
   * Used to display a feature with a title, a description and the children, which
   * can be any component (though it is generally used along with the ItemSpacing component).
   */
  FeatureItem: typeof LandingScreenFeatureItem;
  /**
   * A line used to separate the items in the feature, maintaining a consistent layout.
   */
  FeatureItemSpacing: typeof LandingScreenFeatureItemSpacing;
  /**
   * Used to display a hero with a title, a subtitle, a description, actions, bullets
   * and an image. It is generally used for the main content of the landing screen.
   */
  Hero: typeof LandingScreenHero;
  /**
   * Used to display a module with a title and a description, and children component,
   * generally used for application modules or callout cards.
   */
  Module: typeof LandingScreenModule;
  /**
   * Used to display a section with a title and children, generally used for separating
   * content in the landing screen, maintaining a consistent layout.
   */
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
