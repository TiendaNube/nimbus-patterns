import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

export type BulletProps = {
  icon: ReactNode;
  text: string;
};

export type InitialScreenBulletProps = PropsWithChildren<
  BulletProps & Omit<BoxProps, "display" | "gap">
>;
