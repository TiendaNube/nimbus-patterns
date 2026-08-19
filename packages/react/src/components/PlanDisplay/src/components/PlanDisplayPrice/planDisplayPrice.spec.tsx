import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplayPrice } from "./PlanDisplayPrice";
import { PlanDisplayPriceProps } from "./planDisplayPrice.types";

const makeSut = (rest: PlanDisplayPriceProps) => {
  render(<PlanDisplayPrice {...rest} />);
};

// AC-03 — Pricing: `PlanDisplay.Price` displays the current price;
// `previousPrice`, `period`, and `annualNote` are each independently optional.
describe("GIVEN <PlanDisplayPrice />", () => {
  describe("WHEN rendered with only the required price", () => {
    it("SHOULD render the price and nothing else", () => {
      makeSut({ price: "$29" });

      expect(screen.getByText("$29")).toBeDefined();
    });
  });

  describe("AC-03: pricing", () => {
    it("SHOULD render all four fields when provided", () => {
      makeSut({
        price: "$29",
        previousPrice: "$39",
        period: "/month",
        annualNote: "Billed annually",
      });

      expect(screen.getByText("$29")).toBeDefined();
      expect(screen.getByText("$39")).toBeDefined();
      expect(screen.getByText("/month")).toBeDefined();
      expect(screen.getByText("Billed annually")).toBeDefined();
    });

    it("SHOULD render without previousPrice when absent", () => {
      makeSut({ price: "$29", period: "/month" });

      expect(screen.getByText("$29")).toBeDefined();
      expect(screen.getByText("/month")).toBeDefined();
      expect(screen.queryByText("$39")).toBeNull();
    });

    it("SHOULD render without period when absent", () => {
      makeSut({ price: "$29", previousPrice: "$39" });

      expect(screen.getByText("$29")).toBeDefined();
      expect(screen.getByText("$39")).toBeDefined();
      expect(screen.queryByText("/month")).toBeNull();
    });

    it("SHOULD render without annualNote when absent", () => {
      makeSut({ price: "$29" });

      expect(screen.queryByText("Billed annually")).toBeNull();
    });
  });

  // AC-09 — Accessible behavior: PlanDisplay.Price preserves a meaningful
  // reading order: current price, previous price, period, then annual note.
  describe("AC-09: accessible reading order", () => {
    it("SHOULD render price, previousPrice, period and annualNote in that DOM order", () => {
      const { container } = render(
        <PlanDisplayPrice
          price="$29"
          previousPrice="$39"
          period="/month"
          annualNote="Billed annually"
        />
      );

      const text = container.textContent ?? "";
      const priceIndex = text.indexOf("$29");
      const previousPriceIndex = text.indexOf("$39");
      const periodIndex = text.indexOf("/month");
      const annualNoteIndex = text.indexOf("Billed annually");

      expect(priceIndex).toBeGreaterThanOrEqual(0);
      expect(priceIndex).toBeLessThan(previousPriceIndex);
      expect(previousPriceIndex).toBeLessThan(periodIndex);
      expect(periodIndex).toBeLessThan(annualNoteIndex);
    });
  });
});
