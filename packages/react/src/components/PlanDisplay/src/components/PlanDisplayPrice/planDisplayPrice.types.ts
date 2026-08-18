import { ReactNode } from "react";

export interface PlanDisplayPriceProperties {
  /**
   * Current price of the plan. Formatting, currency, and localization are
   * consumer-owned — the component provides presentation only.
   * @TJS-type React.ReactNode
   */
  price: ReactNode;
  /**
   * Previous price shown alongside the current price (e.g. to convey a discount).
   * @TJS-type React.ReactNode
   */
  previousPrice?: ReactNode;
  /**
   * Billing period or cadence for the price (e.g. "/month").
   * @TJS-type React.ReactNode
   */
  period?: ReactNode;
  /**
   * Additional note about the price, such as an annual billing clarification.
   * @TJS-type React.ReactNode
   */
  annualNote?: ReactNode;
}

export type PlanDisplayPriceProps = PlanDisplayPriceProperties;
