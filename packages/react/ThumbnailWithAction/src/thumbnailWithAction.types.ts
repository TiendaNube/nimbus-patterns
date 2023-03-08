import { HTMLAttributes, ReactNode } from "react";

import { BoxProps, ThumbnailProps } from "@nimbus-ds/components";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> & BoxProps;

export interface ThumbnailWithActionProps extends Extend {
  thumbnail: ThumbnailProps;
  children: ReactNode;
  contentPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
