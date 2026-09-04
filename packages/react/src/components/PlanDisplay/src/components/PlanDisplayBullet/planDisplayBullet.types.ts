import { PropsWithChildren, ReactNode } from "react";

/**
 * Flat shape of PlanDisplay.Bullet's props, kept as a plain interface (not the
 * discriminated union below) because the docs generator (@nimbus-ds/scripts)
 * looks up a schema by the literal name `PlanDisplayBulletProperties` and
 * can't introspect a union type. PlanDisplayBulletProps is what actually
 * types the component and enforces the `disabled`/`unavailableLabel`
 * constraint at compile time.
 */
export interface PlanDisplayBulletProperties {
  /**
   * Icon element to be rendered inside the bullet.
   * @TJS-type React.ReactNode
   */
  icon: ReactNode;
  /**
   * Badge rendered inline after the bullet's content.
   * @TJS-type React.ReactNode
   */
  badge?: ReactNode;
  /**
   * Marks the feature as unavailable, applying the disabled visual treatment.
   */
  disabled?: boolean;
  /**
   * Localized text describing why the feature is unavailable. Required
   * whenever `disabled` is `true`. Exposed only to assistive technology —
   * never visibly rendered — and has no default.
   */
  unavailableLabel?: string;
}

interface PlanDisplayBulletBaseProperties {
  icon: ReactNode;
  badge?: ReactNode;
}

export interface PlanDisplayBulletAvailableProperties
  extends PlanDisplayBulletBaseProperties {
  disabled?: false;
  unavailableLabel?: never;
}

export interface PlanDisplayBulletUnavailableProperties
  extends PlanDisplayBulletBaseProperties {
  disabled: true;
  unavailableLabel: string;
}

export type PlanDisplayBulletVariantProperties =
  | PlanDisplayBulletAvailableProperties
  | PlanDisplayBulletUnavailableProperties;

export type PlanDisplayBulletProps =
  PropsWithChildren<PlanDisplayBulletVariantProperties>;
