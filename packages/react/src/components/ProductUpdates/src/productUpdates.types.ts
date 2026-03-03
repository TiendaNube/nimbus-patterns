import { HTMLAttributes, ReactNode } from "react";
import { BoxProperties, PopoverProperties } from "@nimbus-ds/components";

import { ProductUpdatesPaginator, ProductUpdatesFooter } from "./components";

export interface ProductUpdatesComponents {
  Paginator: typeof ProductUpdatesPaginator;
  Footer: typeof ProductUpdatesFooter;
}

export interface ProductUpdatesProperties
  extends Omit<
    PopoverProperties,
    "content" | "appearance" | "padding" | "enabledDismiss"
  > {
  /**
   * Title of the Popover.
   */
  title: string;
  /**
   * Content text of the Popover.
   */
  text: string;
  /**
   * Optional tag element rendered inline before the title.
   * @TJS-type React.ReactNode
   */
  tag?: ReactNode;
  /**
   * Optional content for the body of the Popover.
   * @TJS-type React.ReactNode
   */
  bodyContent?: ReactNode;

  /**
   * Optional properties for the content container of the popover body.
   */
  bodyContentProps?: Omit<BoxProperties, "children">;
  /**
   * Optional bottom link to dismiss the Popover. If unset, an IconButton with an X will appear on the superior right corner.
   * @TJS-type React.ReactNode
   */
  dismissLink?: ReactNode;
}

export type ProductUpdatesProps = ProductUpdatesProperties &
  HTMLAttributes<HTMLElement>;
