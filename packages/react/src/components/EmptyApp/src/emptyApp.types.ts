import { ReactNode } from "react";

import { BoxProps } from "@nimbus-ds/components";

import {
  EmptyAppContentImageElement,
  EmptyAppContentSection,
  EmptyAppContentTextElement,
  EmptyAppHeroSection,
  EmptyAppPlanCard,
  EmptyAppPlanItem
} from "./components";

export interface EmptyAppComponents {
  ContentImageElement: typeof EmptyAppContentImageElement;
  ContentSection: typeof EmptyAppContentSection;
  ContentTextElement: typeof EmptyAppContentTextElement;
  HeroSection: typeof EmptyAppHeroSection;
  PlanCard: typeof EmptyAppPlanCard;
  PlanItem: typeof EmptyAppPlanItem;
}

export interface EmptyAppProperties {
  /**
   * Content of the EmptyApp
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type EmptyAppProps = EmptyAppProperties &
  Omit<
    BoxProps,
    | "width"
    | "display"
    | "flexDirection"
    | "backgroundColor"
    | "pb"
    | "children"
  >;
