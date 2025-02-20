import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplayCardContent } from "./PlanDisplayCardContent";
import { PlanDisplayCardContentProps } from "./planDisplayCardContent.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<PlanDisplayCardContentProps, "children">) => {
  render(
    <PlanDisplayCardContent {...rest}>{bodyChildren}</PlanDisplayCardContent>
  );
};

describe("GIVEN <PlanDisplayCardContent />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Body content")).toBeDefined();
    });
  });
});
