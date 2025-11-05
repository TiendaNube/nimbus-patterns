import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { MenuExpandContext } from "@common/contexts";
import { noop } from "@common/utils";
import {
  MenuButtonAccordion,
  MenuButtonAccordionProps,
} from "./MenuButtonAccordion";
import { MenuButtonProperties } from "../../menuButton.types";

const labelText = "Button label";
const contentText = "Accordion content";

const makeSut = (
  rest: Partial<Omit<MenuButtonAccordionProps, "menuButton" | "children">> = {},
  menuButton: Partial<MenuButtonProperties> = {},
  contextExpanded = true
) => {
  render(
    <MenuExpandContext.Provider
      value={{
        expanded: contextExpanded,
        activeAccordionPopover: null,
        setActiveAccordionPopover: noop,
      }}
    >
      <MenuButtonAccordion
        contentid="content-id"
        {...rest}
        menuButton={{ label: labelText, ...menuButton }}
      >
        {contentText}
      </MenuButtonAccordion>
    </MenuExpandContext.Provider>
  );
};

describe("GIVEN <MenuButton.Accordion />", () => {
  describe("WHEN uncontrolled", () => {
    it("SHOULD toggle content visibility and aria-expanded on click", () => {
      makeSut();

      expect(screen.queryByText(contentText)).toBeNull();
      const button = screen.getByRole<HTMLButtonElement>("button");

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

      const button = screen.getByRole<HTMLButtonElement>("button");
      fireEvent.click(button);

      expect(onClick).not.toHaveBeenCalled();
      expect(screen.getByText(contentText)).toBeDefined();
    });
  });

  describe("WHEN controlled via open prop", () => {
    it("SHOULD keep closed and call provided onClick when open is false", () => {
      const onClick = jest.fn();
      makeSut({ open: false }, { onClick });

      const button = screen.getByRole<HTMLButtonElement>("button");
      expect(screen.queryByText(contentText)).toBeNull();

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
      expect(screen.queryByText(contentText)).toBeNull();
      expect(button.getAttribute("aria-expanded")).toBe("false");
    });

    it("SHOULD keep open and call provided onClick when open is true", () => {
      const onClick = jest.fn();
      makeSut({ open: true }, { onClick });

      const button = screen.getByRole<HTMLButtonElement>("button");
      expect(screen.getByText(contentText)).toBeDefined();

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
      expect(screen.getByText(contentText)).toBeDefined();
      expect(button.getAttribute("aria-expanded")).toBe("true");
    });
  });

  describe("WHEN expanded is false", () => {
    it("SHOULD not render children even when open is true", () => {
      makeSut({ expanded: false, open: true }, {}, false);

      const button = screen.getByRole<HTMLButtonElement>("button");
      expect(button.getAttribute("aria-expanded")).toBe("false");
      expect(screen.queryByText(contentText)).toBeNull();
    });
  });

  it("SHOULD override context expanded state with prop", () => {
    render(
      <MenuExpandContext.Provider
        value={{
          expanded: true,
          activeAccordionPopover: null,
          setActiveAccordionPopover: noop,
        }}
      >
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

    const button = screen.getByRole<HTMLButtonElement>("button");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText(contentText)).toBeNull();
  });

  it("SHOULD pass active state to MenuButton", () => {
    makeSut({ active: true });

    const button = screen.getByRole<HTMLButtonElement>("button");
    expect(button).toBeDefined();
  });

  describe("WHEN collapsed with showTooltipsWhenCollapsed enabled", () => {
    it("SHOULD wrap accordion with popover when collapsed and showTooltipsWhenCollapsed is true", () => {
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
          <MenuButtonAccordion
            contentid="content-id"
            menuButton={{ label: labelText }}
          >
            {contentText}
          </MenuButtonAccordion>
        </MenuExpandContext.Provider>
      );

      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
      expect(screen.getByTestId("popover-container")).toBeDefined();
    });

    it("SHOULD not render accordion content when collapsed", () => {
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
          <MenuButtonAccordion
            contentid="content-id"
            menuButton={{ label: labelText }}
          >
            {contentText}
          </MenuButtonAccordion>
        </MenuExpandContext.Provider>
      );

      expect(screen.queryByText(contentText)).toBeNull();
    });

    it("SHOULD not render popover when showTooltipsWhenCollapsed is undefined", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
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

      const button = screen.getByRole<HTMLButtonElement>("button");
      expect(button).toBeDefined();
      expect(screen.queryByTestId("popover-container")).toBeNull();
      expect(screen.queryByText(contentText)).toBeNull();
    });
  });

  describe("WHEN rendering as different element", () => {
    it("SHOULD render as anchor when as prop is 'a'", () => {
      const { container } = render(
        <MenuExpandContext.Provider
          value={{
            expanded: true,
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButtonAccordion
            as="a"
            href="/test"
            contentid="content-id"
            menuButton={{ label: labelText }}
          >
            {contentText}
          </MenuButtonAccordion>
        </MenuExpandContext.Provider>
      );

      const link = container.querySelector("a");
      expect(link).toBeDefined();
      expect(link?.getAttribute("href")).toBe("/test");
    });
  });
});
