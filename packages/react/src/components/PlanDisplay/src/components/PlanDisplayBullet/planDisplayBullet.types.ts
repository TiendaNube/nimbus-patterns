import { PropsWithChildren, ReactNode } from "react";

export type PlanDisplayBulletProperties = {
  icon: ReactNode;
  disabled?: boolean;
  /**
   * Optional slot rendered inline after the bullet text (e.g. a `<Tag>` like "Nuevo").
   * @TJS-type React.ReactNode
   */
  badge?: ReactNode;
};
export type PlanDisplayBulletProps =
  PropsWithChildren<PlanDisplayBulletProperties>;
