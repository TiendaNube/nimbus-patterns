import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

export type InitialScreenCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type InitialScreenCardLayoutProps = PropsWithChildren &
  Omit<BoxProps, "display" | "flexDirection" | "gap">;
