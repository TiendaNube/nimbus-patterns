import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

type CardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type InitialScreenCardProps = CardProps &
  Omit<BoxProps, "p" | "borderRadius" | "boxShadow">;

export type InitialScreenCardLayoutProps = PropsWithChildren &
  Omit<BoxProps, "display" | "flexDirection" | "gap">;
