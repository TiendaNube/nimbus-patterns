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
});
