import { ReactNode } from "react";

export type PlanDisplayCardPriceProperties = {
  /**
   * The current price of the plan (e.g. "$999"). Rendered as the main, prominent value.
   * @TJS-type React.ReactNode
   */
  price: ReactNode;
  /**
   * Optional previous price, rendered with a line-through next to the current price.
   * @TJS-type React.ReactNode
   */
  previousPrice?: ReactNode;
  /**
   * Optional billing period suffix (e.g. "/mes") rendered next to the price.
   * @TJS-type React.ReactNode
   */
  period?: ReactNode;
  /**
   * Optional annual note rendered below the price (e.g. "R$696/año. Economiza R$132.").
   * Accepts a ReactNode so it can mix colors (e.g. an emphasized savings span).
   * @TJS-type React.ReactNode
   */
  annualNote?: ReactNode;
};

export type PlanDisplayCardPriceProps = PlanDisplayCardPriceProperties;
