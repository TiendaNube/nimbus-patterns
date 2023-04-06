import { HTMLAttributes, ReactNode } from "react";
import { BoxProps, ThumbnailProps } from "@nimbus-ds/components";

export interface ThumbnailWithActionProperties {
  /** Thumbnail component properties */
  thumbnail: ThumbnailProps;
  /** Element to be rendered inside the Thumbnail */
  children: ReactNode;
  /** Optional position of the element */
  contentPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export type ThumbnailWithActionProps = ThumbnailWithActionProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  BoxProps;
