import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren } from "react";

type ModuleProps = {
  title: string;
  description: string;
};
export type InitialScreenModuleProps = PropsWithChildren<ModuleProps> &
  BoxProps;
