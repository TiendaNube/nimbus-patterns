import { BoxProps } from "@nimbus-ds/components";
import { PropsWithChildren, ReactNode } from "react";

export interface PlanDisplayCardProperties {
  /**
   * Label rendered in the card's top ribbon, used to emphasize a plan (e.g. "Most popular").
   * Every card reserves the same top ribbon area whether or not it carries a `ribbonLabel`,
   * so comparable cards stay aligned.
   * @TJS-type React.ReactNode
   */
  ribbonLabel?: ReactNode;
  /**
   * Applies the fixed Plans 2.0 gradient treatment to the card. Ignored (fully suppressed)
   * whenever `ribbonLabel` is present.
   */
  gradient?: boolean;
}
// `...rest` lands only on the outer layout wrapper (height/flex column),
// never on the card's visual surface — the ribbon and border/shadow
// treatment described above own `boxShadow`, `border*`, `backgroundColor`,
// and `backgroundImage` internally. Omitting them here keeps those props
// from being type-valid while silently having no effect (or landing on the
// wrong element) for consumers.
export type PlanDisplayCardProps = PropsWithChildren<PlanDisplayCardProperties> &
  Omit<
    BoxProps,
    | "display"
    | "flexDirection"
    | "height"
    | "boxShadow"
    | "border"
    | "borderColor"
    | "borderStyle"
    | "borderWidth"
    | "borderTopWidth"
    | "borderBottomWidth"
    | "borderLeftWidth"
    | "borderRightWidth"
    | "borderWidthX"
    | "borderWidthY"
    | "borderRadius"
    | "backgroundColor"
    | "backgroundImage"
  >;
