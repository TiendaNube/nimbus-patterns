import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { NavTabsItem } from "./NavTabsItem";
import { NavTabsItemProps } from "./navTabsItem.types";

const iconElement = "Icon element";
const mockedClickFunction = jest.fn();

const makeSut = (
  rest: Omit<NavTabsItemProps, "icon" | "onClick" | "ariaLabel">
) => {
  render(
    <NavTabsItem
      {...rest}
      icon={iconElement}
      data-testid="nav-tabs-item-element"
      onClick={mockedClickFunction}
      ariaLabel="nav-tabs-item"
    />
  );
};

describe("GIVEN <NavTabsItem />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the icon element correctly", () => {
      makeSut({});
      expect(screen.getByText(iconElement)).toBeDefined();
    });

    it("SHOULD render the aria label correctly", () => {
      makeSut({});
      const button = screen.getByRole("button");
      expect(button.getAttribute("aria-label")).toBe("nav-tabs-item");
    });

    it("SHOULD execute the onClick correctly", () => {
      makeSut({});
      const buttonClick = screen.getByRole<HTMLButtonElement>("button");
      fireEvent.click(buttonClick);
      expect(mockedClickFunction).toHaveBeenCalled();
    });

    it("renders active badge with ai-generative appearance", () => {
      makeSut({ active: true, badge: true, appearance: "ai-generative" });

      const button = screen.getByRole("button");
      expect(button.className).toContain("background");

      const badge = button.querySelector('[class*="position-absolute"]');
      expect(badge).toBeInTheDocument();
    });

    it("applies ai-generative appearance when specified", () => {
      makeSut({ appearance: "ai-generative" });

      const button = screen.getByRole("button");
      expect(button.className).toContain("background");
      expect(button.className).toContain("borderColor");
      expect(button.className).toContain("borderWidth");
    });
  });
});
