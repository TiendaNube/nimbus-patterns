import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplayCardSpacing } from "./PlanDisplayCardSpacing";
import { PlanDisplayCardSpacingProps } from "./planDisplayCardSpacing.types";

const makeSut = (rest: Omit<PlanDisplayCardSpacingProps, "children">) => {
  render(
    <PlanDisplayCardSpacing {...rest} data-testid="plan-display-spacing" />
  );
};

describe("GIVEN <PlanDisplayCardSpacing />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});

      expect(screen.getByTestId("plan-display-spacing")).toBeDefined();
    });
  });
});
