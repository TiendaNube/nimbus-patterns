import React from "react";
import { render, screen } from "@testing-library/react";

import { PlanDisplayBullet } from "./PlanDisplayBullet";
import { PlanDisplayBulletProps } from "./planDisplayBullet.types";

const icon = <div data-testid="icon-id">Icon</div>;

const makeSut = (rest: PlanDisplayBulletProps) => {
  render(<PlanDisplayBullet {...rest} />);
};

describe("GIVEN <PlanDisplayBullet />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({
        icon,
        disabled: false,
        children: "Plan display bullet",
      });

      expect(screen.getByText("Plan display bullet")).toBeDefined();
      expect(screen.getByTestId("icon-id")).toBeDefined();
    });

    it('SHOULD render disabled text color when "disabled" is true', () => {
      makeSut({
        icon,
        disabled: true,
        children: "Plan display bullet",
      });

      expect(screen.getByText("Plan display bullet")).toBeDefined();
      expect(screen.getByTestId("icon-id")).toBeDefined();
    });
  });
});
