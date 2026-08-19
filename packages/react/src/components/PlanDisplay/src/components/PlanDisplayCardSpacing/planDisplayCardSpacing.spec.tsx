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

  // Issue #185 validation amendment — "Divider primitive": PlanDisplay.Spacing
  // must compose the Nimbus `Divider` component, not reproduce the line with
  // a `Box` border.
  describe("AC-02/AC-07: Divider primitive", () => {
    it("SHOULD render a Nimbus Divider (<hr>) element rather than a Box border", () => {
      const { container } = render(
        <PlanDisplayCardSpacing data-testid="plan-display-spacing" />
      );

      const wrapper = screen.getByTestId("plan-display-spacing");
      const divider = wrapper.querySelector("hr");

      expect(divider).not.toBeNull();
      expect(divider?.className).toContain("nimbus-divider");

      // Must not reproduce the separator with a Box border on the wrapper
      // itself.
      expect(wrapper.getAttribute("style") ?? "").not.toContain(
        "border-top-width"
      );
      expect(container.querySelectorAll("hr")).toHaveLength(1);
    });
  });
});
