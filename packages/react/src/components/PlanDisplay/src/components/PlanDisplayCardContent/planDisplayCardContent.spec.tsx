import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplayCardContent } from "./PlanDisplayCardContent";
import { PlanDisplayCardContentProperties } from "./planDisplayCardContent.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<PlanDisplayCardContentProperties, "children">) =>
  render(
    <PlanDisplayCardContent {...rest}>{bodyChildren}</PlanDisplayCardContent>
  );

describe("GIVEN <PlanDisplayCardContent />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Body content")).toBeDefined();
    });
  });

  // Issue #185 validation amendment — "Divider primitive": the content
  // separator must render the Nimbus Divider, not a custom Box border.
  describe("AC-02/AC-07: Divider primitive", () => {
    it("SHOULD render its leading separator as a Nimbus Divider (<hr>)", () => {
      const { container } = makeSut({});

      expect(container.querySelector("hr")).not.toBeNull();
    });
  });
});
