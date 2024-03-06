import { HTMLAttributes } from "react";
import { ThumbnailProps } from "@nimbus-ds/components";

export type EmptyAppContentImageElementProps = Pick<
  ThumbnailProps,
  "src" | "alt"
> &
  Omit<HTMLAttributes<HTMLElement>, "color">;
