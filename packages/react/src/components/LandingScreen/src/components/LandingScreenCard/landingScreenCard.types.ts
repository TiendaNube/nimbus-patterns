import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

export type LandingScreenCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type LandingScreenCardLayoutProps = PropsWithChildren &
  Omit<BoxProps, "display" | "flexDirection" | "gap">;
