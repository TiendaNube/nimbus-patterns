import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { MenuExpandContext } from "@common/contexts";
import { MenuButton, MenuButtonProps } from "./MenuButton";

const labelText = "Button label";
const mockedClickFunction = jest.fn();

const noop = () => {
  // Intentionally empty - no-op function for tests
};

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

  describe("WHEN collapsed with tooltip configuration", () => {
    it("SHOULD wrap button with tooltip when collapsed and showTooltipsWhenCollapsed is true", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            showTooltipsWhenCollapsed: true,
            tooltipsPosition: "right",
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} />
        </MenuExpandContext.Provider>
      );

      const tooltipContainer = screen.getByTestId("tooltip-container");
      expect(tooltipContainer).toBeDefined();
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
    });

    it("SHOULD not wrap button with tooltip when showTooltipsWhenCollapsed is false", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            showTooltipsWhenCollapsed: false,
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} />
        </MenuExpandContext.Provider>
      );

      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
      expect(screen.queryByTestId("tooltip-container")).toBeNull();
      expect(screen.queryByText(labelText)).toBeNull();
    });

    it("SHOULD use custom tooltipText when provided", () => {
      const customTooltip = "Custom tooltip text";
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            showTooltipsWhenCollapsed: true,
            tooltipsPosition: "left",
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} tooltipText={customTooltip} />
        </MenuExpandContext.Provider>
      );

      const tooltipContainer = screen.getByTestId("tooltip-container");
      expect(tooltipContainer).toBeDefined();
    });

    it("SHOULD not show tooltip when button is expanded", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: true,
            showTooltipsWhenCollapsed: true,
            tooltipsPosition: "right",
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} />
        </MenuExpandContext.Provider>
      );

      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
      expect(screen.queryByTestId("tooltip-container")).toBeNull();
    });
  });
});
