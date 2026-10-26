import React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as stories from "../../planDisplay.stories";
import { MobilePlanCarousel } from "./MobilePlanCarousel";
import {
  getActiveIndex,
  getItemWidth,
  getRestPosition,
  GAP,
  GUTTER
} from "./mobilePlanCarousel.definitions";
import {
  MobilePlanCarouselPlan,
  MobilePlanCarouselProps
} from "./mobilePlanCarousel.types";

const PLAN_NAMES = ["Inicial", "Esencial", "Avanzado", "Evolución"];
const AREA_LABEL = "Planes";
const SETTLE_MS = 150;

const getPositionLabel = (index: number, total: number) =>
  `Plan ${index + 1} de ${total}`;

const makePlans = (
  names: string[] = PLAN_NAMES,
  onAction: (name: string) => void = jest.fn()
): MobilePlanCarouselPlan[] =>
  names.map((name) => ({
    name,
    card: (
      <div>
        <button type="button" onClick={() => onAction(name)}>
          {`Elegir ${name}`}
        </button>
      </div>
    )
  }));

const makeCarousel = (props: Partial<MobilePlanCarouselProps> = {}) => (
  <MobilePlanCarousel
    scrollAreaLabel={AREA_LABEL}
    getPositionLabel={getPositionLabel}
    plans={makePlans()}
    {...props}
  />
);

// Geometry that jsdom does not compute, driven by the tests.
let areaWidth = 393;
let scrollPosition = 0;
let planCount = 4;
const resizeCallbacks: Array<(entries: [], observer: ResizeObserver) => void> =
  [];
const scrollToMock = jest.fn();

const restFor = (index: number, width = areaWidth, total = planCount) =>
  getRestPosition(index, total, width);

const getRegion = (name = AREA_LABEL) => screen.getByRole("region", { name });
const getScroller = (region: HTMLElement = getRegion()) =>
  region.firstElementChild as HTMLElement;
const getItems = (region: HTMLElement = getRegion()) =>
  within(region).getAllByRole("group");
const getDotsRow = (root: HTMLElement | Document = document) =>
  within(root as HTMLElement).getByRole("img", { name: /Plan \d+ de \d+/ });
const getLiveRegion = (root: HTMLElement) =>
  root.querySelector('[aria-live="polite"]') as HTMLElement;
const activeDotIndexes = (row: HTMLElement) =>
  Array.from(row.children).reduce<number[]>((all, dot, index) => {
    if ((dot.getAttribute("style") ?? "").includes("24px")) all.push(index);
    return all;
  }, []);

const scrollTo = (left: number, scroller: HTMLElement = getScroller()) => {
  scrollPosition = left;
  act(() => {
    fireEvent.scroll(scroller);
  });
};
const advance = (ms: number) => {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
};
const lastScrollRequest = () =>
  scrollToMock.mock.calls[scrollToMock.mock.calls.length - 1][0] as {
    left: number;
    behavior: string;
  };
const mockReducedMotion = (matches: boolean) => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  });
};

const screenLeft = (index: number, rest: number, width: number) =>
  GUTTER + index * (getItemWidth(width) + GAP) - rest;

beforeEach(() => {
  areaWidth = 393;
  scrollPosition = 0;
  planCount = 4;
  resizeCallbacks.length = 0;
  scrollToMock.mockReset();
  global.ResizeObserver = jest.fn().mockImplementation((callback) => {
    resizeCallbacks.push(callback);
    return { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
  });
  jest
    .spyOn(HTMLElement.prototype, "clientWidth", "get")
    .mockImplementation(() => areaWidth);
  jest
    .spyOn(HTMLElement.prototype, "scrollWidth", "get")
    .mockImplementation(
      () =>
        2 * GUTTER + planCount * getItemWidth(areaWidth) + (planCount - 1) * GAP
    );
  jest
    .spyOn(HTMLElement.prototype, "scrollLeft", "get")
    .mockImplementation(() => scrollPosition);
  HTMLElement.prototype.scrollTo =
    scrollToMock as unknown as HTMLElement["scrollTo"];
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
  delete (HTMLElement.prototype as { scrollTo?: unknown }).scrollTo;
  delete (window as { matchMedia?: unknown }).matchMedia;
});

describe("GIVEN the mobile plan carousel", () => {
  it("AC-011: SHOULD compose ScrollPane items, groups and neutral dots", async () => {
    const user = userEvent.setup();
    const { container } = render(makeCarousel());
    const region = getRegion();
    const scroller = getScroller(region);
    expect(scroller.className).toMatch(/scrollAreaHidden/);
    const items = getItems(region);
    expect(items).toHaveLength(4);
    items.forEach((item, index) => {
      expect(item.hasAttribute("tabindex")).toBe(false);
      expect(item.getAttribute("role")).toBe("group");
      expect(
        within(item).getByRole("button", {
          name: `Elegir ${PLAN_NAMES[index]}`
        })
      ).toBeDefined();
    });
    // Only the plan controls are buttons: no arrow controls.
    expect(screen.getAllByRole("button")).toHaveLength(4);
    await user.click(items[2]);
    expect(scrollToMock).not.toHaveBeenCalled();
    const dots = getDotsRow();
    expect(region.contains(dots)).toBe(false);
    expect(region.compareDocumentPosition(dots)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(dots.getAttribute("aria-label")).toBe("Plan 1 de 4");
    expect(dots.children).toHaveLength(4);
    const dotStyles = Array.from(dots.children).map(
      (dot) => dot.getAttribute("style") ?? ""
    );
    expect(dotStyles[0]).toContain("var(--nimbus-colors-primary-interactive)");
    dotStyles.slice(1).forEach((style) => {
      expect(style).toContain("var(--nimbus-colors-neutral-interactiveHover)");
    });
    expect(container.querySelectorAll("[tabindex='0']")).toHaveLength(1);
  });

  it.each([
    [393, 329],
    [320, 256]
  ])(
    "AC-012: SHOULD size items for a %ipx scroll area as %ipx",
    (width, expectedWidth) => {
      areaWidth = width;
      render(makeCarousel());
      expect(getItemWidth(width)).toBe(expectedWidth);
      getItems().forEach((item) => {
        expect(item.style.width).toBe(`${expectedWidth}px`);
      });
      const content = getScroller().firstElementChild as HTMLElement;
      const contentStyle = content.getAttribute("style") ?? "";
      expect(contentStyle).toContain("var(--nimbus-spacing-4)");
      expect(contentStyle).not.toContain("var(--nimbus-spacing-1)");
      expect(GUTTER).toBe(16);
      expect(GAP).toBe(16);
    }
  );

  it("AC-013 AC-014 AC-015: SHOULD rest each plan at its position for 393px and 320px", () => {
    const expected: Record<number, { rests: number[]; widths: number }> = {
      393: { rests: [0, 329, 674, 1003], widths: 329 },
      320: { rests: [0, 256, 528, 784], widths: 256 }
    };
    [393, 320].forEach((width) => {
      const { rests, widths } = expected[width];
      const left = [16, 32, 32, 48];
      rests.forEach((rest, index) => {
        expect(getRestPosition(index, 4, width)).toBe(rest);
        expect(screenLeft(index, rest, width)).toBe(left[index]);
        expect(screenLeft(index, rest, width) + widths).toBe(
          left[index] + widths
        );
      });
      // Plan 2 shows 32px at the right of plan 1.
      expect(width - screenLeft(1, rests[0], width)).toBe(
        width - (16 + widths + 16)
      );
      expect(width - screenLeft(1, rests[0], width)).toBe(32);
      // Active plans 2 and 3: both neighbours show exactly 16px.
      [1, 2].forEach((index) => {
        const rest = rests[index];
        expect(screenLeft(index - 1, rest, width) + widths).toBe(16);
        expect(width - screenLeft(index + 1, rest, width)).toBe(16);
      });
      // Plan 4: plan 3 shows 32px at the left and a 16px gutter remains.
      expect(screenLeft(2, rests[3], width) + widths).toBe(32);
      expect(width - (screenLeft(3, rests[3], width) + widths)).toBe(16);
    });
  });

  it("AC-016 AC-017: SHOULD show exactly one plan fully visible and handle two and three plans", () => {
    [320, 393, 500, 671].forEach((width) => {
      const itemWidth = getItemWidth(width);
      [2, 3, 4].forEach((total) => {
        Array.from({ length: total }, (_, rest) => rest).forEach((active) => {
          const restPosition = getRestPosition(active, total, width);
          const fullyVisible = Array.from(
            { length: total },
            (_, i) => i
          ).filter((index) => {
            const left = screenLeft(index, restPosition, width);
            return left >= 0 && left + itemWidth <= width;
          });
          expect(fullyVisible).toEqual([active]);
        });
      });
    });
    expect([0, 1, 2].map((i) => getRestPosition(i, 3, 393))).toEqual([
      0, 329, 658
    ]);
    expect([0, 1].map((i) => getRestPosition(i, 2, 393))).toEqual([0, 313]);
    // A single plan is aligned to the start.
    expect(getRestPosition(0, 1, 393)).toBe(0);
  });

  it("AC-018: SHOULD fade only the edges that have more content", () => {
    render(makeCarousel());
    const region = getRegion();
    const fades = () => ({
      left: /horizontal-left/.test(region.innerHTML),
      right: /horizontal-right/.test(region.innerHTML)
    });
    scrollTo(restFor(0));
    expect(fades()).toEqual({ left: false, right: true });
    scrollTo(restFor(1));
    expect(fades()).toEqual({ left: true, right: true });
    scrollTo(restFor(3));
    expect(fades()).toEqual({ left: true, right: false });
  });

  it("AC-021: SHOULD keep the dots in sync with the active plan", () => {
    render(makeCarousel());
    const dots = getDotsRow();
    expect(dots.children).toHaveLength(4);
    [0, 1, 2, 3].forEach((index) => {
      scrollTo(restFor(index));
      expect(activeDotIndexes(dots)).toEqual([index]);
    });
    // Keyboard then scroll.
    scrollTo(restFor(1));
    act(() => getRegion().focus());
    fireEvent.keyDown(getRegion(), { key: "ArrowRight" });
    expect(lastScrollRequest().left).toBe(restFor(2));
    scrollTo(restFor(2));
    expect(activeDotIndexes(dots)).toEqual([2]);
  });

  it("AC-021: SHOULD follow focus moving into another plan", async () => {
    const user = userEvent.setup();
    render(makeCarousel());
    await user.tab();
    await user.tab();
    await user.tab();
    scrollTo(restFor(1));
    expect(activeDotIndexes(getDotsRow())).toEqual([1]);
  });

  it("AC-023: SHOULD activate plan controls without scrolling", async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();
    render(makeCarousel({ plans: makePlans(PLAN_NAMES, onAction) }));
    scrollTo(restFor(1));
    const active = screen.getByRole("button", { name: "Elegir Esencial" });
    const peeking = screen.getByRole("button", { name: "Elegir Avanzado" });
    await user.click(active);
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenLastCalledWith("Esencial");
    await user.click(peeking);
    expect(onAction).toHaveBeenCalledTimes(2);
    expect(onAction).toHaveBeenLastCalledWith("Avanzado");
    expect(scrollToMock).not.toHaveBeenCalled();

    onAction.mockClear();
    [active, peeking].forEach((button) => {
      act(() => button.focus());
    });
    scrollToMock.mockClear();
    const names = ["Avanzado", "Avanzado", "Esencial", "Esencial"];
    const keys = ["{Enter}", " ", "{Enter}", " "];
    await names.reduce(async (previous, name, index) => {
      await previous;
      act(() => screen.getByRole("button", { name: `Elegir ${name}` }).focus());
      scrollToMock.mockClear();
      await user.keyboard(keys[index]);
    }, Promise.resolve());
    expect(onAction.mock.calls.map(([name]) => name)).toEqual(names);
    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("AC-027: SHOULD provide the Default, Mobile and Responsive stories", () => {
    expect(Object.keys(stories)).toEqual(
      expect.arrayContaining(["Default", "Mobile", "Responsive"])
    );
  });

  it("AC-028: SHOULD expose each plan as a group named for the plan", () => {
    render(makeCarousel());
    const groups = getItems();
    expect(groups.map((group) => group.getAttribute("aria-label"))).toEqual(
      PLAN_NAMES
    );
    PLAN_NAMES.forEach((name) => {
      expect(screen.getByRole("group", { name })).toBeDefined();
      expect(screen.queryByRole("button", { name })).toBeNull();
    });
  });

  it("AC-029: SHOULD traverse the scroll area, plan controls and following content", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Before</button>
        {makeCarousel()}
        <button type="button">After</button>
      </>
    );
    const expectedOrder = [
      "Before",
      AREA_LABEL,
      ...PLAN_NAMES.map((name) => `Elegir ${name}`),
      "After"
    ];
    const label = (element: Element | null) =>
      element?.getAttribute("aria-label") ?? element?.textContent ?? "";
    const forward: string[] = [];
    await expectedOrder.reduce(async (previous) => {
      await previous;
      await user.tab();
      forward.push(label(document.activeElement));
      expect(getDotsRow().contains(document.activeElement)).toBe(false);
    }, Promise.resolve());
    expect(forward).toEqual(expectedOrder);

    const backward: string[] = [];
    await expectedOrder.slice(1).reduce(async (previous) => {
      await previous;
      await user.tab({ shift: true });
      backward.push(label(document.activeElement));
      expect(getDotsRow().contains(document.activeElement)).toBe(false);
    }, Promise.resolve());
    expect(backward).toEqual([...expectedOrder].reverse().slice(1));
  });

  it("AC-030: SHOULD show no arrows or scrollbar and ignore mouse drag", () => {
    render(makeCarousel());
    const scroller = getScroller();
    expect(scroller.className).toMatch(/scrollAreaHidden/);
    expect(screen.getAllByRole("button")).toHaveLength(4);
    fireEvent.mouseDown(scroller, { clientX: 300 });
    fireEvent.mouseMove(scroller, { clientX: 100 });
    fireEvent.mouseUp(scroller, { clientX: 100 });
    expect(scrollToMock).not.toHaveBeenCalled();
    expect(scroller.scrollLeft).toBe(0);
  });

  it("AC-032: SHOULD bring a plan into view when focus moves into it", async () => {
    const user = userEvent.setup();
    render(makeCarousel());
    await user.tab();
    await user.tab();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Elegir Inicial" })
    );
    expect(scrollToMock).not.toHaveBeenCalled();
    await user.tab();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Elegir Esencial" })
    );
    expect(lastScrollRequest().left).toBe(restFor(1));
    scrollTo(restFor(1));
    expect(activeDotIndexes(getDotsRow())).toEqual([1]);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Elegir Inicial" })
    );
    expect(lastScrollRequest().left).toBe(0);
    scrollTo(0);
    expect(activeDotIndexes(getDotsRow())).toEqual([0]);
  });

  it("AC-034: SHOULD keep the active plan when the scroll area is resized", () => {
    render(makeCarousel());
    scrollTo(restFor(2));
    expect(activeDotIndexes(getDotsRow())).toEqual([2]);
    areaWidth = 320;
    scrollToMock.mockClear();
    act(() => {
      resizeCallbacks.forEach((callback) => callback([], {} as ResizeObserver));
    });
    expect(lastScrollRequest()).toEqual(
      expect.objectContaining({ left: 528, behavior: "instant" })
    );
    expect(activeDotIndexes(getDotsRow())).toEqual([2]);
    scrollTo(528);
    expect(activeDotIndexes(getDotsRow())).toEqual([2]);
    getItems().forEach((item) => expect(item.style.width).toBe("256px"));
  });

  it("AC-035: SHOULD switch the active plan only after the midpoint", () => {
    render(makeCarousel());
    const dots = getDotsRow();
    expect(activeDotIndexes(dots)).toEqual([0]);
    [0, 164, 164.5].forEach((left) => {
      scrollTo(left);
      expect(activeDotIndexes(dots)).toEqual([0]);
    });
    scrollTo(165);
    expect(activeDotIndexes(dots)).toEqual([1]);
    expect(getActiveIndex(164.5, 4, 393)).toBe(0);
    expect(getActiveIndex(165, 4, 393)).toBe(1);
  });

  it("AC-040: SHOULD expose the dots as one image named by the position label", () => {
    render(makeCarousel());
    scrollTo(restFor(1));
    const dots = screen.getByRole("img", { name: "Plan 2 de 4" });
    expect(screen.getAllByRole("img")).toHaveLength(1);
    Array.from(dots.children).forEach((dot) => {
      expect(dot.getAttribute("aria-hidden")).toBe("true");
    });
    expect(dots.querySelectorAll("[tabindex]")).toHaveLength(0);
    scrollTo(restFor(2));
    expect(screen.getByRole("img", { name: "Plan 3 de 4" })).toBe(dots);
    expect(screen.queryByRole("img", { name: "Plan 2 de 4" })).toBeNull();
  });

  it("AC-041: SHOULD announce only the settled plan, once", () => {
    jest.useFakeTimers();
    const { container } = render(makeCarousel());
    const live = getLiveRegion(container);
    expect(live.textContent).toBe("");
    [1, 2, 3].forEach((index) => {
      scrollTo(restFor(index));
      advance(SETTLE_MS - 50);
      expect(live.textContent).toBe("");
    });
    advance(SETTLE_MS);
    expect(live.textContent).toBe("Plan 4 de 4");
    advance(2000);
    expect(live.textContent).toBe("Plan 4 de 4");
    scrollTo(restFor(2));
    expect(live.textContent).toBe("Plan 4 de 4");
    advance(SETTLE_MS);
    expect(live.textContent).toBe("Plan 3 de 4");
    expect(live.getAttribute("aria-atomic")).toBe("true");
  });

  it.each([
    [4, true],
    [1, false]
  ])(
    "AC-042: SHOULD make the scroll area a labelled region and the first tab stop with %i plans",
    async (count) => {
      planCount = count;
      const user = userEvent.setup();
      render(makeCarousel({ plans: makePlans(PLAN_NAMES.slice(0, count)) }));
      const region = getRegion();
      expect(region.getAttribute("tabindex")).toBe("0");
      await user.tab();
      expect(document.activeElement).toBe(region);
    }
  );

  it.each([
    [false, "smooth"],
    [true, "instant"]
  ])(
    "AC-043: SHOULD move one plan per arrow key (reduced motion %s)",
    (reduced, behavior) => {
      mockReducedMotion(reduced);
      const onKeyDown = jest.fn();
      render(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onKeyDown={onKeyDown}>{makeCarousel()}</div>
      );
      const region = getRegion();
      scrollTo(restFor(1));
      act(() => region.focus());
      const steps: [string, number][] = [
        ["ArrowRight", restFor(2)],
        ["ArrowLeft", restFor(1)],
        ["ArrowLeft", restFor(0)]
      ];
      steps.forEach(([key, left], index) => {
        const notPrevented = fireEvent.keyDown(region, { key });
        expect(notPrevented).toBe(false);
        expect(lastScrollRequest()).toEqual({ left, behavior });
        expect(onKeyDown).toHaveBeenCalledTimes(index + 1);
        expect(document.activeElement).toBe(region);
      });
    }
  );

  it("AC-044: SHOULD ignore keys at the limits and arrow keys from inner controls", () => {
    render(makeCarousel());
    const region = getRegion();
    act(() => region.focus());
    expect(fireEvent.keyDown(region, { key: "ArrowLeft" })).toBe(true);
    scrollTo(restFor(3));
    expect(fireEvent.keyDown(region, { key: "ArrowRight" })).toBe(true);
    scrollTo(restFor(1));
    expect(fireEvent.keyDown(region, { key: "ArrowUp" })).toBe(true);
    expect(fireEvent.keyDown(region, { key: "ArrowDown" })).toBe(true);
    expect(scrollToMock).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(region);

    const button = screen.getByRole("button", { name: "Elegir Esencial" });
    act(() => button.focus());
    scrollToMock.mockClear();
    expect(fireEvent.keyDown(button, { key: "ArrowRight" })).toBe(true);
    expect(scrollToMock).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(button);
  });

  it("AC-045: SHOULD keep carousels independent", () => {
    jest.useFakeTimers();
    const { container } = render(
      <>
        {makeCarousel({ scrollAreaLabel: "Planes A" })}
        {makeCarousel({ scrollAreaLabel: "Planes B" })}
      </>
    );
    const [first, second] = Array.from(container.children) as HTMLElement[];
    const firstScroller = getScroller(getRegion("Planes A"));
    const secondScroller = getScroller(getRegion("Planes B"));
    scrollTo(restFor(1), firstScroller);
    act(() => getRegion("Planes A").focus());
    fireEvent.keyDown(getRegion("Planes A"), { key: "ArrowRight" });
    advance(SETTLE_MS);
    expect(activeDotIndexes(getDotsRow(first))).toEqual([1]);
    expect(getLiveRegion(first).textContent).toBe("Plan 2 de 4");
    expect(getDotsRow(second).getAttribute("aria-label")).toBe("Plan 1 de 4");
    expect(activeDotIndexes(getDotsRow(second))).toEqual([0]);
    expect(getLiveRegion(second).textContent).toBe("");
    const contexts = scrollToMock.mock.contexts as HTMLElement[];
    expect(contexts.length).toBeGreaterThan(0);
    expect(contexts).not.toContain(secondScroller);
    expect(contexts.every((context) => context === firstScroller)).toBe(true);
  });

  it("AC-046: SHOULD rely only on existing ScrollPane inputs", () => {
    render(makeCarousel());
    const region = getRegion();
    // The scroller is reached through ScrollPane's own `scrollContainerRef`.
    expect(getScroller(region).className).toMatch(/scrollAreaHidden/);
    expect(getItems(region)).toHaveLength(4);
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  it("AC-047: SHOULD show no dots and no announcement with one plan", () => {
    jest.useFakeTimers();
    planCount = 1;
    const { container } = render(
      makeCarousel({ plans: makePlans(PLAN_NAMES.slice(0, 1)) })
    );
    expect(screen.queryByRole("img")).toBeNull();
    expect(getItems()).toHaveLength(1);
    expect(getRestPosition(0, 1, 393)).toBe(0);
    scrollTo(0);
    advance(SETTLE_MS);
    expect(getLiveRegion(container).textContent).toBe("");
    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("AC-048: SHOULD ignore clicks and taps on the dots", async () => {
    const user = userEvent.setup();
    render(makeCarousel());
    const dots = getDotsRow();
    const target = dots.children[2] as HTMLElement;
    await user.click(target);
    fireEvent.touchStart(target);
    fireEvent.touchEnd(target);
    fireEvent.click(target);
    expect(scrollToMock).not.toHaveBeenCalled();
    expect(dots.getAttribute("aria-label")).toBe("Plan 1 de 4");
    expect(activeDotIndexes(dots)).toEqual([0]);
    expect(dots.contains(document.activeElement)).toBe(false);
    expect(dots.querySelectorAll("[tabindex]")).toHaveLength(0);
  });
});
