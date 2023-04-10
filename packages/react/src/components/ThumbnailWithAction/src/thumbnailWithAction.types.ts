import { HTMLAttributes, ReactNode } from "react";
import { BoxProperties, ThumbnailProperties } from "@nimbus-ds/components";

export interface ThumbnailWithActionProperties extends BoxProperties {
  /**
   * Thumbnail component properties.
   */
  thumbnail: ThumbnailProperties;
  /**
   * Element to be rendered inside the Thumbnail.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Optional position of the element.
   */
  contentPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export type ThumbnailWithActionProps = ThumbnailWithActionProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
