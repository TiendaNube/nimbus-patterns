import { BoxProps } from "@nimbus-ds/components";
import { LayoutProps } from "@nimbus-ds/layout";
import { PropsWithChildren, ReactNode } from "react";

export type InitialScreenFeatureItemProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

type FeatureProps = {
  content: ReactNode;
  image: ReactNode;
};
export type InitialScreenFeatureProps = FeatureProps &
  Omit<LayoutProps, "columns" | "gap" | "justifyContent" | "children">;

export type InitialScreenFeatureItemSpacingProps = Omit<
  BoxProps,
  "borderTopWidth" | "borderBottomWidth" | "borderColor" | "borderStyle"
>;
