import { HTMLAttributes, ReactNode } from "react";

import { PopoverProps } from "@nimbus-ds/components";

type Extend = Omit<
  PopoverProps,
  "content" | "appearance" | "padding" | "enabledDismiss"
> &
  HTMLAttributes<HTMLElement>;

export interface ProductUpdatesProps extends Extend {
  title: string;
  text: string;
  bodyContent?: ReactNode;
  dismissLink?: ReactNode;
}
