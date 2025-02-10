import React from "react";

import { BoxProps } from "@nimbus-ds/components";

import {
  InitialScreenBullet,
  InitialScreenCard,
  InitialScreenCardLayout,
  InitialScreenFeature,
  InitialScreenFeatureItem,
  InitialScreenFeatureItemSpacing,
  InitialScreenHero,
  InitialScreenModule,
  InitialScreenSection,
} from "./components";

export interface InitialScreenComponents {
  /**
   * Displays a bullet point with an icon and text, typically used to list app features with visual appeal.
   */
  Bullet: typeof InitialScreenBullet;
  /**
   * Displays a card with an icon, title, and children, generally used for descriptive purposes.
   */
  Card: typeof InitialScreenCard;
  /**
   * Displays multiple cards in a row or column, responsive to screen size.
   */
  CardLayout: typeof InitialScreenCardLayout;
  /**
   * Displays a feature with content and an image side by side.
   */
  Feature: typeof InitialScreenFeature;
  /**
   * Displays a feature with a title, description, and children, often used with the ItemSpacing component.
   */
  FeatureItem: typeof InitialScreenFeatureItem;
  /**
   * A line that separates items in the feature, maintaining a consistent layout.
   */
  FeatureItemSpacing: typeof InitialScreenFeatureItemSpacing;
  /**
   * Displays a hero with a title, subtitle, description, actions, bullets, and an image, typically for the main content of the initial screen.
   */
  Hero: typeof InitialScreenHero;
  /**
   * Displays a module with a title, description, and children, generally used for application modules or callout cards.
   */
  Module: typeof InitialScreenModule;
  /**
   * Displays a section with a title and children, used to separate content in the initial screen while maintaining a consistent layout.
   */
  Section: typeof InitialScreenSection;
}

export interface InitialScreenBaseProps {
  /**
   * Content of the InitialScreen component.
   * @TJS-type React.ReactNode
   */
  children: React.ReactNode;
}

export type InitialScreenProps = InitialScreenBaseProps &
  Omit<
    BoxProps,
    | "width"
    | "display"
    | "flexDirection"
    | "backgroundColor"
    | "pb"
    | "children"
  >;
