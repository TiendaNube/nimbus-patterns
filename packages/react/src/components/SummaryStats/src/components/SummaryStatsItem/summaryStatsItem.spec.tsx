import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SummaryStats } from "../../SummaryStats";
import { SummaryStatsItem } from "./SummaryStatsItem";
import { SummaryStatsItemProps } from "./summaryStatsItem.types";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const makeSut = (props: SummaryStatsItemProps) => {
  render(
    <SummaryStats>
      <SummaryStatsItem {...props} data-testid="summary-stats-item-element" />
    </SummaryStats>
  );
};

const makeSutExpandable = (
  statProps: SummaryStatsItemProps & { children?: React.ReactNode }
) => {
  const { children, ...rest } = statProps;
  render(
    <SummaryStats
      expandable
      layout="horizontal"
      data-testid="summary-stats-element"
    >
      <SummaryStatsItem {...rest} data-testid="summary-stats-item-element">
        {children}
      </SummaryStatsItem>
    </SummaryStats>
  );
};

const makeSutTwoStats = () => {
  render(
    <SummaryStats layout="horizontal" data-testid="summary-stats-element">
      <SummaryStatsItem
        value="$1,000"
        description="Total Sales"
        data-testid="summary-stats-item-element"
      />
      <SummaryStatsItem
        value="150"
        description="Orders"
        data-testid="summary-stats-item-element"
      />
    </SummaryStats>
  );
};

describe("GIVEN <SummaryStatsItem />", () => {
  const getStatElements = () =>
    screen.getAllByTestId("summary-stats-item-element");

  describe("WHEN rendered with required props", () => {
    it("THEN should render value and description correctly", () => {
      render(
        <SummaryStats layout="grid">
          <SummaryStatsItem
            value="$1,000"
            description="Total Sales"
            data-testid="summary-stats-item-element"
          />
        </SummaryStats>
      );
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
      const infoIcon = within(stats[0]).getByTestId(
        "summary-stats-item-info-icon"
      );
      expect(infoIcon).toBeDefined();
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

    it("THEN should show active state (aria-expanded and visible content) on the stat element when selected", () => {
      makeSutExpandable({
        value: "$1,000",
        description: "Total Sales",
        children: <div data-testid="expandable-content">Extra content</div>,
      });
      const statElement = screen.getAllByTestId(
        "summary-stats-item-element"
      )[0];
      const button = within(statElement).getByRole("button");
      expect(button.getAttribute("aria-expanded")).toBe("false");
      fireEvent.click(button);
      expect(button.getAttribute("aria-expanded")).toBe("true");
      expect(screen.queryByTestId("expandable-content")).not.toBeNull();
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

    it("THEN stat button should receive focus via Tab", async () => {
      const user = userEvent.setup();
      makeSutExpandable({
        value: "$1,000",
        description: "Total Sales",
      });
      const stat = screen.getAllByTestId("summary-stats-item-element")[0];
      const button = within(stat).getByRole("button");
      await user.tab();
      expect(document.activeElement).toBe(button);
    });
  });

  describe("WHEN rendered with multiple stats (separator)", () => {
    it("THEN single stat (isLastStat true) should not render vertical separator on the last stat element", () => {
      makeSut({ value: "$1,000", description: "Total Sales" });
      const stats = screen.getAllByTestId("summary-stats-item-element");
      expect(stats.length).toBeGreaterThan(0);
      const lastStatElement = stats[stats.length - 1];
      expect(
        within(lastStatElement).queryByTestId(
          "summary-stats-item-vertical-separator"
        )
      ).toBeNull();
    });

    it("THEN first stat (isLastStat false) should show vertical separator", () => {
      makeSutTwoStats();
      const stats = screen.getAllByTestId("summary-stats-item-element");
      expect(stats.length).toBeGreaterThanOrEqual(2);
      expect(
        within(stats[0]).getByTestId("summary-stats-item-vertical-separator")
      ).toBeDefined();
    });

    it("THEN last stat (isLastStat true) should not show vertical separator", () => {
      makeSutTwoStats();
      const stats = screen.getAllByTestId("summary-stats-item-element");
      expect(stats.length).toBeGreaterThanOrEqual(2);
      expect(
        within(stats[stats.length - 1]).queryByTestId(
          "summary-stats-item-vertical-separator"
        )
      ).toBeNull();
    });
  });
});
