import { ReactNode, PropsWithChildren } from "react";
import { BoxProps } from "@nimbus-ds/components";

export type InitialScreenHeroProperties = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  image: ReactNode;
  // Description can have complex content to accept bold, italic, translations and other text styles embedded
  description?: ReactNode;
  bullets?: ReactNode;
};

export type InitialScreenHeroProps =
  PropsWithChildren<InitialScreenHeroProperties> &
    Omit<BoxProps, "alignItems" | "mx">;
