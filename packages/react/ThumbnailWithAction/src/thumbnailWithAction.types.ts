import { HTMLAttributes, ReactNode } from "react";

import { BoxProps, ThumbnailProps } from "@nimbus-ds/components";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> & BoxProps;

export interface ThumbnailWithActionProps extends Extend {
  /** Thumbnail component properties */
  thumbnail: ThumbnailProps;
  /** Element to be rendered inside the Thumbnail */
  children: ReactNode;
  /** Optional position of the element */
  contentPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
