import { ReactNode } from "react";
import { BoxProperties } from "@nimbus-ds/components";

export interface ProductUpdatesFooterProperties {
  /**
   * Optional link rendered on the left side of the footer.
   * @TJS-type React.ReactNode
   */
  leftLink?: ReactNode;
  /**
   * Optional paginator element rendered in the center of the footer.
   * @TJS-type React.ReactNode
   */
  paginator?: ReactNode;
  /**
   * Optional action button rendered on the right side of the footer.
   * @TJS-type React.ReactNode
   */
  rightButton?: ReactNode;

  /**
   * When true, renders a full-width divider above the footer content.
   * @default false
   */
  renderDivider?: boolean;
}

export type ProductUpdatesFooterProps = ProductUpdatesFooterProperties &
  Omit<BoxProperties, "pt" | "children">;
