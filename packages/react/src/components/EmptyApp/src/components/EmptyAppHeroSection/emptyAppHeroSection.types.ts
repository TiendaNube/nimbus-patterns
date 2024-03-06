import { ReactNode } from "react";
import { BoxProps, ThumbnailProps } from "@nimbus-ds/components";

export interface EmptyAppHeroSectionProperties
  extends Pick<ThumbnailProps, "src" | "alt"> {
  title: string;
  subtitle?: string;
  content: string;
  actions?: ReactNode;
}

export type EmptyAppHeroSectionProps = EmptyAppHeroSectionProperties &
  Omit<BoxProps, "backgroundImage" | "minHeight" | "pt">;
