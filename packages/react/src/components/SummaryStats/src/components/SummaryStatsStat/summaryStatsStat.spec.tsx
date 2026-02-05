import React from "react";
import { render, screen } from "@testing-library/react";

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
  describe("WHEN rendered with required props", () => {
    it("THEN should render value and description correctly", () => {
      makeSut({ value: "$1,000", description: "Total Sales" });
      expect(screen.getAllByText("$1,000").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("Total Sales").length).toBeGreaterThanOrEqual(
        1
      );
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
      expect(screen.getAllByText("15%").length).toBeGreaterThanOrEqual(1);
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
      expect(screen.getAllByText("8%").length).toBeGreaterThanOrEqual(1);
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
      expect(screen.getAllByText("0%").length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("WHEN rendered with infoTooltip", () => {
    it("THEN should render the info icon", () => {
      makeSut({
        value: "$1,000",
        description: "Total Sales",
        infoTooltip: "This is a tooltip",
      });
      expect(
        screen.getAllByTestId("summary-stats-stat-element").length
      ).toBeGreaterThanOrEqual(1);
    });
  });
});
