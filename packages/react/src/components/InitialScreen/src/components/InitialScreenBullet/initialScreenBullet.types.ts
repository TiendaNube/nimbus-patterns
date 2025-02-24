import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

type InitialScreenBullet = {
  icon: ReactNode;
  text: string;
};

export type InitialScreenBulletProps = PropsWithChildren<
  InitialScreenBullet & Omit<BoxProps, "display" | "gap">
>;
