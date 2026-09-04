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

  // Issue #185 validation amendment — "Bullet icon color treatment": enabled
  // bullet icons use `primary-interactive` (blue), not the legacy
  // `success-interactive` (green); disabled icons keep the approved neutral
  // unavailable treatment; enabled bullet text stays `neutral-textLow`.
  describe("AC-05: bullet icon color treatment", () => {
    it("SHOULD render the icon with primary-interactive color when enabled (disabled omitted)", () => {
      makeSut({ icon, children: "Unlimited products" });

      const iconWrapper = screen.getByTestId("icon-id").closest("span");
      expect(iconWrapper?.className).toContain("color-primary-interactive");
      expect(iconWrapper?.className).not.toContain("color-success-interactive");
    });

    it("SHOULD render the icon with primary-interactive color when disabled is explicitly false", () => {
      makeSut({ icon, disabled: false, children: "Unlimited products" });

      const iconWrapper = screen.getByTestId("icon-id").closest("span");
      expect(iconWrapper?.className).toContain("color-primary-interactive");
      expect(iconWrapper?.className).not.toContain("color-success-interactive");
    });

    it("SHOULD render the icon with the neutral unavailable color when disabled is true", () => {
      makeSut({
        icon,
        disabled: true,
        unavailableLabel: "Not included",
        children: "Priority support",
      });

      const iconWrapper = screen.getByTestId("icon-id").closest("span");
      expect(iconWrapper?.className).toContain("color-neutral-interactive");
      expect(iconWrapper?.className).not.toContain("color-primary-interactive");
      expect(iconWrapper?.className).not.toContain("color-success-interactive");
    });

    it("SHOULD keep the enabled bullet text color as neutral-textLow (unaffected by the icon color change)", () => {
      makeSut({ icon, children: "Unlimited products" });

      const text = screen.getByText("Unlimited products");
      expect(text.className).toContain("color-neutral-textLow");
    });

    it("SHOULD apply the same enabled/disabled color treatment to a custom consumer-supplied icon", () => {
      const customIcon = (
        <svg data-testid="custom-icon-id" aria-hidden="true">
          <circle />
        </svg>
      );

      const { unmount } = render(
        <PlanDisplayBullet icon={customIcon}>
          Custom icon feature
        </PlanDisplayBullet>
      );
      const enabledWrapper = screen
        .getByTestId("custom-icon-id")
        .closest("span");
      expect(enabledWrapper?.className).toContain("color-primary-interactive");
      unmount();

      render(
        <PlanDisplayBullet
          icon={customIcon}
          disabled
          unavailableLabel="Not included"
        >
          Custom icon feature
        </PlanDisplayBullet>
      );
      const disabledWrapper = screen
        .getByTestId("custom-icon-id")
        .closest("span");
      expect(disabledWrapper?.className).toContain("color-neutral-interactive");
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

  // Issue #185 validation amendment — "Bullet typography": bullet text uses
  // fontWeight="regular" in both the enabled and disabled states.
  describe("AC-05: bullet typography", () => {
    it('SHOULD render the text with fontWeight="regular" when enabled', () => {
      makeSut({ icon, children: "Unlimited products" });

      const text = screen.getByText("Unlimited products");
      expect(text.className).toContain("fontWeight-regular");
      expect(text.className).not.toContain("fontWeight-medium");
    });

    it('SHOULD render the text with fontWeight="regular" when disabled', () => {
      makeSut({
        icon,
        disabled: true,
        unavailableLabel: "Not included",
        children: "Priority support",
      });

      const text = screen.getByText("Priority support");
      expect(text.className).toContain("fontWeight-regular");
      expect(text.className).not.toContain("fontWeight-medium");
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
