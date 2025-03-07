import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

export type InitialScreenBulletProperties = {
  icon: ReactNode;
  text: string;
};

export type InitialScreenBulletProps = PropsWithChildren<
  InitialScreenBulletProperties & Omit<BoxProps, "display" | "gap">
>;
