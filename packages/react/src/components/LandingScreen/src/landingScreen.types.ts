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
   * Displays a bullet point with an icon and text, typically used to list app features with visual appeal.
   */
  Bullet: typeof LandingScreenBullet;
  /**
   * Displays a card with an icon, title, and children, generally used for descriptive purposes.
   */
  Card: typeof LandingScreenCard;
  /**
   * Displays multiple cards in a row or column, responsive to screen size.
   */
  CardLayout: typeof LandingScreenCardLayout;
  /**
   * Displays a feature with content and an image side by side.
   */
  Feature: typeof LandingScreenFeature;
  /**
   * Displays a feature with a title, description, and children, often used with the ItemSpacing component.
   */
  FeatureItem: typeof LandingScreenFeatureItem;
  /**
   * A line that separates items in the feature, maintaining a consistent layout.
   */
  FeatureItemSpacing: typeof LandingScreenFeatureItemSpacing;
  /**
   * Displays a hero with a title, subtitle, description, actions, bullets, and an image, typically for the main content of the landing screen.
   */
  Hero: typeof LandingScreenHero;
  /**
   * Displays a module with a title, description, and children, generally used for application modules or callout cards.
   */
  Module: typeof LandingScreenModule;
  /**
   * Displays a section with a title and children, used to separate content in the landing screen while maintaining a consistent layout.
   */
  Section: typeof LandingScreenSection;
}

export interface LandingScreenBaseProps {
  /**
   * Content of the LandingScreen component.
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
