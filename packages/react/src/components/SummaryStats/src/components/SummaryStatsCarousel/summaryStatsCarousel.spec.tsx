import React from "react";
import { render, screen } from "@testing-library/react";

import { SummaryStatsCarousel } from "./SummaryStatsCarousel";
import { SummaryStatsStat } from "../SummaryStatsStat";

describe("GIVEN <SummaryStatsCarousel />", () => {
  describe("WHEN rendered with stat children", () => {
    it("THEN should render the carousel container", () => {
      render(
        <SummaryStatsCarousel data-testid="carousel-element">
          <SummaryStatsStat value="$1,000" description="Sales" />
          <SummaryStatsStat value="150" description="Orders" />
          <SummaryStatsStat value="89" description="Customers" />
        </SummaryStatsCarousel>
      );
      expect(screen.getByTestId("carousel-element")).toBeDefined();
    });
  });

  describe("WHEN rendered with more than 3 items", () => {
    it("THEN should render all items", () => {
      render(
        <SummaryStatsCarousel data-testid="carousel-element">
          <SummaryStatsStat value="$1,000" description="Sales" />
          <SummaryStatsStat value="150" description="Orders" />
          <SummaryStatsStat value="89" description="Customers" />
          <SummaryStatsStat value="3.2%" description="Conversion" />
        </SummaryStatsCarousel>
      );
      expect(screen.getByText("$1,000")).toBeDefined();
      expect(screen.getByText("150")).toBeDefined();
      expect(screen.getByText("89")).toBeDefined();
      expect(screen.getByText("3.2%")).toBeDefined();
    });
  });

  describe("WHEN rendered with fewer than 3 items", () => {
    it("THEN should render all items without scrolling", () => {
      render(
        <SummaryStatsCarousel data-testid="carousel-element">
          <SummaryStatsStat value="$1,000" description="Sales" />
          <SummaryStatsStat value="150" description="Orders" />
        </SummaryStatsCarousel>
      );
      expect(screen.getByText("$1,000")).toBeDefined();
      expect(screen.getByText("150")).toBeDefined();
    });
  });
});
