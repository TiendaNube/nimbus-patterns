import { HTMLAttributes, ReactNode } from "react";
import { PopoverProps } from "@nimbus-ds/components";

export interface ProductUpdatesProperties {
  /** Title of the Popover */
  title: string;
  /** Content text of the Popover */
  text: string;
  /** Optional content for the body of the Popover */
  bodyContent?: ReactNode;
  /** Optional bottom link to dismiss the Popover. If unset, an IconButton with an X will appear on the superior right corner. */
  dismissLink?: ReactNode;
}

export type ProductUpdatesProps = ProductUpdatesProperties &
  Omit<PopoverProps, "content" | "appearance" | "padding" | "enabledDismiss"> &
  HTMLAttributes<HTMLElement>;
