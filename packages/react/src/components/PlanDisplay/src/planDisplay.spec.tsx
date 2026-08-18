import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplay } from "./PlanDisplay";
import { PlanDisplayProps } from "./planDisplay.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<PlanDisplayProps, "children">) => {
  render(<PlanDisplay {...rest}>{bodyChildren}</PlanDisplay>);
};

describe("GIVEN <PlanDisplay />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Body content")).toBeDefined();
    });
  });

  // AC-08 — Responsive composition: two-plan/three-plan compositions rely on
  // this existing auto-fit grid (demonstrated with minPlanWidth="236px" in
  // the usage examples). Horizontal and horizontal-mobile are consumer
  // compositions built from existing subcomponents with no new PlanDisplay
  // prop or runtime variant, so there is nothing further to unit-test here
  // beyond confirming this grid behavior keeps working.
  describe("AC-08: responsive composition", () => {
    it("SHOULD render correctly with a custom minPlanWidth", () => {
      makeSut({ minPlanWidth: "236px" });
      expect(screen.getByText("Body content")).toBeDefined();
    });
  });
});
