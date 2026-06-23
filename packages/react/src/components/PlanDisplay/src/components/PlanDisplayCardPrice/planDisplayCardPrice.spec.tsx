import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplayCardPrice } from "./PlanDisplayCardPrice";
import { PlanDisplayCardPriceProps } from "./planDisplayCardPrice.types";

const makeSut = (rest: PlanDisplayCardPriceProps) => {
  render(<PlanDisplayCardPrice {...rest} />);
};

describe("GIVEN <PlanDisplayCardPrice />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the price correctly", () => {
      makeSut({ price: "$999" });

      expect(screen.getByText("$999")).toBeDefined();
    });

    it("SHOULD render previousPrice, period and annualNote when provided", () => {
      makeSut({
        price: "$24.999",
        previousPrice: "$29.999",
        period: "/mes",
        annualNote: "$269.990/año",
      });

      expect(screen.getByText("$24.999")).toBeDefined();
      expect(screen.getByText("$29.999")).toBeDefined();
      expect(screen.getByText("/mes")).toBeDefined();
      expect(screen.getByText("$269.990/año")).toBeDefined();
    });
  });
});
