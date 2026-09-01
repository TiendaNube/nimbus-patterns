import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplayCard } from "./PlanDisplayCard";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

const bodyChildren = <div>Body content</div>;

// The gradient is a fixed CSS value, so asserting on the rendered markup is the only way to
// tell the gradient variant apart from the default surface.
const GRADIENT_FRAGMENT = "linear-gradient(194.55deg";

const renderSut = (rest: Omit<PlanDisplayCardProps, "children">) =>
  render(<PlanDisplayCard {...rest}>{bodyChildren}</PlanDisplayCard>);

const makeSut = (rest: Omit<PlanDisplayCardProps, "children">) => {
  renderSut(rest);
};

describe("GIVEN <PlanDisplayCard />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});

      expect(screen.getByText("Body content")).toBeDefined();
    });

    it("SHOULD render the gradient variant correctly", () => {
      makeSut({ gradient: true });

      expect(screen.getByText("Body content")).toBeDefined();
    });

    it("SHOULD render the ribbon label when provided", () => {
      makeSut({ ribbonLabel: "Más escogido" });

      expect(screen.getByText("Más escogido")).toBeDefined();
      expect(screen.getByText("Body content")).toBeDefined();
    });

    it("SHOULD apply the gradient background when gradient is set", () => {
      const { container } = renderSut({ gradient: true });

      expect(container.innerHTML).toContain(GRADIENT_FRAGMENT);
    });

    // Guards the reserved ribbon space that keeps ribbon and non-ribbon cards aligned. The
    // height comes from the placeholder's line box, so it only holds while the placeholder
    // stays non-collapsible: a plain " " is dropped during white-space processing, leaving
    // the label with no line box and the card ~a text line shorter than its ribbon sibling.
    // jsdom does no layout, so the height itself cannot be asserted here — what is asserted
    // is the two properties the height depends on.
    it("SHOULD reserve the ribbon space with a non-collapsible placeholder and the same typography as a real label", () => {
      const { container: withoutRibbon } = renderSut({});
      const { container: withRibbon } = renderSut({
        ribbonLabel: "Más escogido",
      });

      const placeholder = withoutRibbon.querySelector("p") as HTMLElement;
      const label = withRibbon.querySelector("p") as HTMLElement;

      expect(placeholder.textContent).toBe("\u00A0");
      expect(placeholder.textContent).not.toBe(" ");
      // Same Text props on both branches, so the placeholder's line box matches the label's.
      expect(placeholder.className).toBe(label.className);
    });

    it("SHOULD let ribbonLabel take precedence over gradient when both are provided", () => {
      const { container } = renderSut({
        ribbonLabel: "Más escogido",
        gradient: true,
      });

      expect(screen.getByText("Más escogido")).toBeDefined();
      expect(container.innerHTML).not.toContain(GRADIENT_FRAGMENT);
    });
  });
});
