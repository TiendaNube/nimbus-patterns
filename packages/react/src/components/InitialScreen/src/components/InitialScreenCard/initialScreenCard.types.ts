import { BoxProps } from "@nimbus-ds/components";
import { ReactNode } from "react";

export type InitialScreenCardProperties = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type InitialScreenCardProps = InitialScreenCardProperties &
  Omit<BoxProps, "p" | "borderRadius" | "boxShadow">;

export type InitialScreenCardLayoutProperties = {
  /**
   * The content of the InitialScreenCardLayout component
   */
  children: ReactNode;
};

export type InitialScreenCardLayoutProps = InitialScreenCardLayoutProperties &
  Omit<BoxProps, "display" | "flexDirection" | "gap">;
