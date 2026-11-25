import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";

import { MenuExpandContext } from "@common/contexts";
import { noop } from "@common/utils";
import { MenuHeader } from "./MenuHeader";
import { MenuHeaderProps } from "./menuHeader.types";

const headerChildren = "Header content";

const allThemes: Theme[] = [
  "base",
  "dark",
  "next",
  "next-dark",
  "next-norteui",
  "next-norteui-dark",
];
const isNorteUi = (theme: Theme) => theme.startsWith("next-norteui");
const spacing = (value: string) => `var(--nimbus-spacing-${value})`;
const styleVar = (el: Element, name: string) =>
  el
    .getAttribute("style")
    ?.match(new RegExp(`--${name}__[a-z0-9]+: ([^;]+)`))?.[1];
const layoutOf = (el: Element) =>
  `${el.getAttribute("class")}|${el.getAttribute("style")}`.replace(
    /__[a-z0-9]{5,}/g,
    "__h"
  );

const renderHeader = (theme: Theme, expanded: boolean) =>
  render(
    <ThemeProvider theme={theme}>
      <MenuExpandContext.Provider
        value={{
          expanded,
          activeAccordionPopover: null,
          setActiveAccordionPopover: noop,
        }}
      >
        <MenuHeader data-testid="header-element">{headerChildren}</MenuHeader>
      </MenuExpandContext.Provider>
    </ThemeProvider>
  );

const makeSut = (rest: Omit<MenuHeaderProps, "children">) => {
  render(
    <MenuExpandContext.Provider
      value={{
        expanded: true,
        activeAccordionPopover: null,
        setActiveAccordionPopover: noop,
      }}
    >
      <MenuHeader {...rest} data-testid="header-element">
        {headerChildren}
      </MenuHeader>
    </MenuExpandContext.Provider>
  );
};

describe("GIVEN <MenuHeader />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(headerChildren)).toBeDefined();
    });
  });
  describe("WHEN rendered under a theme", () => {
    it.each<Theme>(allThemes)(
      "Menu AC-005, AC-004: SHOULD set the collapsed horizontal padding under %s",
      (theme) => {
        renderHeader(theme, false);
        const header = screen.getByTestId("header-element");
        expect(styleVar(header, "paddingLeft-xs")).toBe(
          spacing(isNorteUi(theme) ? "2" : "1")
        );
        expect(styleVar(header, "paddingRight-xs")).toBe(
          isNorteUi(theme) ? spacing("2") : undefined
        );
        expect(styleVar(header, "paddingTop-xs")).toBe(spacing("4"));
        expect(styleVar(header, "paddingBottom-xs")).toBe(spacing("4"));
        expect(header.getAttribute("class")).toMatch(/justifyContent-center/);
      }
    );

    it("Menu AC-010: SHOULD keep the expanded padding in all six themes and never show a shadow", () => {
      const layouts = allThemes.map((theme) => {
        const { unmount } = renderHeader(theme, true);
        const expandedLayout = layoutOf(screen.getByTestId("header-element"));
        unmount();
        const { unmount: unmountCollapsed } = renderHeader(theme, false);
        expect(layoutOf(screen.getByTestId("header-element"))).not.toMatch(
          /boxShadow|box-shadow/i
        );
        unmountCollapsed();
        return expandedLayout;
      });
      expect(layouts[0]).toMatch(/--padding-xs__h: var\(--nimbus-spacing-4\)/);
      layouts.forEach((layout) => expect(layout).toBe(layouts[0]));
    });
  });
});
