import React from "react";
import { render, screen, within } from "@testing-library/react";

import { SummaryStats } from "../../SummaryStats";
import { SummaryStatsStat } from "./SummaryStatsStat";
import { SummaryStatsStatProps } from "./summaryStatsStat.types";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const makeSut = (props: SummaryStatsStatProps) => {
  render(
    <SummaryStats>
      <SummaryStatsStat {...props} data-testid="summary-stats-stat-element" />
    </SummaryStats>
  );
};

describe("GIVEN <SummaryStatsStat />", () => {
  // SummaryStats renders the stat twice (mobile + desktop layout), so we use getAllByTestId and assert on the first instance.
  const getStatElements = () =>
    screen.getAllByTestId("summary-stats-stat-element");

  describe("WHEN rendered with required props", () => {
    it("THEN should render value and description correctly", () => {
      makeSut({ value: "$1,000", description: "Total Sales" });
      const stats = getStatElements();
      expect(stats.length).toBeGreaterThan(0);
      const stat = stats[0];
      expect(within(stat).getByText("$1,000")).toBeDefined();
      expect(within(stat).getByText("Total Sales")).toBeDefined();
    });
  });

  describe("WHEN rendered with trend up", () => {
    it("THEN should render the trend text", () => {
      makeSut({
        value: "$1,000",
        description: "Total Sales",
        trend: "up",
        trendText: "15%",
      });
      const stat = getStatElements()[0];
      expect(within(stat).getByText("15%")).toBeDefined();
    });
  });

  describe("WHEN rendered with trend down", () => {
    it("THEN should render the trend text", () => {
      makeSut({
        value: "150",
        description: "Orders",
        trend: "down",
        trendText: "8%",
      });
      const stat = getStatElements()[0];
      expect(within(stat).getByText("8%")).toBeDefined();
    });
  });

  describe("WHEN rendered with neutral trend", () => {
    it("THEN should render the trend text", () => {
      makeSut({
        value: "89",
        description: "Customers",
        trend: "neutral",
        trendText: "0%",
      });
      const stat = getStatElements()[0];
      expect(within(stat).getByText("0%")).toBeDefined();
    });
  });

  describe("WHEN rendered with infoTooltip", () => {
    it("THEN should render the info icon", () => {
      makeSut({
        value: "$1,000",
        description: "Total Sales",
        infoTooltip: "This is a tooltip",
      });
      const stats = getStatElements();
      expect(stats.length).toBeGreaterThan(0);
      expect(
        within(stats[0]).getByTestId("summary-stats-stat-info-icon")
      ).toBeDefined();
    });
  });
});
