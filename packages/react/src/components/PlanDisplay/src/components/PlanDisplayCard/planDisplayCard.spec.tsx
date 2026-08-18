import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplayCard } from "./PlanDisplayCard";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<PlanDisplayCardProps, "children">) => {
  render(<PlanDisplayCard {...rest}>{bodyChildren}</PlanDisplayCard>);
};

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
      const { container } = render(
        <PlanDisplayCard>{bodyChildren}</PlanDisplayCard>
      );

      const surface = container.firstChild
        ?.firstChild?.nextSibling as HTMLElement;
      expect(surface.getAttribute("style") ?? "").toContain(
        "shadow-level-2"
      );
    });
  });

  // AC-02 — Plan emphasis: ribbonLabel / gradient, with ribbonLabel taking
  // precedence when both are supplied.
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
      makeSut({ gradient: true });

      expect(screen.getByText("Body content")).toBeDefined();
    });

    it("SHOULD render the ribbonLabel and suppress the gradient when both are supplied", () => {
      const { container } = render(
        <PlanDisplayCard ribbonLabel="Best value" gradient>
          {bodyChildren}
        </PlanDisplayCard>
      );

      expect(screen.getByText("Best value")).toBeDefined();

      const surface = container.firstChild
        ?.firstChild?.nextSibling as HTMLElement;
      expect(surface.getAttribute("style") ?? "").not.toContain(
        "linear-gradient"
      );
    });
  });
});
