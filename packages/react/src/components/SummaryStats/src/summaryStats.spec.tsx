import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { SummaryStats } from "./SummaryStats";
import { SummaryStatsProps } from "./summaryStats.types";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const makeSut = (props?: Partial<SummaryStatsProps>) => {
  render(
    <SummaryStats {...props} data-testid="summary-stats-element">
      <SummaryStats.Stat
        value="$1,000"
        description="Total Sales"
        trend="up"
        trendText="15%"
      >
        <div data-testid="expandable-content">Content here</div>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="150"
        description="Orders"
        trend="down"
        trendText="8%"
      >
        <div data-testid="orders-content">Orders content</div>
      </SummaryStats.Stat>
    </SummaryStats>
  );
};

describe("GIVEN <SummaryStats />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render stats correctly", () => {
      makeSut();
      expect(screen.getAllByText("$1,000").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("Total Sales").length).toBeGreaterThanOrEqual(
        1
      );
      expect(screen.getAllByText("150").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("Orders").length).toBeGreaterThanOrEqual(1);
    });

    it("THEN should render the container with correct test id", () => {
      makeSut();
      expect(screen.getByTestId("summary-stats-element")).toBeDefined();
    });

    it("THEN should render trend indicators", () => {
      makeSut();
      expect(screen.getAllByText("15%").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("8%").length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("WHEN in static mode (not expandable)", () => {
    it("THEN should not show expandable content", () => {
      makeSut();
      expect(screen.queryByTestId("expandable-content")).toBeNull();
    });
  });

  describe("WHEN in expandable mode", () => {
    it("THEN should show content when a stat is clicked", () => {
      makeSut({ expandable: true });

      expect(screen.queryByTestId("expandable-content")).toBeNull();

      fireEvent.click(screen.getAllByText("$1,000")[0]);

      expect(screen.getByTestId("expandable-content")).toBeDefined();
    });

    it("THEN should toggle selection on click", () => {
      makeSut({ expandable: true });

      fireEvent.click(screen.getAllByText("$1,000")[0]);
      expect(screen.getByTestId("expandable-content")).toBeDefined();

      fireEvent.click(screen.getAllByText("$1,000")[0]);
      expect(screen.queryByTestId("expandable-content")).toBeNull();
    });

    it("THEN should switch between stats when clicking different ones", () => {
      makeSut({ expandable: true });

      fireEvent.click(screen.getAllByText("$1,000")[0]);
      expect(screen.getByTestId("expandable-content")).toBeDefined();
      expect(screen.queryByTestId("orders-content")).toBeNull();

      fireEvent.click(screen.getAllByText("150")[0]);
      expect(screen.queryByTestId("expandable-content")).toBeNull();
      expect(screen.getByTestId("orders-content")).toBeDefined();
    });
  });
});
