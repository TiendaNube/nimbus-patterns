import { HTMLAttributes } from "react";
import { ThumbnailProps } from "@nimbus-ds/components";

export type EmptyAppContentImageElementProperties = Pick<
  ThumbnailProps,
  "src" | "alt"
>;

export type EmptyAppContentImageElementProps =
  EmptyAppContentImageElementProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
