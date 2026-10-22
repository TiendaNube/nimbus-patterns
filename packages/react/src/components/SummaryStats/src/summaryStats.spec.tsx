import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SummaryStats } from "./SummaryStats";
import { SummaryStatsProps } from "./summaryStats.types";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

const makeSut = (props?: Partial<SummaryStatsProps>) => {
  render(
    <SummaryStats {...props} data-testid="summary-stats-element">
      <SummaryStats.Item
        value="$1,000"
        description="Total Sales"
        trend="up"
        trendText="15%"
      >
        <div data-testid="expandable-content">Content here</div>
      </SummaryStats.Item>
      <SummaryStats.Item
        value="150"
        description="Orders"
        trend="down"
        trendText="8%"
      >
        <div data-testid="orders-content">Orders content</div>
      </SummaryStats.Item>
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

/**
 * In jsdom both horizontal rows are rendered (scroll row first, then the
 * desktop row). The last match is the desktop-row copy of a cell.
 */
const desktopCell = (label: string) =>
  screen.getAllByLabelText(label).at(-1) as HTMLElement;

const expandedCells = () =>
  document.querySelectorAll('[aria-expanded="true"]').length;

const controllingCells = () =>
  document.querySelectorAll("[aria-controls]").length;

// Test-only harness; defaults are set with destructuring.
interface HarnessProps {
  // eslint-disable-next-line react/require-default-props
  controlled?: boolean;
  // eslint-disable-next-line react/require-default-props
  aContent?: string | null;
  // eslint-disable-next-line react/require-default-props
  bContent?: string;
  // eslint-disable-next-line react/require-default-props
  aExpandable?: boolean;
  // eslint-disable-next-line react/require-default-props
  showA?: boolean;
  onChange: (id: string | null) => void;
}

const Harness: React.FC<HarnessProps> = ({
  controlled = false,
  aContent = "A content",
  bContent = "B content",
  aExpandable,
  showA = true,
  onChange
}) => {
  const [active, setActive] = useState<string | null>(null);
  const modeProps = controlled
    ? {
        activeStatId: active,
        onActiveStatIdChange: (id: string | null) => {
          onChange(id);
          setActive(id);
        }
      }
    : { onActiveStatIdChange: onChange };

  return (
    <>
      <output data-testid="active-stat-id">{active ?? "none"}</output>
      <SummaryStats expandable data-testid="root" {...modeProps}>
        {showA && (
          <SummaryStats.Item
            aria-label="A"
            value="A"
            description="a"
            expandable={aExpandable}
          >
            {aContent ? <div data-testid="a-content">{aContent}</div> : null}
          </SummaryStats.Item>
        )}
        <SummaryStats.Item aria-label="B" value="B" description="b">
          <div data-testid="b-content">{bContent}</div>
        </SummaryStats.Item>
      </SummaryStats>
    </>
  );
};

const modes = [
  ["uncontrolled", false],
  ["controlled", true]
] as const;

describe("GIVEN <SummaryStats /> with per-cell expandable", () => {
  describe("WHEN cells do not set expandable", () => {
    it("AC-008 THEN cells inherit the container value exactly", () => {
      const onChange = jest.fn();
      const items = (
        <>
          <SummaryStats.Item aria-label="A" value="A" description="a">
            <div data-testid="a-content">A content</div>
          </SummaryStats.Item>
          <SummaryStats.Item aria-label="B" value="B" description="b" />
        </>
      );
      const { rerender } = render(
        <SummaryStats expandable onActiveStatIdChange={onChange}>
          {items}
        </SummaryStats>
      );

      expect(desktopCell("A")).toHaveAttribute("role", "button");
      expect(desktopCell("B")).toHaveAttribute("role", "button");

      fireEvent.click(desktopCell("A"));
      expect(screen.getByTestId("a-content")).toBeInTheDocument();

      fireEvent.click(desktopCell("B"));
      expect(desktopCell("B")).toHaveAttribute("aria-expanded", "true");
      expect(screen.queryByTestId("a-content")).toBeNull();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(typeof onChange.mock.calls[1][0]).toBe("string");

      rerender(
        <SummaryStats onActiveStatIdChange={onChange}>{items}</SummaryStats>
      );
      expect(screen.queryAllByRole("button")).toHaveLength(0);
    });
  });

  describe("WHEN a cell opts in under a non-expandable container", () => {
    it("AC-009 THEN only the opted-in cell is interactive", () => {
      const onChange = jest.fn();
      render(
        <SummaryStats onActiveStatIdChange={onChange}>
          <SummaryStats.Item
            aria-label="A"
            value="A"
            description="a"
            expandable
          >
            <div data-testid="a-content">A content</div>
          </SummaryStats.Item>
          <SummaryStats.Item aria-label="B" value="B" description="b" />
        </SummaryStats>
      );

      expect(desktopCell("A")).toHaveAttribute("role", "button");
      expect(desktopCell("B")).not.toHaveAttribute("role");

      fireEvent.click(desktopCell("A"));
      expect(screen.getByTestId("a-content")).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);

      fireEvent.click(desktopCell("B"));
      expect(screen.getByTestId("a-content")).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("WHEN a cell opts out under an expandable container", () => {
    it("AC-010 THEN the opted-out cell is inert and skipped by Tab", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <>
          <button type="button">before</button>
          <SummaryStats expandable onActiveStatIdChange={onChange}>
            <SummaryStats.Item
              aria-label="S"
              value="S"
              description="s"
              expandable={false}
            >
              <div data-testid="s-content">S content</div>
            </SummaryStats.Item>
            <SummaryStats.Item aria-label="B" value="B" description="b">
              <div data-testid="b-content">B content</div>
            </SummaryStats.Item>
          </SummaryStats>
          <button type="button">after</button>
        </>
      );

      fireEvent.click(desktopCell("S"));
      expect(screen.queryByTestId("s-content")).toBeNull();
      expect(onChange).not.toHaveBeenCalled();

      const staticCells = screen.getAllByLabelText("S");
      const visited: Element[] = [];
      for (let step = 0; step < 4; step += 1) {
        // eslint-disable-next-line no-await-in-loop
        await user.tab();
        visited.push(document.activeElement as Element);
      }
      expect(visited).toEqual([
        screen.getByText("before"),
        ...screen.getAllByLabelText("B"),
        screen.getByText("after")
      ]);
      staticCells.forEach((cell) => expect(visited).not.toContain(cell));

      fireEvent.click(desktopCell("B"));
      expect(screen.getByTestId("b-content")).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("WHEN the layout is grid", () => {
    it("AC-014 THEN container and cell expandable values are ignored", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <>
          <button type="button">before</button>
          <SummaryStats
            layout="grid"
            expandable
            onActiveStatIdChange={onChange}
          >
            <SummaryStats.Item
              aria-label="A"
              value="A"
              description="a"
              expandable
            >
              <div data-testid="a-content">A content</div>
            </SummaryStats.Item>
            <SummaryStats.Item aria-label="B" value="B" description="b" />
          </SummaryStats>
          <button type="button">after</button>
        </>
      );

      expect(screen.queryAllByRole("button", { name: /^[AB]$/ })).toHaveLength(
        0
      );
      const cellA = screen.getByLabelText("A");
      expect(cellA).not.toHaveAttribute("tabindex");
      expect(cellA).not.toHaveAttribute("aria-expanded");

      fireEvent.click(cellA);
      fireEvent.keyDown(cellA, { key: "Enter" });
      fireEvent.keyDown(cellA, { key: "ArrowRight" });
      expect(screen.queryByTestId("a-content")).toBeNull();
      expect(onChange).not.toHaveBeenCalled();

      await user.tab();
      await user.tab();
      expect(document.activeElement).toBe(screen.getByText("after"));
    });
  });

  describe("WHEN an interactive cell has no children", () => {
    it("AC-015 THEN it activates without rendering an expanded area", () => {
      const onChange = jest.fn();
      render(
        <SummaryStats
          expandable
          data-testid="root"
          onActiveStatIdChange={onChange}
        >
          <SummaryStats.Item aria-label="A" value="A" description="a" />
          <SummaryStats.Item aria-label="B" value="B" description="b" />
        </SummaryStats>
      );

      fireEvent.click(desktopCell("A"));
      expect(desktopCell("A")).toHaveAttribute("aria-expanded", "true");
      expect(desktopCell("A").getAttribute("style")).toContain(
        "primary-surface"
      );
      expect(onChange).toHaveBeenCalledWith(expect.any(String));
      // Root holds the scroll row and the desktop row only: no panel.
      expect(screen.getByTestId("root").children).toHaveLength(2);
      expect(controllingCells()).toBe(0);
    });
  });

  describe.each(modes)("WHEN %s", (_mode, controlled) => {
    it("AC-016 THEN the area hides when the active cell loses children or becomes static, keeping the active id", () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <Harness controlled={controlled} onChange={onChange} />
      );

      fireEvent.click(desktopCell("A"));
      expect(screen.getByTestId("a-content")).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);

      rerender(
        <Harness controlled={controlled} onChange={onChange} aContent={null} />
      );
      expect(screen.queryByTestId("a-content")).toBeNull();
      expect(desktopCell("A")).toHaveAttribute("aria-expanded", "true");

      rerender(<Harness controlled={controlled} onChange={onChange} />);
      expect(screen.getByTestId("a-content")).toBeInTheDocument();
      expect(desktopCell("A")).toHaveAttribute("aria-expanded", "true");

      rerender(
        <Harness
          controlled={controlled}
          onChange={onChange}
          aExpandable={false}
        />
      );
      expect(screen.queryByTestId("a-content")).toBeNull();
      expect(desktopCell("A")).not.toHaveAttribute("aria-expanded");

      rerender(<Harness controlled={controlled} onChange={onChange} />);
      expect(screen.getByTestId("a-content")).toBeInTheDocument();
      expect(desktopCell("A")).toHaveAttribute("aria-expanded", "true");
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("AC-018 THEN the active cell survives children changes", () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <Harness controlled={controlled} onChange={onChange} />
      );

      fireEvent.click(desktopCell("A"));
      expect(screen.getByText("A content")).toBeInTheDocument();

      rerender(
        <Harness
          controlled={controlled}
          onChange={onChange}
          aContent="New A content"
          bContent="New B content"
        />
      );
      expect(screen.getByText("New A content")).toBeInTheDocument();
      expect(desktopCell("A")).toHaveAttribute("aria-expanded", "true");
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("AC-020 THEN a static active cell shows the active state again when it becomes expandable", () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <Harness controlled={controlled} onChange={onChange} />
      );

      fireEvent.click(desktopCell("A"));
      rerender(
        <Harness
          controlled={controlled}
          onChange={onChange}
          aExpandable={false}
        />
      );
      expect(desktopCell("A")).not.toHaveAttribute("aria-expanded");
      expect(screen.queryByTestId("a-content")).toBeNull();

      rerender(
        <Harness controlled={controlled} onChange={onChange} aExpandable />
      );
      expect(desktopCell("A")).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByTestId("a-content")).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("WHEN activeStatId is controlled and points to a static cell", () => {
    it("AC-017 THEN no area and no active cell are rendered", () => {
      const onChange = jest.fn();
      const { rerender } = render(<Harness controlled onChange={onChange} />);

      fireEvent.click(desktopCell("A"));
      const activeId = screen.getByTestId("active-stat-id").textContent;
      rerender(<Harness controlled onChange={onChange} aExpandable={false} />);

      expect(screen.getByTestId("active-stat-id")).toHaveTextContent(
        activeId as string
      );
      expect(screen.queryByTestId("a-content")).toBeNull();
      expect(screen.getByTestId("root").children).toHaveLength(2);
      screen.getAllByLabelText("A").forEach((cell) => {
        expect(cell).not.toHaveAttribute("aria-expanded");
        expect(cell.getAttribute("style")).not.toContain("primary-surface");
      });
      expect(expandedCells()).toBe(0);
    });
  });

  describe("WHEN the active cell unmounts", () => {
    it("AC-019 THEN uncontrolled resets silently", () => {
      const onChange = jest.fn();
      const { rerender } = render(<Harness onChange={onChange} />);

      fireEvent.click(desktopCell("A"));
      rerender(<Harness onChange={onChange} showA={false} />);
      expect(screen.queryByTestId("a-content")).toBeNull();
      expect(expandedCells()).toBe(0);

      rerender(<Harness onChange={onChange} />);
      expect(desktopCell("A")).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByTestId("a-content")).toBeNull();
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("AC-019 THEN controlled keeps activeStatId untouched", () => {
      const onChange = jest.fn();
      const { rerender } = render(<Harness controlled onChange={onChange} />);

      fireEvent.click(desktopCell("A"));
      const activeId = screen.getByTestId("active-stat-id").textContent;
      rerender(<Harness controlled onChange={onChange} showA={false} />);

      expect(screen.getByTestId("active-stat-id")).toHaveTextContent(
        activeId as string
      );
      expect(screen.queryByTestId("a-content")).toBeNull();
      expect(screen.getByTestId("root").children).toHaveLength(2);
      expect(expandedCells()).toBe(0);
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("WHEN the expanded area is rendered and hidden", () => {
    it("AC-027 THEN only the active cell references the rendered area", () => {
      const onChange = jest.fn();
      const { rerender } = render(<Harness onChange={onChange} />);

      fireEvent.click(desktopCell("A"));
      const panelId = desktopCell("A").getAttribute("aria-controls");
      expect(panelId).toBeTruthy();
      expect(document.getElementById(panelId as string)).toContainElement(
        screen.getByTestId("a-content")
      );
      expect(controllingCells()).toBe(1);

      fireEvent.click(desktopCell("A"));
      expect(controllingCells()).toBe(0);

      fireEvent.click(desktopCell("A"));
      expect(controllingCells()).toBe(1);
      rerender(<Harness onChange={onChange} aContent={null} />);
      expect(controllingCells()).toBe(0);

      rerender(<Harness onChange={onChange} />);
      expect(controllingCells()).toBe(1);
      rerender(<Harness onChange={onChange} aExpandable={false} />);
      expect(controllingCells()).toBe(0);
    });

    it("AC-027 THEN an active children-less cell carries no reference", () => {
      render(<Harness onChange={jest.fn()} aContent={null} />);

      fireEvent.click(desktopCell("A"));
      expect(desktopCell("A")).toHaveAttribute("aria-expanded", "true");
      expect(controllingCells()).toBe(0);
    });
  });

  describe("WHEN the expanded area is rendered", () => {
    it("AC-029 THEN it has 12px padding, no margin and a 4px inset", () => {
      render(<Harness onChange={jest.fn()} />);

      fireEvent.click(desktopCell("A"));
      const panel = screen.getByTestId("a-content")
        .parentElement as HTMLElement;
      const panelStyle = panel.getAttribute("style") ?? "";
      expect(panelStyle).toMatch(/--padding-xs[^;]*var\(--nimbus-spacing-3\)/);
      expect(panelStyle).not.toMatch(/--margin[^;]*var\(--nimbus-spacing/);

      const inset = panel.parentElement as HTMLElement;
      expect(inset.parentElement).toBe(screen.getByTestId("root"));
      const insetStyle = inset.getAttribute("style") ?? "";
      ["paddingLeft", "paddingRight", "paddingBottom"].forEach((side) => {
        expect(insetStyle).toMatch(
          new RegExp(`--${side}-xs[^;]*var\\(--nimbus-spacing-1\\)`)
        );
      });
      expect(insetStyle).not.toMatch(/--paddingTop/);
    });
  });

  describe("WHEN two containers are on the page", () => {
    it("AC-031 THEN acting in one leaves the other unaffected", async () => {
      const user = userEvent.setup();
      const makeContainer = (suffix: string) => (
        <SummaryStats expandable>
          <SummaryStats.Item
            aria-label={`A${suffix}`}
            value={`A${suffix}`}
            description="a"
          >
            <div data-testid={`a${suffix}-content`}>A content</div>
          </SummaryStats.Item>
          <SummaryStats.Item
            aria-label={`B${suffix}`}
            value={`B${suffix}`}
            description="b"
          />
        </SummaryStats>
      );
      render(
        <>
          {makeContainer("1")}
          {makeContainer("2")}
        </>
      );

      await user.click(desktopCell("A2"));
      await user.click(desktopCell("A1"));
      fireEvent.keyDown(desktopCell("A1"), { key: "ArrowRight" });

      expect(document.activeElement).toBe(desktopCell("B1"));
      expect(screen.getByTestId("a1-content")).toBeInTheDocument();
      expect(desktopCell("A2")).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByTestId("a2-content")).toBeInTheDocument();
      fireEvent.keyDown(desktopCell("B1"), { key: "ArrowRight" });
      expect(document.activeElement).toBe(desktopCell("B1"));
    });
  });
});
