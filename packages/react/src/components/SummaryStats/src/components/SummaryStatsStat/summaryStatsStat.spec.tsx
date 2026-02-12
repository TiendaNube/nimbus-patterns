import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";

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

const makeSutExpandable = (
  statProps: SummaryStatsStatProps & { children?: React.ReactNode }
) => {
  const { children, ...rest } = statProps;
  render(
    <SummaryStats
      expandable
      layout="horizontal"
      data-testid="summary-stats-element"
    >
      <SummaryStatsStat {...rest} data-testid="summary-stats-stat-element">
        {children}
      </SummaryStatsStat>
    </SummaryStats>
  );
};

const makeSutTwoStats = () => {
  render(
    <SummaryStats layout="horizontal" data-testid="summary-stats-element">
      <SummaryStatsStat
        value="$1,000"
        description="Total Sales"
        data-testid="summary-stats-stat-element"
      />
      <SummaryStatsStat
        value="150"
        description="Orders"
        data-testid="summary-stats-stat-element"
      />
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

  describe("WHEN in expandable mode", () => {
    it("THEN should toggle expandable content on click", () => {
      makeSutExpandable({
        value: "$1,000",
        description: "Total Sales",
        children: <div data-testid="expandable-content">Extra content</div>,
      });
      expect(screen.queryByTestId("expandable-content")).toBeNull();
      const stat = getStatElements()[0];
      const button = within(stat).getByRole("button");
      fireEvent.click(button);
      expect(screen.getByTestId("expandable-content")).toBeDefined();
      fireEvent.click(button);
      expect(screen.queryByTestId("expandable-content")).toBeNull();
    });

    it("THEN should toggle expandable content on Enter key", () => {
      makeSutExpandable({
        value: "$1,000",
        description: "Total Sales",
        children: <div data-testid="expandable-content">Extra content</div>,
      });
      expect(screen.queryByTestId("expandable-content")).toBeNull();
      const stat = getStatElements()[0];
      const button = within(stat).getByRole("button");
      fireEvent.keyDown(button, { key: "Enter" });
      expect(screen.getByTestId("expandable-content")).toBeDefined();
      fireEvent.keyDown(button, { key: "Enter" });
      expect(screen.queryByTestId("expandable-content")).toBeNull();
    });

    it("THEN should toggle expandable content on Space key", () => {
      makeSutExpandable({
        value: "$1,000",
        description: "Total Sales",
        children: <div data-testid="expandable-content">Extra content</div>,
      });
      expect(screen.queryByTestId("expandable-content")).toBeNull();
      const stat = getStatElements()[0];
      const button = within(stat).getByRole("button");
      fireEvent.keyDown(button, { key: " " });
      expect(screen.getByTestId("expandable-content")).toBeDefined();
      fireEvent.keyDown(button, { key: " " });
      expect(screen.queryByTestId("expandable-content")).toBeNull();
    });
  });

  describe("WHEN a stat is active in expandable mode", () => {
    it("THEN should set aria-expanded on the stat button", () => {
      makeSutExpandable({
        value: "$1,000",
        description: "Total Sales",
        children: <div data-testid="expandable-content">Extra content</div>,
      });
      const stat = getStatElements()[0];
      const button = within(stat).getByRole("button");
      expect(button.getAttribute("aria-expanded")).toBe("false");
      fireEvent.click(button);
      expect(button.getAttribute("aria-expanded")).toBe("true");
    });
  });

  describe("WHEN expandable and keyboard navigation", () => {
    it("THEN stat should be focusable with tabIndex 0", () => {
      makeSutExpandable({
        value: "$1,000",
        description: "Total Sales",
      });
      const stat = getStatElements()[0];
      const button = within(stat).getByRole("button");
      expect(button.getAttribute("tabindex")).toBe("0");
    });

    it("THEN stat should have role button", () => {
      makeSutExpandable({
        value: "$1,000",
        description: "Total Sales",
      });
      const stat = getStatElements()[0];
      expect(within(stat).getByRole("button")).toBeDefined();
    });
  });

  describe("WHEN rendered with multiple stats (separator)", () => {
    it("THEN first stat should show vertical separator", () => {
      makeSutTwoStats();
      const stats = screen.getAllByTestId("summary-stats-stat-element");
      expect(stats.length).toBeGreaterThanOrEqual(2);
      expect(
        within(stats[0]).getByTestId("summary-stats-stat-vertical-separator")
      ).toBeDefined();
    });

    it("THEN last stat should not show vertical separator", () => {
      makeSutTwoStats();
      const stats = screen.getAllByTestId("summary-stats-stat-element");
      expect(stats.length).toBeGreaterThanOrEqual(2);
      expect(
        within(stats[stats.length - 1]).queryByTestId(
          "summary-stats-stat-vertical-separator"
        )
      ).toBeNull();
    });
  });
});
