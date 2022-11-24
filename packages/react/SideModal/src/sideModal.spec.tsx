import React from "react";
import { render, screen } from "@testing-library/react";

import { SideModal } from "./SideModal";
import { SideModalProps } from "./sideModal.types";

const makeSut = (rest: SideModalProps) => {
  render(<SideModal {...rest} data-testid="callout-card-element" />);
};

describe("GIVEN <SideModal />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted title", () => {
      makeSut({
        title: "My tittle",
      });
      expect(screen.getByText("My tittle")).toBeDefined();
    });

    it("THEN should correctly render the submitted titleAction", () => {
      makeSut({
        titleAction: <div data-testid="title-action-element" />,
      });
      expect(screen.getByTestId("title-action-element")).toBeDefined();
    });

    it("THEN should correctly render the submitted headerAction", () => {
      makeSut({
        headerAction: <div data-testid="header-action-element" />,
      });
      expect(screen.getByTestId("header-action-element")).toBeDefined();
    });

    it("THEN should correctly render the submitted headerIcon", () => {
      makeSut({
        headerIcon: <svg data-testid="header-icon-element" />,
      });
      expect(screen.getByTestId("header-icon-element")).toBeDefined();
    });

    it("THEN should correctly render the submitted content", () => {
      makeSut({
        title: "My content",
      });
      expect(screen.getByText("My content")).toBeDefined();
    });

    it("THEN should correctly render the submitted footer", () => {
      makeSut({
        footer: {
          primaryAction: { children: "primary button" },
          secondaryAction: { children: "secondary button" },
        },
      });
      expect(
        screen.getByRole("button", { name: "primary button" })
      ).toBeDefined();
      expect(
        screen.getByRole("button", { name: "secondary button" })
      ).toBeDefined();
    });
  });
});
