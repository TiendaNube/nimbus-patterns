import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren } from "react";

export type InitialScreenModuleProperties = {
  title: string;
  description: string;
};
export type InitialScreenModuleProps =
  PropsWithChildren<InitialScreenModuleProperties> & BoxProps;
