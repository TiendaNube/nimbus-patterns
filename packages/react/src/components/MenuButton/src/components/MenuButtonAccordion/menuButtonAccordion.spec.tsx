import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";
import { HomeIcon } from "@nimbus-ds/icons";
import { Menu } from "@nimbus-ds/menu";

import { MenuExpandContext } from "@common/contexts";
import { noop } from "@common/utils";
import {
  MenuButtonAccordion,
  MenuButtonAccordionProps,
} from "./MenuButtonAccordion";
import { MenuButtonProperties } from "../../menuButton.types";
import { MenuButton } from "../../MenuButton";

const labelText = "Button label";
const contentText = "Accordion content";

const color = (token: string) => `var(--nimbus-colors-${token})`;
const styleVar = (el: Element, name: string) =>
  el
    .getAttribute("style")
    ?.match(new RegExp(`--${name}__[a-z0-9]+: ([^;]+)`))?.[1];
const textColorOf = (el: Element) =>
  el.getAttribute("class")?.match(/nimbus-text_color-([a-zA-Z-]+)-xs__/)?.[1];
const headerOf = () => screen.getByRole("button", { name: labelText });
const containerOf = () => headerOf().parentElement as HTMLElement;
const itemListOf = () =>
  screen.getByText("Item one").closest("button")?.parentElement as HTMLElement;

const renderAccordionUnderTheme = (
  theme: Theme,
  props: Partial<MenuButtonAccordionProps> = {}
) =>
  render(
    <ThemeProvider theme={theme}>
      <MenuButtonAccordion
        contentid="content-id"
        menuButton={{ label: labelText, startIcon: HomeIcon }}
        {...props}
      >
        <MenuButton label="Item one" />
        <MenuButton label="Item two" />
      </MenuButtonAccordion>
    </ThemeProvider>
  );

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
    it("MenuButton AC-003: SHOULD toggle content visibility and aria-expanded on click", () => {
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

    it("MenuButton AC-003: SHOULD ignore provided menuButton.onClick and use internal toggle", () => {
      const onClick = jest.fn();
      makeSut({}, { onClick });

      const button = screen.getByRole<HTMLButtonElement>("button");
      fireEvent.click(button);

      expect(onClick).not.toHaveBeenCalled();
      expect(screen.getByText(contentText)).toBeDefined();
    });
  });

  describe("WHEN controlled via open prop", () => {
    it("MenuButton AC-004: SHOULD keep closed and call provided onClick when open is false", () => {
      const onClick = jest.fn();
      makeSut({ open: false }, { onClick });

      const button = screen.getByRole<HTMLButtonElement>("button");
      expect(screen.queryByText(contentText)).toBeNull();

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
      expect(screen.queryByText(contentText)).toBeNull();
      expect(button.getAttribute("aria-expanded")).toBe("false");
    });

    it("MenuButton AC-004: SHOULD keep open and call provided onClick when open is true", () => {
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
    it("MenuButton AC-005: SHOULD not render children even when open is true", () => {
      makeSut({ expanded: false, open: true }, {}, false);

      const button = screen.getByRole<HTMLButtonElement>("button");
      expect(button.getAttribute("aria-expanded")).toBe("false");
      expect(screen.queryByText(contentText)).toBeNull();
    });
  });

  it("MenuButton AC-005: SHOULD override context expanded state with prop", () => {
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

  it("MenuButton AC-007: SHOULD pass active state to MenuButton", () => {
    makeSut({ active: true });

    const button = screen.getByRole<HTMLButtonElement>("button");
    expect(button).toBeDefined();
  });

  describe("WHEN collapsed with showPopoversWhenCollapsed enabled", () => {
    it("MenuButton AC-006: SHOULD wrap accordion with popover when collapsed and showPopoversWhenCollapsed is true", () => {
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

    it("MenuButton AC-005: SHOULD not render accordion content when collapsed", () => {
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

    it("MenuButton AC-006: SHOULD not render popover when showPopoversWhenCollapsed is undefined", () => {
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
    it("MenuButton AC-015: SHOULD render as anchor when as prop is 'a'", () => {
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

  describe("WHEN popover onVisibility callback logic", () => {
    const createOnVisibilityCallback =
      (accordionId: string, setActiveAccordionPopover: jest.Mock) =>
      (visible: boolean) => {
        setActiveAccordionPopover((prev: string | null) => {
          if (visible) {
            return accordionId;
          }
          return prev === accordionId ? null : prev;
        });
      };

    it("MenuButton AC-006: SHOULD set activeAccordionPopover to accordionId when visible becomes true", () => {
      const accordionId = ":r1:";
      const setActiveAccordionPopover = jest.fn();
      const onVisibilityCallback = createOnVisibilityCallback(
        accordionId,
        setActiveAccordionPopover
      );

      onVisibilityCallback(true);

      expect(setActiveAccordionPopover).toHaveBeenCalledTimes(1);
      const updaterFunction = setActiveAccordionPopover.mock.calls[0][0];
      const result = updaterFunction(null);
      expect(result).toBe(accordionId);
    });

    it("MenuButton AC-006: SHOULD clear activeAccordionPopover when visible becomes false and ID matches", () => {
      const accordionId = ":r1:";
      const setActiveAccordionPopover = jest.fn();
      const onVisibilityCallback = createOnVisibilityCallback(
        accordionId,
        setActiveAccordionPopover
      );

      onVisibilityCallback(false);

      expect(setActiveAccordionPopover).toHaveBeenCalledTimes(1);
      const updaterFunction = setActiveAccordionPopover.mock.calls[0][0];
      const resultWhenMatches = updaterFunction(accordionId);
      expect(resultWhenMatches).toBeNull();
    });

    it("MenuButton AC-006: SHOULD preserve activeAccordionPopover when visible becomes false and ID does not match", () => {
      const accordionId = ":r1:";
      const differentId = ":r2:";
      const setActiveAccordionPopover = jest.fn();
      const onVisibilityCallback = createOnVisibilityCallback(
        accordionId,
        setActiveAccordionPopover
      );

      onVisibilityCallback(false);

      expect(setActiveAccordionPopover).toHaveBeenCalledTimes(1);
      const updaterFunction = setActiveAccordionPopover.mock.calls[0][0];
      const resultWhenDoesNotMatch = updaterFunction(differentId);
      expect(resultWhenDoesNotMatch).toBe(differentId);
    });
  });
  describe("WHEN rendered under a theme", () => {
    const allThemes: Theme[] = [
      "base",
      "dark",
      "next",
      "next-dark",
      "next-norteui",
      "next-norteui-dark",
    ];

    it.each<Theme>(allThemes)(
      "MenuButton AC-007: SHOULD show the selected header appearance of %s when active",
      (theme) => {
        renderAccordionUnderTheme(theme, { active: true });
        const selectedBackground =
          theme === "next-norteui" ? "neutral-background" : "primary-surface";
        expect(styleVar(headerOf(), "backgroundColor-xs")).toBe(
          color(selectedBackground)
        );
        expect(textColorOf(screen.getByText(labelText))).toBe(
          "primary-interactive"
        );
      }
    );

    it("MenuButton AC-009: SHOULD keep the container transparent unless active under next-norteui", () => {
      const { unmount } = renderAccordionUnderTheme("next-norteui");
      expect(styleVar(containerOf(), "backgroundColor-xs")).toBe("transparent");
      unmount();

      const { unmount: unmountOpen } = renderAccordionUnderTheme(
        "next-norteui",
        { open: true }
      );
      expect(styleVar(containerOf(), "backgroundColor-xs")).toBe("transparent");
      unmountOpen();

      renderAccordionUnderTheme("next-norteui", { open: true, active: true });
      expect(styleVar(containerOf(), "backgroundColor-xs")).toBe(
        color("neutral-background")
      );
    });

    it("MenuButton AC-009: SHOULD render items with neutral-textLow and no gap under next-norteui", () => {
      renderAccordionUnderTheme("next-norteui", { open: true });
      expect(textColorOf(screen.getByText("Item one"))).toBe("neutral-textLow");
      expect(styleVar(itemListOf(), "gap-xs")).toBe("0");
    });

    it("MenuButton AC-010: SHOULD keep the previous container colors and remove the item gap under next-norteui-dark", () => {
      const { unmount } = renderAccordionUnderTheme("next-norteui-dark");
      expect(styleVar(containerOf(), "backgroundColor-xs")).toBe("transparent");
      unmount();

      const { unmount: unmountOpen } = renderAccordionUnderTheme(
        "next-norteui-dark",
        { open: true }
      );
      expect(styleVar(containerOf(), "backgroundColor-xs")).toBe(
        color("neutral-surface")
      );
      expect(textColorOf(screen.getByText("Item one"))).toBe(
        "neutral-textHigh"
      );
      expect(styleVar(itemListOf(), "gap-xs")).toBe("0");
      unmountOpen();

      renderAccordionUnderTheme("next-norteui-dark", {
        open: true,
        active: true,
      });
      expect(styleVar(containerOf(), "backgroundColor-xs")).toBe(
        color("primary-surface")
      );
    });

    it.each<[Theme, string]>([
      ["next-norteui", "neutral-textLow"],
      ["next-norteui-dark", "neutral-textHigh"],
    ])(
      "MenuButton AC-009, AC-010: SHOULD render popover items without gap under %s",
      async (theme, itemColor) => {
        const user = userEvent.setup();
        render(
          <ThemeProvider theme={theme}>
            <Menu expanded={false}>
              <Menu.ButtonAccordion
                contentid="content-id"
                menuButton={{
                  label: labelText,
                  startIcon: HomeIcon,
                  "aria-label": "Group",
                }}
              >
                <MenuButton label="Item one" />
                <MenuButton label="Item two" />
              </Menu.ButtonAccordion>
            </Menu>
          </ThemeProvider>
        );

        await user.hover(screen.getByRole("button", { name: "Group" }));
        await waitFor(() => expect(screen.getByText("Item one")).toBeVisible());
        expect(textColorOf(screen.getByText("Item one"))).toBe(itemColor);
        expect(styleVar(itemListOf(), "gap-xs")).toBe("0");
      }
    );

    it("MenuButton AC-009, AC-010: SHOULD keep an open Accordion open and follow the provider when the theme changes", () => {
      const tree = (theme: Theme) => (
        <ThemeProvider theme={theme}>
          <MenuButtonAccordion
            contentid="content-id"
            menuButton={{ label: labelText }}
          >
            <MenuButton label="Item one" />
          </MenuButtonAccordion>
        </ThemeProvider>
      );
      const { rerender } = render(tree("base"));
      fireEvent.click(headerOf());
      expect(styleVar(itemListOf(), "gap-xs")).toBe(
        "var(--nimbus-spacing-0-5)"
      );

      const steps: Array<[Theme, string, string]> = [
        ["next-norteui", "transparent", "0"],
        ["next-norteui-dark", color("neutral-surface"), "0"],
        ["base", color("neutral-surface"), "var(--nimbus-spacing-0-5)"],
      ];
      steps.forEach(([theme, background, gap]) => {
        rerender(tree(theme));
        expect(headerOf()).toHaveAttribute("aria-expanded", "true");
        expect(styleVar(containerOf(), "backgroundColor-xs")).toBe(background);
        expect(styleVar(itemListOf(), "gap-xs")).toBe(gap);
      });
    });

    it("MenuButton AC-014: SHOULD keep focus on the header when toggled with the keyboard", async () => {
      const user = userEvent.setup();
      renderAccordionUnderTheme("next-norteui");

      await user.tab();
      expect(headerOf()).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(screen.getByText("Item one")).toBeInTheDocument();
      expect(headerOf()).toHaveFocus();
      await user.keyboard(" ");
      expect(screen.queryByText("Item one")).toBeNull();
      expect(headerOf()).toHaveFocus();
    });
  });
});
