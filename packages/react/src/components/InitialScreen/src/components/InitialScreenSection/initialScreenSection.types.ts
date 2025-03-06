import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren } from "react";

export type InitialScreenSectionProperties = {
  title: string;
};

export type InitialScreenSectionProps =
  PropsWithChildren<InitialScreenSectionProperties> &
    Omit<
      BoxProps,
      "display" | "flexDirection" | "paddingTop" | "gap" | "maxWidth" | "mx"
    >;
