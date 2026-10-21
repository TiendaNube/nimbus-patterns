import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SummaryStats } from "../../SummaryStats";
import { SummaryStatsItem } from "./SummaryStatsItem";
import { SummaryStatsItemProps } from "./summaryStatsItem.types";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
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
        trendText: "15%"
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
        trendText: "8%"
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
        trendText: "0%"
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
        infoTooltip: "This is a tooltip"
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
        children: <div data-testid="expandable-content">Extra content</div>
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
        children: <div data-testid="expandable-content">Extra content</div>
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
        children: <div data-testid="expandable-content">Extra content</div>
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
        children: <div data-testid="expandable-content">Extra content</div>
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
        children: <div data-testid="expandable-content">Extra content</div>
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
        description: "Total Sales"
      });
      const stat = getStatElements()[0];
      const button = within(stat).getByRole("button");
      expect(button.getAttribute("tabindex")).toBe("0");
    });

    it("THEN stat should have role button", () => {
      makeSutExpandable({
        value: "$1,000",
        description: "Total Sales"
      });
      const stat = getStatElements()[0];
      expect(within(stat).getByRole("button")).toBeDefined();
    });

    it("THEN stat button should receive focus via Tab", async () => {
      const user = userEvent.setup();
      makeSutExpandable({
        value: "$1,000",
        description: "Total Sales"
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

/**
 * In jsdom both horizontal rows are rendered (scroll row first, then the
 * desktop row). Index 0 is the scroll-row copy, the last one the desktop copy.
 */
const scrollCell = (label: string) => screen.getAllByLabelText(label)[0];
const desktopCell = (label: string) =>
  screen.getAllByLabelText(label).at(-1) as HTMLElement;

describe("GIVEN <SummaryStatsItem /> static and interactive cells", () => {
  describe("WHEN a static cell sits beside an interactive cell", () => {
    it("AC-011 THEN the static cell has no affordance and the same box", () => {
      render(
        <SummaryStats expandable>
          <SummaryStatsItem
            aria-label="S"
            value="S"
            description="s"
            expandable={false}
          />
          <SummaryStatsItem aria-label="I" value="I" description="i" />
        </SummaryStats>
      );
      const staticCell = desktopCell("S");
      const interactiveCell = desktopCell("I");

      expect(staticCell).not.toHaveAttribute("role");
      expect(staticCell).not.toHaveAttribute("tabindex");
      expect(staticCell).not.toHaveAttribute("aria-expanded");
      expect(staticCell.querySelectorAll("svg")).toHaveLength(0);
      expect(staticCell.className).not.toContain("cursor-pointer");
      expect(staticCell.className).not.toContain("backgroundColor-hover");

      expect(interactiveCell.querySelectorAll("svg").length).toBeGreaterThan(0);
      expect(interactiveCell.className).toContain("cursor-pointer");
      expect(interactiveCell.className).toContain("backgroundColor-hover");

      [staticCell, interactiveCell].forEach((cell) => {
        expect(cell.className).toContain("padding-xs");
        expect(cell.getAttribute("style")).toMatch(
          /--padding-xs[^;]*var\(--nimbus-spacing-2\)/
        );
      });
    });
  });

  describe("WHEN a static cell is clicked while another cell is active", () => {
    it("AC-012 THEN nothing changes and the static cell takes no focus", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <SummaryStats expandable onActiveStatIdChange={onChange}>
          <SummaryStatsItem aria-label="A" value="A" description="a">
            <div data-testid="a-content">A content</div>
          </SummaryStatsItem>
          <SummaryStatsItem
            aria-label="S"
            value="S"
            description="s"
            expandable={false}
          >
            <div data-testid="s-content">S content</div>
          </SummaryStatsItem>
        </SummaryStats>
      );

      await user.click(desktopCell("A"));
      await user.click(desktopCell("S"));

      expect(desktopCell("A")).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByTestId("a-content")).toBeInTheDocument();
      expect(screen.queryByTestId("s-content")).toBeNull();
      expect(document.activeElement).not.toBe(desktopCell("S"));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("WHEN hovering the info icon of static and interactive cells", () => {
    it("AC-013 THEN each tooltip is revealed and no cell toggles", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <SummaryStats expandable onActiveStatIdChange={onChange}>
          <SummaryStatsItem
            aria-label="S"
            value="S"
            description="s"
            expandable={false}
            infoTooltip="Static tip"
          />
          <SummaryStatsItem
            aria-label="I"
            value="I"
            description="i"
            infoTooltip="Interactive tip"
          />
        </SummaryStats>
      );
      expect(desktopCell("S")).not.toHaveAttribute("role");

      await user.hover(
        within(desktopCell("S")).getByTestId("summary-stats-item-info-icon")
      );
      expect(await screen.findByText("Static tip")).toBeInTheDocument();

      await user.hover(
        within(desktopCell("I")).getByTestId("summary-stats-item-info-icon")
      );
      expect(await screen.findByText("Interactive tip")).toBeInTheDocument();

      expect(desktopCell("I")).toHaveAttribute("aria-expanded", "false");
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("WHEN a focused interactive cell is activated or becomes static", () => {
    interface FocusHarnessProps {
      // eslint-disable-next-line react/require-default-props
      aExpandable?: boolean;
    }

    const FocusHarness: React.FC<FocusHarnessProps> = ({ aExpandable }) => (
      <SummaryStats expandable>
        <SummaryStatsItem
          aria-label="A"
          value="A"
          description="a"
          expandable={aExpandable}
        >
          <div data-testid="a-content">A content</div>
        </SummaryStatsItem>
        <SummaryStatsItem aria-label="B" value="B" description="b" />
      </SummaryStats>
    );

    it("AC-021 THEN focus stays on activation and is not moved when static", () => {
      const { rerender } = render(<FocusHarness />);
      const cellA = desktopCell("A");

      cellA.focus();
      fireEvent.keyDown(cellA, { key: "Enter" });
      expect(screen.getByTestId("a-content")).toBeInTheDocument();
      expect(document.activeElement).toBe(cellA);

      rerender(<FocusHarness aExpandable={false} />);
      expect(desktopCell("A")).not.toHaveAttribute("tabindex");
      const otherCells = [scrollCell("A"), ...screen.getAllByLabelText("B")];
      otherCells.forEach((cell) =>
        expect(document.activeElement).not.toBe(cell)
      );
    });
  });

  describe("WHEN tabbing through interactive, static, interactive cells", () => {
    const TabHarness: React.FC = () => (
      <>
        <button type="button">before</button>
        <SummaryStats expandable>
          <SummaryStatsItem aria-label="A" value="A" description="a" />
          <SummaryStatsItem
            aria-label="S"
            value="S"
            description="s"
            expandable={false}
          />
          <SummaryStatsItem aria-label="B" value="B" description="b">
            <a href="#details">B details</a>
          </SummaryStatsItem>
        </SummaryStats>
        <button type="button">after</button>
      </>
    );

    it("AC-023 THEN Tab and Shift+Tab skip the static cell in row order", async () => {
      const user = userEvent.setup();
      render(<TabHarness />);
      const expected = [
        screen.getByText("before"),
        scrollCell("A"),
        scrollCell("B"),
        desktopCell("A"),
        desktopCell("B"),
        screen.getByText("after")
      ];

      const forward: Element[] = [];
      for (let step = 0; step < expected.length; step += 1) {
        // eslint-disable-next-line no-await-in-loop
        await user.tab();
        forward.push(document.activeElement as Element);
      }
      expect(forward).toEqual(expected);

      const backward: Element[] = [];
      for (let step = 0; step < expected.length - 1; step += 1) {
        // eslint-disable-next-line no-await-in-loop
        await user.tab({ shift: true });
        backward.push(document.activeElement as Element);
      }
      expect(backward).toEqual(expected.slice(0, -1).reverse());
      screen.getAllByLabelText("S").forEach((cell) => {
        expect(forward).not.toContain(cell);
        expect(backward).not.toContain(cell);
      });
    });

    it("AC-023 THEN Tab from the active cell reaches its area link first", async () => {
      const user = userEvent.setup();
      render(<TabHarness />);

      await user.click(desktopCell("B"));
      expect(document.activeElement).toBe(desktopCell("B"));
      await user.tab();
      expect(document.activeElement).toBe(screen.getByText("B details"));
      await user.tab();
      expect(document.activeElement).toBe(screen.getByText("after"));
    });
  });

  describe("WHEN using arrow keys on interactive cells", () => {
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    let scrollIntoView: jest.Mock;

    beforeEach(() => {
      scrollIntoView = jest.fn();
      Element.prototype.scrollIntoView = scrollIntoView;
    });

    afterEach(() => {
      Element.prototype.scrollIntoView = originalScrollIntoView;
    });

    const renderRow = (onChange = jest.fn(), onParentKeyDown = jest.fn()) =>
      render(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onKeyDown={onParentKeyDown}>
          <SummaryStats expandable onActiveStatIdChange={onChange}>
            <SummaryStatsItem aria-label="A" value="A" description="a" />
            <SummaryStatsItem
              aria-label="S"
              value="S"
              description="s"
              expandable={false}
            />
            <SummaryStatsItem aria-label="B" value="B" description="b" />
            <SummaryStatsItem aria-label="C" value="C" description="c" />
          </SummaryStats>
        </div>
      );

    it("AC-024 THEN arrows move focus between interactive cells skipping static ones", () => {
      const onChange = jest.fn();
      const onParentKeyDown = jest.fn();
      renderRow(onChange, onParentKeyDown);
      desktopCell("A").focus();

      const steps: [string, string][] = [
        ["ArrowRight", "B"],
        ["ArrowRight", "C"],
        ["ArrowLeft", "B"],
        ["ArrowLeft", "A"]
      ];
      steps.forEach(([key, target]) => {
        const notPrevented = fireEvent.keyDown(
          document.activeElement as Element,
          { key }
        );
        expect(notPrevented).toBe(false);
        expect(document.activeElement).toBe(desktopCell(target));
      });

      expect(scrollIntoView).toHaveBeenCalledWith({
        block: "nearest",
        inline: "nearest"
      });
      expect(scrollIntoView.mock.contexts[0]).toBe(desktopCell("B"));
      expect(onParentKeyDown).toHaveBeenCalledTimes(steps.length);
      expect(onChange).not.toHaveBeenCalled();
      expect(document.querySelectorAll('[aria-expanded="true"]')).toHaveLength(
        0
      );
    });

    it("AC-025 THEN focus stays at the edges and on a single cell", () => {
      const onChange = jest.fn();
      const { unmount } = renderRow(onChange);

      desktopCell("A").focus();
      expect(fireEvent.keyDown(desktopCell("A"), { key: "ArrowLeft" })).toBe(
        false
      );
      expect(document.activeElement).toBe(desktopCell("A"));

      desktopCell("C").focus();
      expect(fireEvent.keyDown(desktopCell("C"), { key: "ArrowRight" })).toBe(
        false
      );
      expect(document.activeElement).toBe(desktopCell("C"));
      unmount();

      render(
        <SummaryStats expandable onActiveStatIdChange={onChange}>
          <SummaryStatsItem aria-label="Solo" value="1" description="solo" />
        </SummaryStats>
      );
      const solo = desktopCell("Solo");
      solo.focus();
      ["ArrowLeft", "ArrowRight"].forEach((key) => {
        expect(fireEvent.keyDown(solo, { key })).toBe(false);
        expect(document.activeElement).toBe(solo);
      });
      expect(solo).toHaveAttribute("aria-expanded", "false");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("AC-026 THEN modified arrows, Up, Down, Home and End are not handled", () => {
      renderRow();

      desktopCell("B").focus();
      [
        { key: "ArrowLeft", altKey: true },
        { key: "ArrowLeft", shiftKey: true },
        { key: "ArrowLeft", metaKey: true },
        { key: "ArrowUp" },
        { key: "Home" }
      ].forEach((init) => {
        expect(fireEvent.keyDown(desktopCell("B"), init)).toBe(true);
        expect(document.activeElement).toBe(desktopCell("B"));
      });

      [
        { key: "ArrowRight", ctrlKey: true },
        { key: "ArrowDown" },
        { key: "End" }
      ].forEach((init) => {
        expect(fireEvent.keyDown(desktopCell("B"), init)).toBe(true);
        expect(document.activeElement).toBe(desktopCell("B"));
      });
    });

    it("AC-030 THEN arrows stay within the row of the focused cell", () => {
      renderRow();

      desktopCell("A").focus();
      fireEvent.keyDown(desktopCell("A"), { key: "ArrowRight" });
      expect(document.activeElement).toBe(desktopCell("B"));

      scrollCell("B").focus();
      fireEvent.keyDown(scrollCell("B"), { key: "ArrowRight" });
      expect(document.activeElement).toBe(scrollCell("C"));
      expect(scrollIntoView.mock.contexts.at(-1)).toBe(scrollCell("C"));

      fireEvent.keyDown(scrollCell("C"), { key: "ArrowRight" });
      expect(document.activeElement).toBe(scrollCell("C"));

      scrollCell("A").focus();
      fireEvent.keyDown(scrollCell("A"), { key: "ArrowLeft" });
      expect(document.activeElement).toBe(scrollCell("A"));

      desktopCell("A").focus();
      fireEvent.keyDown(desktopCell("A"), { key: "ArrowLeft" });
      expect(document.activeElement).toBe(desktopCell("A"));
    });
  });
});
