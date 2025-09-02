import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { MenuExpandContext } from "@common/contexts";
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

    it("SHOULD render collapsed correctly reading from the context", () => {
      render(
        <MenuExpandContext.Provider value={{ expanded: false }}>
          <MenuButton label={labelText} data-testid="button-element" />
        </MenuExpandContext.Provider>
      );
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();

      // When collapsed, text should not be rendered
      expect(screen.queryByText(labelText)).toBeNull();
    });

    it("SHOULD render expanded correctly reading from the context", () => {
      render(
        <MenuExpandContext.Provider value={{ expanded: true }}>
          <MenuButton label={labelText} data-testid="button-element" />
        </MenuExpandContext.Provider>
      );
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();

      // When expanded, text should be rendered
      expect(screen.getByText(labelText)).toBeDefined();
    });

    it("SHOULD render expanded correctly reading from the prop", () => {
      makeSut({ expanded: true });
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();

      // When expanded, text should be rendered
      expect(screen.getByText(labelText)).toBeDefined();
    });

    it("SHOULD render collapsed correctly reading from the prop", () => {
      makeSut({ expanded: false });
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();

      // When collapsed, text should not be rendered
      expect(screen.queryByText(labelText)).toBeNull();
    });
  });
});
