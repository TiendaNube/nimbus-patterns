import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { MenuExpandContext } from "@common/contexts";
import {
  MenuButtonAccordion,
  MenuButtonAccordionProps,
} from "./MenuButtonAccordion";
import { MenuButtonProperties } from "../../menuButton.types";

jest.mock("../../MenuButton", () => ({
  MenuButton: ({ onClick, active, label, ...props }: any) => (
    <button
      onClick={onClick}
      data-active={active}
      aria-expanded={props["aria-expanded"]}
      type="button"
      {...props}
    >
      {label}
    </button>
  ),
}));

const labelText = "Button label";
const contentText = "Accordion content";

const makeSut = (
  rest: Partial<Omit<MenuButtonAccordionProps, "menuButton" | "children">> = {},
  menuButton: Partial<MenuButtonProperties> = {}
) => {
  render(
    <MenuButtonAccordion
      contentid="content-id"
      {...rest}
      menuButton={{ label: labelText, ...menuButton }}
    >
      {contentText}
    </MenuButtonAccordion>
  );
};

describe("GIVEN <MenuButton.Accordion />", () => {
  describe("WHEN uncontrolled", () => {
    it("SHOULD toggle content visibility and aria-expanded on click", () => {
      makeSut();

      expect(screen.queryByText(contentText)).toBeNull();
      const button = screen.getByRole<HTMLButtonElement>("button", {
        name: labelText,
      });

      fireEvent.click(button);
      expect(screen.getByText(contentText)).toBeDefined();
      expect(button.getAttribute("aria-expanded")).toBe("true");

      fireEvent.click(button);
      expect(screen.queryByText(contentText)).toBeNull();
      expect(button.getAttribute("aria-expanded")).toBe("false");
    });

    it("SHOULD ignore provided menuButton.onClick and use internal toggle", () => {
      const onClick = jest.fn();
      makeSut({}, { onClick });

      const button = screen.getByRole<HTMLButtonElement>("button", {
        name: labelText,
      });
      fireEvent.click(button);

      expect(onClick).not.toHaveBeenCalled();
      expect(screen.getByText(contentText)).toBeDefined();
    });
  });

  describe("WHEN controlled via open prop", () => {
    it("SHOULD keep closed and call provided onClick when open is false", () => {
      const onClick = jest.fn();
      makeSut({ open: false }, { onClick });

      const button = screen.getByRole<HTMLButtonElement>("button", {
        name: labelText,
      });
      expect(screen.queryByText(contentText)).toBeNull();

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
      expect(screen.queryByText(contentText)).toBeNull();
      expect(button.getAttribute("aria-expanded")).toBe("false");
    });

    it("SHOULD keep open and call provided onClick when open is true", () => {
      const onClick = jest.fn();
      makeSut({ open: true }, { onClick });

      const button = screen.getByRole<HTMLButtonElement>("button", {
        name: labelText,
      });
      expect(screen.getByText(contentText)).toBeDefined();

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
      expect(screen.getByText(contentText)).toBeDefined();
      expect(button.getAttribute("aria-expanded")).toBe("true");
    });
  });

  describe("WHEN expanded is false", () => {
    it("SHOULD not render children even when open is true", () => {
      makeSut({ expanded: false, open: true });

      const button = screen.getByRole<HTMLButtonElement>("button", {
        name: labelText,
      });
      expect(button.getAttribute("aria-expanded")).toBe("false");
      expect(screen.queryByText(contentText)).toBeNull();
    });
  });

  it("should override context expanded state when expanded is provided", () => {
    render(
      <MenuExpandContext.Provider value={{ expanded: true }}>
        <MenuButtonAccordion
          contentid="content-id"
          expanded={false}
          menuButton={{ label: labelText }}
          open
        >
          {contentText}
        </MenuButtonAccordion>
      </MenuExpandContext.Provider>
    );

    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: labelText,
    });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText(contentText)).toBeNull();
  });

  it("should override context collapsed state when expanded is provided", () => {
    render(
      <MenuExpandContext.Provider value={{ expanded: false }}>
        <MenuButtonAccordion
          open
          contentid="content-id"
          expanded
          menuButton={{ label: labelText }}
        >
          {contentText}
        </MenuButtonAccordion>
      </MenuExpandContext.Provider>
    );

    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: labelText,
    });
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText(contentText)).toBeDefined();
  });

  describe("WHEN collapsed with tooltip configuration", () => {
    it("SHOULD wrap accordion with tooltip when collapsed and showTooltipsWhenCollapsed is true", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            showTooltipsWhenCollapsed: true,
            tooltipsPosition: "right",
          }}
        >
          <MenuButtonAccordion
            contentid="content-id"
            menuButton={{ label: labelText }}
          >
            {contentText}
          </MenuButtonAccordion>
        </MenuExpandContext.Provider>
      );

      const tooltipContainer = screen.getByTestId("tooltip-container");
      expect(tooltipContainer).toBeDefined();
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
    });

    it("SHOULD not wrap accordion with tooltip when showTooltipsWhenCollapsed is false", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            showTooltipsWhenCollapsed: false,
          }}
        >
          <MenuButtonAccordion
            contentid="content-id"
            menuButton={{ label: labelText }}
          >
            {contentText}
          </MenuButtonAccordion>
        </MenuExpandContext.Provider>
      );

      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
      expect(screen.queryByTestId("tooltip-container")).toBeNull();
      expect(screen.queryByText(contentText)).toBeNull();
    });

    it("SHOULD use custom tooltipText when provided", () => {
      const customTooltip = "Custom accordion tooltip";
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            showTooltipsWhenCollapsed: true,
            tooltipsPosition: "top",
          }}
        >
          <MenuButtonAccordion
            contentid="content-id"
            menuButton={{ label: labelText }}
            tooltipText={customTooltip}
          >
            {contentText}
          </MenuButtonAccordion>
        </MenuExpandContext.Provider>
      );

      const tooltipContainer = screen.getByTestId("tooltip-container");
      expect(tooltipContainer).toBeDefined();
    });

    it("SHOULD not show tooltip when accordion is expanded", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: true,
            showTooltipsWhenCollapsed: true,
            tooltipsPosition: "right",
          }}
        >
          <MenuButtonAccordion
            contentid="content-id"
            open
            menuButton={{ label: labelText }}
          >
            {contentText}
          </MenuButtonAccordion>
        </MenuExpandContext.Provider>
      );

      const button = screen.getByRole<HTMLButtonElement>("button", {
        name: labelText,
      });
      expect(button).toBeDefined();
      expect(screen.queryByTestId("tooltip-container")).toBeNull();
    });
  });
});
