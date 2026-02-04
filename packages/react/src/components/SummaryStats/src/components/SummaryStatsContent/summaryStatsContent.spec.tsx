import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { SummaryStats } from "../../SummaryStats";

describe("GIVEN <SummaryStatsContent />", () => {
  describe("WHEN not in expandable mode", () => {
    it("THEN should not render content", () => {
      render(
        <SummaryStats>
          <SummaryStats.Stat value="$1,000" description="Sales" />
          <SummaryStats.Content>
            <div data-testid="content">Hidden content</div>
          </SummaryStats.Content>
        </SummaryStats>
      );
      expect(screen.queryByTestId("content")).toBeNull();
    });
  });

  describe("WHEN in expandable mode but nothing selected", () => {
    it("THEN should not render content", () => {
      render(
        <SummaryStats expandable>
          <SummaryStats.Stat id="stat-1" value="$1,000" description="Sales" />
          <SummaryStats.Content>
            <div data-testid="content">Hidden content</div>
          </SummaryStats.Content>
        </SummaryStats>
      );
      expect(screen.queryByTestId("content")).toBeNull();
    });
  });

  describe("WHEN in expandable mode with a selected stat", () => {
    it("THEN should render content", () => {
      render(
        <SummaryStats expandable defaultSelectedId="stat-1">
          <SummaryStats.Stat id="stat-1" value="$1,000" description="Sales" />
          <SummaryStats.Content>
            <div data-testid="content">Visible content</div>
          </SummaryStats.Content>
        </SummaryStats>
      );
      expect(screen.getByTestId("content")).toBeDefined();
    });

    it("THEN should show content after clicking a stat", () => {
      render(
        <SummaryStats expandable>
          <SummaryStats.Stat id="stat-1" value="$1,000" description="Sales" />
          <SummaryStats.Content>
            <div data-testid="content">Visible content</div>
          </SummaryStats.Content>
        </SummaryStats>
      );

      // Initially hidden
      expect(screen.queryByTestId("content")).toBeNull();

      // Click to show
      fireEvent.click(screen.getByText("$1,000"));
      expect(screen.getByTestId("content")).toBeDefined();
    });
  });
});
