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
        unavailableLabel: "Not included",
        children: "Plan display bullet",
      });

      expect(screen.getByText("Plan display bullet")).toBeDefined();
      expect(screen.getByTestId("icon-id")).toBeDefined();
    });
  });

  // AC-05 — Feature metadata: an optional `badge`, and a disabled feature
  // treatment with a close icon supplied by the consumer.
  describe("AC-05: feature metadata", () => {
    it("SHOULD render the badge inline after the content when provided", () => {
      makeSut({
        icon,
        badge: <div data-testid="badge-id">Upgraded</div>,
        children: "Unlimited products",
      });

      expect(screen.getByText("Unlimited products")).toBeDefined();
      expect(screen.getByTestId("badge-id")).toBeDefined();
    });

    it("SHOULD render correctly without a badge", () => {
      makeSut({ icon, children: "Unlimited products" });

      expect(screen.queryByTestId("badge-id")).toBeNull();
    });

    it("SHOULD render the consumer-supplied icon rather than an automatic close icon when disabled", () => {
      const closeIcon = <div data-testid="close-icon-id">Close</div>;
      makeSut({
        icon: closeIcon,
        disabled: true,
        unavailableLabel: "Not included",
        children: "Priority support",
      });

      expect(screen.getByTestId("close-icon-id")).toBeDefined();
    });
  });

  // AC-05 / AC-09 — the unavailable state exposes `unavailableLabel` to
  // assistive technology only; it must never be visibly rendered.
  describe("AC-05 & AC-09: accessible unavailable state", () => {
    it("SHOULD expose unavailableLabel to assistive technology without a visual footprint", () => {
      makeSut({
        icon,
        disabled: true,
        unavailableLabel: "Not included",
        children: "Priority support",
      });

      const label = screen.getByText("Not included");
      expect(label).toBeDefined();
      expect(label.style.position).toBe("absolute");
      expect(label.style.width).toBe("1px");
      expect(label.style.height).toBe("1px");
      expect(label.style.overflow).toBe("hidden");
    });

    it("SHOULD NOT render unavailableLabel when disabled is not true", () => {
      makeSut({ icon, children: "Priority support" });

      expect(screen.queryByText("Not included")).toBeNull();
    });
  });

  // Type-level check for the discriminated `disabled`/`unavailableLabel`
  // union: `disabled: true` requires `unavailableLabel`.
  describe("AC-05: disabled/unavailableLabel discriminated union", () => {
    it("SHOULD reject `disabled: true` without `unavailableLabel` at the type level", () => {
      render(
        // @ts-expect-error `unavailableLabel` is required when `disabled` is true
        <PlanDisplayBullet icon={icon} disabled>
          Priority support
        </PlanDisplayBullet>
      );

      expect(screen.getByText("Priority support")).toBeDefined();
    });

    it("SHOULD accept `disabled: true` together with `unavailableLabel`", () => {
      render(
        <PlanDisplayBullet icon={icon} disabled unavailableLabel="Not included">
          Priority support
        </PlanDisplayBullet>
      );

      expect(screen.getByText("Priority support")).toBeDefined();
    });
  });
});
