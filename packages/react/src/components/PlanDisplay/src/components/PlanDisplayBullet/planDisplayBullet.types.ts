import { PropsWithChildren, ReactNode } from "react";

type BulletProps = {
  icon: ReactNode;
  disabled?: boolean;
};
export type PlanDisplayBulletProps = PropsWithChildren<BulletProps>;
