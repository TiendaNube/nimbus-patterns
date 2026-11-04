import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProductUpdatesPaginator } from "./ProductUpdatesPaginator";
import { ProductUpdatesPaginatorProps } from "./productUpdatesPaginator.types";

type Appearance = NonNullable<ProductUpdatesPaginatorProps["appearance"]>;

const APPEARANCES: Appearance[] = ["primary", "neutral"];
const TEST_ID = "paginator-element";

const ACTIVE_ITEM_COLOR = {
  primary: "var(--nimbus-colors-neutral-background)",
  neutral: "var(--nimbus-colors-primary-interactive)"
};
const INACTIVE_ITEM_COLOR = {
  primary: "var(--nimbus-colors-primary-textLow)",
  neutral: "var(--nimbus-colors-neutral-interactiveHover)"
};

const makeSut = (rest: ProductUpdatesPaginatorProps) =>
  render(<ProductUpdatesPaginator {...rest} data-testid={TEST_ID} />);

const getRow = () => screen.getByTestId(TEST_ID);
const getDots = (row: HTMLElement = getRow()) =>
  Array.from(row.children) as HTMLElement[];
const styleOf = (element: Element) => element.getAttribute("style") ?? "";
const isWide = (dot: HTMLElement) => styleOf(dot).includes("24px");
const activeIndexOf = (dots: HTMLElement[]) =>
  dots.reduce<number[]>((all, dot, index) => {
    if (isWide(dot)) all.push(index);
    return all;
  }, []);

describe("GIVEN <ProductUpdatesPaginator />", () => {
  describe("WHEN rendered", () => {
    it("AC-001: SHOULD render the correct number of dots", () => {
      const { unmount } = makeSut({ totalItems: 3, activeIndex: 0 });
      expect(getRow().children.length).toBe(3);
      unmount();
      makeSut({ totalItems: 5, activeIndex: 2 });
      expect(getRow().children.length).toBe(5);
    });

    it("AC-002: SHOULD announce the current step via aria-label", () => {
      makeSut({ totalItems: 5, activeIndex: 1 });
      expect(screen.getByRole("img", { name: "Step 2 of 5" })).toBeDefined();
    });

    it("AC-003: SHOULD hide the dots from assistive technology and keep them out of the tab order", async () => {
      const user = userEvent.setup();
      render(
        <>
          <ProductUpdatesPaginator
            totalItems={3}
            activeIndex={0}
            data-testid={TEST_ID}
          />
          <button type="button">After</button>
        </>
      );
      getDots().forEach((dot) => {
        expect(dot.getAttribute("aria-hidden")).toBe("true");
      });
      await user.tab();
      expect(document.activeElement).toBe(
        screen.getByRole("button", { name: "After" })
      );
      expect(getRow().contains(document.activeElement)).toBe(false);
    });

    it("AC-004: SHOULD allow overriding the accessible name", () => {
      makeSut({ totalItems: 5, activeIndex: 1, "aria-label": "Paso 2 de 5" });
      expect(screen.getByRole("img", { name: "Paso 2 de 5" })).toBeDefined();
      expect(screen.queryByRole("img", { name: "Step 2 of 5" })).toBeNull();
    });

    it.each(APPEARANCES)(
      "AC-005: SHOULD size dots and gap in %s appearance",
      (appearance) => {
        makeSut({ totalItems: 3, activeIndex: 0, appearance });
        expect(styleOf(getRow())).toContain("var(--nimbus-spacing-1-5)");
        const [active, ...others] = getDots();
        expect(styleOf(active)).toContain("24px");
        [active, ...others].forEach((dot) => {
          expect(styleOf(dot)).toContain("6px");
          expect(styleOf(dot)).toContain(
            "var(--nimbus-shape-border-radius-full)"
          );
        });
        others.forEach((dot) => expect(styleOf(dot)).not.toContain("24px"));
      }
    );

    it.each([
      ["omitted", undefined],
      ["primary", "primary" as const]
    ])(
      "AC-006: SHOULD use primary colours when appearance is %s",
      (_, appearance) => {
        makeSut({ totalItems: 3, activeIndex: 1, appearance });
        const dots = getDots();
        expect(styleOf(dots[1])).toContain(ACTIVE_ITEM_COLOR.primary);
        expect(styleOf(dots[0])).toContain(INACTIVE_ITEM_COLOR.primary);
        expect(styleOf(dots[2])).toContain(INACTIVE_ITEM_COLOR.primary);
      }
    );

    it("AC-007: SHOULD use neutral colours and a wider active dot", () => {
      makeSut({ totalItems: 3, activeIndex: 1, appearance: "neutral" });
      const dots = getDots();
      expect(styleOf(dots[1])).toContain(ACTIVE_ITEM_COLOR.neutral);
      expect(styleOf(dots[1])).not.toContain(INACTIVE_ITEM_COLOR.neutral);
      [dots[0], dots[2]].forEach((dot) => {
        expect(styleOf(dot)).toContain(INACTIVE_ITEM_COLOR.neutral);
        expect(styleOf(dot)).not.toContain(ACTIVE_ITEM_COLOR.neutral);
        expect(isWide(dot)).toBe(false);
      });
      expect(isWide(dots[1])).toBe(true);
    });

    it.each(APPEARANCES)(
      "AC-016: SHOULD handle boundary values in %s appearance",
      (appearance) => {
        const cases: [number, number, number, number[]][] = [
          [0, 0, 0, []],
          [1, 0, 1, [0]],
          [3, -1, 3, []],
          [3, 3, 3, []]
        ];
        cases.forEach(([totalItems, activeIndex, dotCount, active]) => {
          const { unmount } = makeSut({ totalItems, activeIndex, appearance });
          const dots = getDots();
          expect(dots).toHaveLength(dotCount);
          expect(activeIndexOf(dots)).toEqual(active);
          unmount();
        });
      }
    );

    it.each(APPEARANCES)(
      "AC-017: SHOULD NOT create a live region in %s appearance",
      (appearance) => {
        const { container, rerender } = makeSut({
          totalItems: 4,
          activeIndex: 0,
          appearance
        });
        rerender(
          <ProductUpdatesPaginator
            totalItems={4}
            activeIndex={2}
            appearance={appearance}
            data-testid={TEST_ID}
          />
        );
        expect(container.querySelector("[aria-live]")).toBeNull();
        expect(
          container.querySelector("[role='status'], [role='alert']")
        ).toBeNull();
        expect(activeIndexOf(getDots())).toEqual([2]);
      }
    );

    it("AC-018: SHOULD pass id and data attributes to the row and reject className, style and color", () => {
      render(
        <ProductUpdatesPaginator
          totalItems={2}
          activeIndex={0}
          id="row-id"
          data-testid="row"
        />
      );
      render(
        <ProductUpdatesPaginator
          totalItems={2}
          activeIndex={0}
          // @ts-expect-error className is not accepted
          className="custom"
        />
      );
      render(
        <ProductUpdatesPaginator
          totalItems={2}
          activeIndex={0}
          // @ts-expect-error style is not accepted
          style={{ color: "red" }}
        />
      );
      render(
        <ProductUpdatesPaginator
          totalItems={2}
          activeIndex={0}
          // @ts-expect-error color is not accepted
          color="red"
        />
      );
      const row = screen.getByTestId("row");
      expect(row.getAttribute("id")).toBe("row-id");
      expect(row.getAttribute("role")).toBe("img");
    });

    it("AC-019: SHOULD keep image semantics, gap and neutral colours in neutral appearance", () => {
      makeSut({
        totalItems: 4,
        activeIndex: 1,
        appearance: "neutral",
        "aria-label": "Plan 2 de 4"
      });
      const row = screen.getByRole("img", { name: "Plan 2 de 4" });
      expect(row).toBe(getRow());
      expect(styleOf(row)).toContain("var(--nimbus-spacing-1-5)");
      const dots = getDots(row);
      expect(dots).toHaveLength(4);
      dots.forEach((dot, index) => {
        expect(dot.getAttribute("aria-hidden")).toBe("true");
        expect(styleOf(dot)).toContain(
          index === 1 ? ACTIVE_ITEM_COLOR.neutral : INACTIVE_ITEM_COLOR.neutral
        );
      });
    });

    it("AC-020: SHOULD keep instances independent", () => {
      const { rerender } = render(
        <>
          <ProductUpdatesPaginator
            totalItems={4}
            activeIndex={0}
            appearance="primary"
            data-testid="first"
          />
          <ProductUpdatesPaginator
            totalItems={4}
            activeIndex={1}
            appearance="neutral"
            aria-label="Plan 2 de 4"
            data-testid="second"
          />
        </>
      );
      const secondBefore = styleOf(screen.getByTestId("second").children[1]);
      rerender(
        <>
          <ProductUpdatesPaginator
            totalItems={4}
            activeIndex={3}
            appearance="primary"
            data-testid="first"
          />
          <ProductUpdatesPaginator
            totalItems={4}
            activeIndex={1}
            appearance="neutral"
            aria-label="Plan 2 de 4"
            data-testid="second"
          />
        </>
      );
      const first = getDots(screen.getByTestId("first"));
      const second = getDots(screen.getByTestId("second"));
      expect(activeIndexOf(first)).toEqual([3]);
      expect(activeIndexOf(second)).toEqual([1]);
      expect(styleOf(second[1])).toBe(secondBefore);
      expect(styleOf(second[1])).toContain(ACTIVE_ITEM_COLOR.neutral);
      expect(screen.getByRole("img", { name: "Plan 2 de 4" })).toBe(
        screen.getByTestId("second")
      );
    });

    it.each(APPEARANCES)(
      "AC-021: SHOULD NOT respond to activation in %s appearance",
      async (appearance) => {
        const user = userEvent.setup();
        const onContainerClick = jest.fn();
        render(
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div onClick={onContainerClick}>
            <ProductUpdatesPaginator
              totalItems={4}
              activeIndex={0}
              appearance={appearance}
              data-testid={TEST_ID}
            />
          </div>
        );
        const before = getDots().map(styleOf);
        const dot = getDots()[2];
        await user.click(dot);
        const fired = fireEvent.click(dot);
        expect(fired).toBe(true);
        expect(onContainerClick).toHaveBeenCalledTimes(2);
        onContainerClick.mock.calls.forEach(([event]) => {
          expect(event.defaultPrevented).toBe(false);
        });
        expect(getDots().map(styleOf)).toEqual(before);
        expect(getRow().contains(document.activeElement)).toBe(false);
      }
    );
  });
});
