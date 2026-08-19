import React from "react";
import { render, screen } from "@testing-library/react";

import {
  PlanDisplayCard,
  bodySurfaceOverlap,
} from "./PlanDisplayCard";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<PlanDisplayCardProps, "children">) =>
  render(<PlanDisplayCard {...rest}>{bodyChildren}</PlanDisplayCard>);

const getSurface = (container: HTMLElement) =>
  container.querySelector(
    '[data-testid="plan-display-card-surface"]'
  ) as HTMLElement;

const getRibbon = (container: HTMLElement) =>
  container.querySelector(
    '[data-testid="plan-display-card-ribbon"]'
  ) as HTMLElement;

describe("GIVEN <PlanDisplayCard />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});

      expect(screen.getByText("Body content")).toBeDefined();
    });
  });

  // AC-01 — Card hierarchy: level-2 shadow by default.
  describe("AC-01: card hierarchy", () => {
    it("SHOULD render with a level-2 shadow by default", () => {
      const { container } = makeSut({});

      const surface = getSurface(container);
      expect(surface.getAttribute("style") ?? "").toContain(
        "shadow-level-2"
      );
    });

    it("SHOULD NOT apply a border by default", () => {
      const { container } = makeSut({});

      const surface = getSurface(container);
      expect(surface.getAttribute("style") ?? "").not.toContain(
        "border-width"
      );
    });
  });

  // AC-02 — Plan emphasis: ribbonLabel / gradient, with ribbonLabel taking
  // precedence when both are supplied. The concrete visual contract below
  // (full-width ribbon, primary-interactive background, centered
  // neutral-background text, 2px primary-interactive border, suppressed
  // level-2 shadow, and full gradient suppression) is normative per the
  // issue #185 validation amendment — "ribbon visual contract" — and is
  // exercised by the canonical `planDisplay.stories.tsx` `canonicalRibbon`
  // story (AC-02, AC-07).
  describe("AC-02: plan emphasis", () => {
    it("SHOULD render the ribbonLabel when provided", () => {
      makeSut({ ribbonLabel: "Most popular" });

      expect(screen.getByText("Most popular")).toBeDefined();
    });

    it("SHOULD render correctly without a ribbonLabel or gradient", () => {
      makeSut({});

      expect(screen.getByText("Body content")).toBeDefined();
    });

    it("SHOULD render correctly with gradient alone", () => {
      const { container } = makeSut({ gradient: true });

      // The gradient background is applied directly on the card-body
      // surface itself (validation amendment — two structurally distinct
      // blocks, not a nested content wrapper inside a shared clipped
      // surface).
      const surface = getSurface(container);
      expect(surface.getAttribute("style") ?? "").toContain(
        "linear-gradient"
      );
    });

    it("SHOULD render a full-width ribbon with a primary-interactive background when ribbonLabel is provided", () => {
      const { container } = makeSut({ ribbonLabel: "Most popular" });

      const ribbon = getRibbon(container);
      const style = ribbon.getAttribute("style") ?? "";
      expect(style).toContain("100%");
      expect(style).toContain("colors-primary-interactive");
    });

    it("SHOULD center the ribbon text and render it in neutral-background color", () => {
      makeSut({ ribbonLabel: "Most popular" });

      const label = screen.getByText("Most popular");
      expect(label.className).toContain("textAlign-center");
      expect(label.className).toContain("color-neutral-background");
    });

    it("SHOULD apply a 2px primary-interactive border to the card surface when ribbonLabel is provided", () => {
      const { container } = makeSut({ ribbonLabel: "Most popular" });

      const surface = getSurface(container);
      const style = surface.getAttribute("style") ?? "";
      expect(style).toContain("border-width-2");
      expect(style).toContain("colors-primary-interactive");
    });

    it("SHOULD NOT render the default level-2 shadow when ribbonLabel is provided", () => {
      const { container } = makeSut({ ribbonLabel: "Most popular" });

      const surface = getSurface(container);
      expect(surface.getAttribute("style") ?? "").not.toContain(
        "shadow-level-2"
      );
    });

    it("SHOULD render the ribbonLabel, suppress the gradient entirely, and apply the border when both are supplied", () => {
      const { container } = render(
        <PlanDisplayCard ribbonLabel="Best value" gradient>
          {bodyChildren}
        </PlanDisplayCard>
      );

      expect(screen.getByText("Best value")).toBeDefined();

      const surface = getSurface(container);
      expect(surface.getAttribute("style") ?? "").toContain(
        "colors-primary-interactive"
      );
      expect(surface.getAttribute("style") ?? "").not.toContain(
        "linear-gradient"
      );
    });
  });

  // AC-07 — Comparison alignment: cards without a ribbonLabel reserve the
  // same, otherwise-invisible ribbon area, so comparable cards in the same
  // comparison stay aligned.
  describe("AC-07: comparison alignment", () => {
    it("SHOULD reserve the same ribbon-area height for a card without a ribbonLabel as for one with a ribbonLabel", () => {
      const { container: withoutRibbon } = makeSut({});
      const { container: withRibbon } = makeSut({
        ribbonLabel: "Most popular",
      });

      const emptyRibbon = getRibbon(withoutRibbon);
      const filledRibbon = getRibbon(withRibbon);

      // Both ribbon areas use the same fixed vertical padding (pt="0-5",
      // pb="2"), applied regardless of ribbonLabel — this is what reserves
      // an identical height whether or not a ribbon is rendered. Only the
      // background color and text visibility differ between the two.
      const paddingClasses = (el: HTMLElement) =>
        el.className
          .split(" ")
          .filter(
            (cls) => cls.includes("paddingTop") || cls.includes("paddingBottom")
          )
          .sort();

      expect(paddingClasses(emptyRibbon).length).toBeGreaterThan(0);
      expect(paddingClasses(emptyRibbon)).toEqual(paddingClasses(filledRibbon));
      expect(emptyRibbon.getAttribute("style") ?? "").not.toContain(
        "colors-primary-interactive"
      );
    });

    it("SHOULD keep the reserved ribbon area free of a background and a border when ribbonLabel is absent", () => {
      const { container } = makeSut({});

      const ribbon = getRibbon(container);
      const surface = getSurface(container);
      expect(ribbon.getAttribute("style") ?? "").not.toContain(
        "background-color"
      );
      expect(surface.getAttribute("style") ?? "").not.toContain(
        "border-width"
      );
    });

    // Canonical Plans 2.0 composition recipe (issue #185 validation
    // amendment): "cards without footer content preserve comparison
    // alignment through the card layout — do not add empty footer content
    // solely to force alignment." The equal-height sizing (height="100%")
    // is applied unconditionally on the card's outer wrapper, independent
    // of whether the card's children include a PlanDisplay.Footer, so a
    // card that omits its Footer entirely still stretches to match a
    // sibling card that renders one.
    it("SHOULD apply the same equal-height sizing whether or not the card's children include a Footer", () => {
      const withoutFooter = render(
        <PlanDisplayCard>
          <div>Card without a footer</div>
        </PlanDisplayCard>
      );
      const withFooter = render(
        <PlanDisplayCard>
          <div>Card with a footer</div>
          <div>Supporting offer</div>
        </PlanDisplayCard>
      );

      const outerWrapper = (container: HTMLElement) =>
        container.firstElementChild as HTMLElement;

      const withoutFooterStyle =
        outerWrapper(withoutFooter.container).getAttribute("style") ?? "";
      const withFooterStyle =
        outerWrapper(withFooter.container).getAttribute("style") ?? "";

      expect(withoutFooterStyle).toContain("100%");
      expect(withFooterStyle).toContain("100%");
    });
  });

  // Issue #185 validation amendment — "Card structure, divider, and bullet
  // typography refinements": the ribbon-reservation region and the
  // card-body surface are two structurally distinct blocks, not one shared,
  // clipped wrapper — the reservation region must never render as padding
  // inside the default card-body surface, in either state.
  describe("AC-02/AC-07: card structural block model", () => {
    it("SHOULD render the ribbon-reservation region outside the card-body surface, in both the ribbon-present and ribbon-absent states", () => {
      const { container: withoutRibbon } = makeSut({});
      const { container: withRibbon } = makeSut({
        ribbonLabel: "Most popular",
      });

      [withoutRibbon, withRibbon].forEach((container) => {
        const surface = getSurface(container);
        const ribbon = getRibbon(container);

        // The reservation region is never a descendant of the card-body
        // surface — it is a preceding sibling block, not padding nested
        // inside it.
        expect(surface.querySelector('[data-testid="plan-display-card-ribbon"]')).toBeNull();
        expect(surface.contains(ribbon)).toBe(false);
      });
    });

    it("SHOULD apply the shared top-corner radius token to the ribbon-reservation region", () => {
      const { container } = makeSut({ ribbonLabel: "Most popular" });

      const ribbonWrapper = getRibbon(container).parentElement as HTMLElement;
      const style = ribbonWrapper.getAttribute("style") ?? "";

      expect(style).toContain("border-top-left-radius");
      expect(style).toContain("border-top-right-radius");
      expect(style).toContain("--nimbus-shape-border-radius-2");
    });

    it("SHOULD apply the negative spacing-2 overlap between the ribbon-reservation region and the card-body surface", () => {
      // jsdom's CSS parser does not evaluate `calc()` for margin
      // properties, so a rendered element's `style` attribute cannot be
      // used to assert this under jsdom even though the CSS is valid and
      // correctly applied in a real browser (see PlanDisplayCard.tsx).
      // Assert directly against the exact token expression the component
      // wires onto the card-body surface's wrapper instead.
      expect(bodySurfaceOverlap).toContain("--nimbus-spacing-2");
      expect(bodySurfaceOverlap).toContain("-1");

      const { container } = makeSut({ ribbonLabel: "Most popular" });
      const surfaceWrapper = getSurface(container)
        .parentElement as HTMLElement;

      // Structural sanity: the card-body surface is wrapped in its own
      // element distinct from the ribbon-reservation region, which is what
      // the overlap is applied to.
      expect(surfaceWrapper).not.toBeNull();
      expect(surfaceWrapper.contains(getRibbon(container))).toBe(false);
    });
  });
});
