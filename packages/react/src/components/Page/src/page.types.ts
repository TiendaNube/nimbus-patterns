import { HTMLAttributes, PropsWithChildren } from "react";

import { BoxProperties, BoxProps } from "@nimbus-ds/components";
import { PageHeader, PageBody } from "./components";

export interface PageComponents {
  Header: typeof PageHeader;
  Body: typeof PageBody;
}

// Type defined for documentation purposes
export type PageProperties = PropsWithChildren<{
  maxWidth?: string;
}>;

export type PageProps = PageProperties &
  Omit<HTMLAttributes<HTMLElement>, "color"> &
  Omit<BoxProps, "width" | "maxWidth" | "marginX"> &
  Omit<BoxProperties, "width" | "maxWidth" | "marginX">;
