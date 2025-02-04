import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

export type LandingScreenCardProps = PropsWithChildren<{
  icon: ReactNode;
  title: string;
}>;

export type LandingScreenLayoutProps = PropsWithChildren &
  Omit<BoxProps, "display" | "flexDirection" | "gap">;
