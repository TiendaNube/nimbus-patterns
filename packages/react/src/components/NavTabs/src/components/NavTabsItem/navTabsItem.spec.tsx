import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { NavTabsItem } from "./NavTabsItem";
import { NavTabsItemProps } from "./navTabsItem.types";

const iconElement = "Icon element";
const mockedClickFunction = jest.fn();

const makeSut = (rest: Omit<NavTabsItemProps, "icon" | "onClick">) => {
  render(
    <NavTabsItem
      {...rest}
      icon={iconElement}
      data-testid="nav-tabs-item-element"
      onClick={mockedClickFunction}
    />
  );
};

describe("GIVEN <NavTabsItem />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the icon element correctly", () => {
      makeSut({});
      expect(screen.getByText(iconElement)).toBeDefined();
    });

    it("SHOULD execute the onClick correctly", () => {
      makeSut({});
      const buttonClick = screen.getByRole<HTMLButtonElement>("button");
      fireEvent.click(buttonClick);
      expect(mockedClickFunction).toHaveBeenCalled();
    });
  });
});
