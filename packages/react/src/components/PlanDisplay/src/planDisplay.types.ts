import { ReactNode } from "react";

import { BoxProps } from "@nimbus-ds/components";
import {
  PlanDisplayBullet,
  PlanDisplayCard,
  PlanDisplayCardContent,
  PlanDisplayCardFooter,
  PlanDisplayCardHeader,
  PlanDisplayCardSpacing,
} from "./components";

export interface PlanDisplayComponents {
  Card: typeof PlanDisplayCard;
  Header: typeof PlanDisplayCardHeader;
  Content: typeof PlanDisplayCardContent;
  Spacing: typeof PlanDisplayCardSpacing;
  Bullet: typeof PlanDisplayBullet;
  Footer: typeof PlanDisplayCardFooter;
}

export interface PlanDisplayProperties {
  /**
   * Content of the PlanDisplay
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type PlanDisplayProps = PlanDisplayProperties &
  Omit<
    BoxProps,
    | "width"
    | "display"
    | "flexDirection"
    | "backgroundColor"
    | "pb"
    | "children"
  >;
