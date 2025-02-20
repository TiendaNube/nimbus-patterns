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
});
