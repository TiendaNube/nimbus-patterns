import { PropsWithChildren, ReactNode } from "react";

type PlanDisplayBullet = {
  icon: ReactNode;
  disabled?: boolean;
};
export type PlanDisplayBulletProps = PropsWithChildren<PlanDisplayBullet>;
