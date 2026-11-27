import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";

import { MenuExpandContext } from "@common/contexts";
import { noop } from "@common/utils";
import { MenuBody } from "./MenuBody";
import { MenuBodyProps } from "./menuBody.types";

const bodyChildren = "Body content";

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

const renderBody = (theme: Theme, expanded: boolean) =>
  render(
    <ThemeProvider theme={theme}>
      <MenuExpandContext.Provider
        value={{
          expanded,
          activeAccordionPopover: null,
          setActiveAccordionPopover: noop,
        }}
      >
        <MenuBody data-testid="body-element">{bodyChildren}</MenuBody>
      </MenuExpandContext.Provider>
    </ThemeProvider>
  );

const makeSut = (
  rest: Omit<MenuBodyProps, "children">,
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
      <MenuBody {...rest} data-testid="body-element">
        {bodyChildren}
      </MenuBody>
    </MenuExpandContext.Provider>
  );
};

describe("GIVEN <MenuBody />", () => {
  describe("WHEN rendered", () => {
    it("Menu AC-002: SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });

    it("Menu AC-002: SHOULD render children when collapsed", () => {
      makeSut({}, false);
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });
  describe("WHEN rendered under a theme", () => {
    it.each<Theme>(allThemes)(
      "Menu AC-005, AC-004: SHOULD set the collapsed padding under %s",
      (theme) => {
        renderBody(theme, false);
        const body = screen.getByTestId("body-element");
        expect(styleVar(body, "paddingLeft-xs")).toBe(
          spacing(isNorteUi(theme) ? "2" : "1")
        );
        expect(styleVar(body, "paddingRight-xs")).toBe(
          isNorteUi(theme) ? spacing("2") : undefined
        );
        expect(styleVar(body, "paddingBottom-xs")).toBe(
          isNorteUi(theme) ? spacing("4") : undefined
        );
        expect(body.getAttribute("class")).toMatch(/alignItems-center/);
      }
    );

    it("Menu AC-010: SHOULD keep the expanded padding in all six themes", () => {
      const layouts = allThemes.map((theme) => {
        const { unmount } = renderBody(theme, true);
        const layout = layoutOf(screen.getByTestId("body-element"));
        unmount();
        return layout;
      });
      expect(layouts[0]).toMatch(
        /--paddingLeft-xs__h: var\(--nimbus-spacing-2\)/
      );
      expect(layouts[0]).toMatch(
        /--paddingRight-xs__h: var\(--nimbus-spacing-2\)/
      );
      expect(layouts[0]).toMatch(
        /--paddingBottom-xs__h: var\(--nimbus-spacing-4\)/
      );
      layouts.forEach((layout) => expect(layout).toBe(layouts[0]));
    });
  });
});
