import { PropsWithChildren, ReactNode } from "react";
import type { BoxProps } from "@nimbus-ds/components";

export type ProductDataListSectionProperties = PropsWithChildren<{
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  link: ReactNode;
}>;

export type ProductDataListSectionProps = ProductDataListSectionProperties &
  Omit<BoxProps, "padding" | "display" | "flexDirection" | "gap" | "content">;
