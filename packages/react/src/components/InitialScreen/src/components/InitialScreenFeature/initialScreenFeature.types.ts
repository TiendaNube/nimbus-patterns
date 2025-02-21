import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

export type InitialScreenFeatureItemProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export type InitialScreenFeatureProps = {
  content: ReactNode;
  image: ReactNode;
};

export type InitialScreenFeatureItemSpacingProps = Omit<
  BoxProps,
  "borderTopWidth" | "borderBottomWidth" | "borderColor" | "borderStyle"
>;
