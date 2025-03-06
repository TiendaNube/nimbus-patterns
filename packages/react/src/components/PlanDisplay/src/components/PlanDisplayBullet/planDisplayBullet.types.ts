import { PropsWithChildren, ReactNode } from "react";

export type PlanDisplayBulletProperties = {
  icon: ReactNode;
  disabled?: boolean;
};
export type PlanDisplayBulletProps =
  PropsWithChildren<PlanDisplayBulletProperties>;
