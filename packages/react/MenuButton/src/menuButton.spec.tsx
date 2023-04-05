import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { MenuButton, MenuButtonProps } from "./MenuButton";

const labelText = "Button label";
const mockedClickFunction = jest.fn();

const makeSut = (rest: Omit<MenuButtonProps, "label">) => {
  render(
    <MenuButton {...rest} label={labelText} data-testid="button-element" />
  );
};

describe("GIVEN <MenuButton />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render label text correctly", () => {
      makeSut({});
      expect(screen.getByText(labelText)).toBeDefined();
    });

    it("SHOULD render children correctly", () => {
      makeSut({ children: "My children" });
      expect(screen.getByText("My children")).toBeDefined();
    });

    it("SHOULD execute the onClick correctly", () => {
      makeSut({ onClick: mockedClickFunction });
      const buttonClick = screen.getByRole<HTMLButtonElement>("button");
      fireEvent.click(buttonClick);
      expect(mockedClickFunction).toHaveBeenCalled();
    });
  });
});
