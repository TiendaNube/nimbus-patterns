import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { MenuExpandContext } from "@common/contexts";
import { noop } from "@common/utils";
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
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} data-testid="button-element" />
        </MenuExpandContext.Provider>
      );
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();

      // When collapsed, text should not be rendered
      expect(screen.queryByText(labelText)).toBeNull();
    });

    it("SHOULD render expanded correctly reading from the context", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: true,
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
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

  describe("WHEN collapsed with popover configuration", () => {
    it("SHOULD wrap button with popover when collapsed and showPopoversWhenCollapsed is true", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            showPopoversWhenCollapsed: true,
            popoverPosition: "right",
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} />
        </MenuExpandContext.Provider>
      );

      const popoverContainer = screen.getByTestId("popover-container");
      expect(popoverContainer).toBeDefined();
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
    });

    it("SHOULD not wrap button with popover when showPopoversWhenCollapsed is false", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            showPopoversWhenCollapsed: false,
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} />
        </MenuExpandContext.Provider>
      );

      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
      expect(screen.queryByTestId("popover-container")).toBeNull();
      expect(screen.queryByText(labelText)).toBeNull();
    });

    it("SHOULD not show popover when button is expanded", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: true,
            showPopoversWhenCollapsed: true,
            popoverPosition: "right",
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} />
        </MenuExpandContext.Provider>
      );

      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
      expect(screen.queryByTestId("popover-container")).toBeNull();
    });
  });

  describe("WHEN popover onVisibility callback logic", () => {
    const createOnVisibilityCallback =
      (menuButtonId: string, setActiveAccordionPopover: jest.Mock) =>
      (visible: boolean) => {
        setActiveAccordionPopover((prev: string | null) => {
          if (visible) {
            return menuButtonId;
          }
          return prev === menuButtonId ? null : prev;
        });
      };

    it("SHOULD set activeAccordionPopover to menuButtonId when visible becomes true", () => {
      const menuButtonId = ":r1:";
      const setActiveAccordionPopover = jest.fn();
      const onVisibilityCallback = createOnVisibilityCallback(
        menuButtonId,
        setActiveAccordionPopover
      );

      onVisibilityCallback(true);

      expect(setActiveAccordionPopover).toHaveBeenCalledTimes(1);
      const updaterFunction = setActiveAccordionPopover.mock.calls[0][0];
      const result = updaterFunction(null);
      expect(result).toBe(menuButtonId);
    });

    it("SHOULD clear activeAccordionPopover when visible becomes false and ID matches", () => {
      const menuButtonId = ":r1:";
      const setActiveAccordionPopover = jest.fn();
      const onVisibilityCallback = createOnVisibilityCallback(
        menuButtonId,
        setActiveAccordionPopover
      );

      onVisibilityCallback(false);

      expect(setActiveAccordionPopover).toHaveBeenCalledTimes(1);
      const updaterFunction = setActiveAccordionPopover.mock.calls[0][0];
      const resultWhenMatches = updaterFunction(menuButtonId);
      expect(resultWhenMatches).toBeNull();
    });

    it("SHOULD preserve activeAccordionPopover when visible becomes false and ID does not match", () => {
      const menuButtonId = ":r1:";
      const differentId = ":r2:";
      const setActiveAccordionPopover = jest.fn();
      const onVisibilityCallback = createOnVisibilityCallback(
        menuButtonId,
        setActiveAccordionPopover
      );

      onVisibilityCallback(false);

      expect(setActiveAccordionPopover).toHaveBeenCalledTimes(1);
      const updaterFunction = setActiveAccordionPopover.mock.calls[0][0];
      const resultWhenDoesNotMatch = updaterFunction(differentId);
      expect(resultWhenDoesNotMatch).toBe(differentId);
    });
  });
});
