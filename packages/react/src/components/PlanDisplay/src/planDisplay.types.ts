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

/**
 * Interface representing the internal components used in the PlanDisplay.
 */
export interface PlanDisplayComponents {
  /**
   * The card component used to display the plan. This component is used to wrap the header, content, and footer components, and it is able
   * to receive a 'highlighted' prop to feature a plan.
   */
  Card: typeof PlanDisplayCard;

  /**
   * The header component of the plan display card. This component is used to display the title and subtitle of the plan, along with
   * an optional children where additional information can be displayed.
   */
  Header: typeof PlanDisplayCardHeader;

  /**
   * The content component of the plan display card. This component is used to display the main content of the plan, such as the plan bullet points.
   */
  Content: typeof PlanDisplayCardContent;

  /**
   * The spacing component used within the plan display card. This component is used to add spacing between the header, content, and footer components, displaying a line divider between them.
   */
  Spacing: typeof PlanDisplayCardSpacing;

  /**
   * The bullet component used to display the plan bullet points. It displays an icon and a text, and can receive a 'disabled' prop to show the bullet point as disabled.
   */
  Bullet: typeof PlanDisplayBullet;

  /**
   * The footer component of the plan display card. This component is used to display the footer of the plan, such as the CTA button.
   */
  Footer: typeof PlanDisplayCardFooter;
}

export interface PlanDisplayProperties {
  minPlanWidth?: string;
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
