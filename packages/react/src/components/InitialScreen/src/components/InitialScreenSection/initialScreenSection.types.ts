import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
};

export type InitialScreenSectionProps = PropsWithChildren<Props> &
  Omit<
    BoxProps,
    "display" | "flexDirection" | "paddingTop" | "gap" | "maxWidth" | "mx"
  >;
