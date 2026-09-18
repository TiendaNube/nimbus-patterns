import { PropsWithChildren, ReactNode } from "react";

/**
 * Properties of the bullet used to display a single plan feature row.
 */
export interface PlanDisplayBulletProperties {
  /**
   * Icon rendered to the left of the bullet text.
   * @TJS-type React.ReactNode
   */
  icon: ReactNode;
  /**
   * Renders the bullet with the disabled treatment, to show a feature the plan does not include.
   */
  disabled?: boolean;
  /**
   * Optional slot rendered inline after the bullet text (e.g. a `<Tag>` like "Nuevo").
   * @TJS-type React.ReactNode
   */
  badge?: ReactNode;
}

export type PlanDisplayBulletProps =
  PropsWithChildren<PlanDisplayBulletProperties>;
