import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplayCardFooter } from "./PlanDisplayCardFooter";
import { PlanDisplayCardFooterProperties } from "./planDisplayCardFooter.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<PlanDisplayCardFooterProperties, "children">) =>
  render(
    <PlanDisplayCardFooter {...rest}>{bodyChildren}</PlanDisplayCardFooter>
  );

describe("GIVEN <PlanDisplayCardFooter />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Body content")).toBeDefined();
    });
  });

  // AC-06 — Footer affordance: an optional `icon` alongside its content.
  describe("AC-06: footer affordance", () => {
    it("SHOULD render the icon before the footer content when provided", () => {
      makeSut({ icon: <div data-testid="footer-icon">Icon</div> });

      expect(screen.getByTestId("footer-icon")).toBeDefined();
      expect(screen.getByText("Body content")).toBeDefined();
    });

    it("SHOULD render correctly without an icon", () => {
      makeSut({});

      expect(screen.queryByTestId("footer-icon")).toBeNull();
    });
  });

  // Issue #185 validation amendment — "Divider primitive": the footer
  // separator must render the Nimbus Divider, not a custom Box border.
  describe("AC-02/AC-07: Divider primitive", () => {
    it("SHOULD render its leading separator as a Nimbus Divider (<hr>)", () => {
      const { container } = makeSut({});

      expect(container.querySelector("hr")).not.toBeNull();
    });
  });
});
