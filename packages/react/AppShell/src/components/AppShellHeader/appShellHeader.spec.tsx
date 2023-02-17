import React from "react";
import { render, screen } from "@testing-library/react";

import { AppShellHeader } from "./AppShellHeader";
import { AppShellHeaderProps } from "./appShellHeader.types";

const leftSlotContent = "Left slot content";
const rightSlotContent = "Right slot content";

const makeSut = (rest: AppShellHeaderProps) => {
  render(<AppShellHeader {...rest} data-testid="app-shell-header-element" />);
};

describe("GIVEN <AppShellHeader />", () => {
  describe("WHEN rendered", () => {
    it("THEAN should render left slot content correctly", () => {
      makeSut({ leftSlot: leftSlotContent });
      expect(screen.getByText(leftSlotContent)).toBeDefined();
    });

    it("AND should render right slot content correctly", () => {
      makeSut({ rightSlot: rightSlotContent });
      expect(screen.getByText(rightSlotContent)).toBeDefined();
    });
  });
});
