import React from "react";
import { render, screen } from "@testing-library/react";

import * as packageExports from "./index";
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

  describe("WHEN inspected for a mobile arrangement", () => {
    it("AC-010: SHOULD keep the grid and expose no mobile, carousel or dots API", () => {
      makeSut({ minPlanWidth: "236px" });
      const grid = screen.getByText("Body content")
        .parentElement as HTMLElement;
      expect(grid.getAttribute("style")).toContain(
        "repeat(auto-fit, minmax(236px, 1fr))"
      );
      expect(Object.keys(packageExports).sort()).toEqual([
        "PlanDisplay",
        "default"
      ]);
      expect(
        Object.keys(PlanDisplay)
          .filter((key) => key !== "displayName")
          .sort()
      ).toEqual([
        "Bullet",
        "Card",
        "Content",
        "Footer",
        "Header",
        "Price",
        "Spacing"
      ]);
    });
  });
});
