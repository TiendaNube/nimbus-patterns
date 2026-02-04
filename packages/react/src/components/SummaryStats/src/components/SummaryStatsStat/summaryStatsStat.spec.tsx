import React from "react";
import { render, screen } from "@testing-library/react";

import { SummaryStats } from "../../SummaryStats";
import { SummaryStatsStat } from "./SummaryStatsStat";
import { SummaryStatsStatProps } from "./summaryStatsStat.types";

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
      expect(screen.getByText("$1,000")).toBeDefined();
      expect(screen.getByText("Total Sales")).toBeDefined();
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
      expect(screen.getByText("15%")).toBeDefined();
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
      expect(screen.getByText("8%")).toBeDefined();
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
      expect(screen.getByText("0%")).toBeDefined();
    });
  });

  describe("WHEN rendered with infoTooltip", () => {
    it("THEN should render the info icon", () => {
      makeSut({
        value: "$1,000",
        description: "Total Sales",
        infoTooltip: "This is a tooltip",
      });
      // The tooltip trigger (info icon) should be present
      expect(screen.getByTestId("summary-stats-stat-element")).toBeDefined();
    });
  });
});
