import React from "react";
import { render, screen } from "@testing-library/react";
import { Box } from "@nimbus-ds/components";

import { PlanDisplayCard } from "./PlanDisplayCard";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

jest.mock("@nimbus-ds/components", () => {
  const components = jest.requireActual("@nimbus-ds/components");
  const react = jest.requireActual("react");

  return {
    ...components,
    Box: jest.fn((props) => react.createElement(components.Box, props)),
  };
});

const bodyChildren = <div>Body content</div>;

// The gradient is a fixed CSS value, so asserting on the rendered markup is the only way to
// tell the gradient variant apart from the default surface.
const GRADIENT_FRAGMENT = "linear-gradient(194.55deg";

const renderSut = (rest: Omit<PlanDisplayCardProps, "children">) =>
  render(<PlanDisplayCard {...rest}>{bodyChildren}</PlanDisplayCard>);

const makeSut = (rest: Omit<PlanDisplayCardProps, "children">) => {
  renderSut(rest);
};

const getBoxProps = () => jest.mocked(Box).mock.calls.map(([props]) => props);

describe("GIVEN <PlanDisplayCard />", () => {
  beforeEach(() => {
    jest.mocked(Box).mockClear();
  });

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

    it("SHOULD preserve the deprecated highlighted treatment", () => {
      renderSut({ highlighted: true });

      expect(getBoxProps()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            borderColor: "primary-interactive",
            borderStyle: "solid",
            borderWidth: "3",
            boxShadow: "3",
          }),
        ])
      );
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

    it("SHOULD let the new variants take precedence over deprecated highlighted", () => {
      renderSut({
        highlighted: true,
        ribbonLabel: "Más escogido",
      });
      const ribbonBoxProps = getBoxProps();

      jest.mocked(Box).mockClear();
      const { container: withGradient } = renderSut({
        highlighted: true,
        gradient: true,
      });
      const gradientBoxProps = getBoxProps();

      expect(ribbonBoxProps).toEqual(
        expect.arrayContaining([expect.objectContaining({ borderWidth: "2" })])
      );
      expect(ribbonBoxProps).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ borderWidth: "3" })])
      );
      expect(withGradient.innerHTML).toContain(GRADIENT_FRAGMENT);
      expect(gradientBoxProps).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ borderWidth: "3" })])
      );
    });
  });
});
