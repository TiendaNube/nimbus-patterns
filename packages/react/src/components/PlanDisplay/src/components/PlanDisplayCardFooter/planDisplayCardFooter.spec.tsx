import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplayCardFooter } from "./PlanDisplayCardFooter";
import { PlanDisplayCardFooterProperties } from "./planDisplayCardFooter.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<PlanDisplayCardFooterProperties, "children">) => {
  render(
    <PlanDisplayCardFooter {...rest}>{bodyChildren}</PlanDisplayCardFooter>
  );
};

describe("GIVEN <PlanDisplayCardFooter />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Body content")).toBeDefined();
    });
  });
});
