import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";

import { MenuExpandContext } from "@common/contexts";
import { noop } from "@common/utils";
import { MenuSection } from "./MenuSection";
import { MenuSectionProps } from "./menuSection.types";

const sectionChildren = "Body content";
const sectionTitle = "Title content";

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

const makeSut = (
  rest: Omit<MenuSectionProps, "children">,
  expanded: boolean
) => {
  render(
    <MenuExpandContext.Provider
      value={{
        expanded,
        activeAccordionPopover: null,
        setActiveAccordionPopover: noop,
      }}
    >
      <MenuSection {...rest} data-testid="section-element">
        {sectionChildren}
      </MenuSection>
    </MenuExpandContext.Provider>
  );
};

describe("GIVEN <MenuSection />", () => {
  describe("WHEN rendered", () => {
    it("Menu AC-002: SHOULD render children correctly when expanded", () => {
      makeSut({}, true);
      expect(screen.getByText(sectionChildren)).toBeDefined();
    });

    it("Menu AC-002: SHOULD render title correctly when expanded", () => {
      makeSut({ title: sectionTitle }, true);
      expect(screen.getByText(sectionTitle)).toBeDefined();
    });

    it("Menu AC-002: SHOULD not render title when not expanded", () => {
      makeSut({ title: sectionTitle }, false);
      expect(screen.queryByText(sectionTitle)).toBeNull();
      expect(screen.getByTestId("menu-section--collapsed")).toBeDefined();
    });
  });
  it("Menu AC-002: SHOULD not render a divider for an untitled section when collapsed", () => {
    makeSut({}, false);
    expect(screen.queryByTestId("menu-section--collapsed")).toBeNull();
    expect(screen.getByText(sectionChildren)).toBeDefined();
  });

  describe("WHEN rendered under a theme", () => {
    it.each<Theme>(allThemes)(
      "Menu AC-013: SHOULD color the collapsed section divider under %s",
      (theme) => {
        render(
          <ThemeProvider theme={theme}>
            <MenuExpandContext.Provider
              value={{
                expanded: false,
                activeAccordionPopover: null,
                setActiveAccordionPopover: noop,
              }}
            >
              <MenuSection title={sectionTitle}>{sectionChildren}</MenuSection>
            </MenuExpandContext.Provider>
          </ThemeProvider>
        );
        const divider = screen.getByTestId("menu-section--collapsed");
        const expected =
          theme === "next-norteui"
            ? "neutral-interactive"
            : "neutral-surfaceHighlight";
        expect(styleVar(divider, "borderColor-xs")).toBe(
          `var(--nimbus-colors-${expected})`
        );
      }
    );

    it.each<[Theme, boolean]>(
      allThemes.flatMap(
        (theme): Array<[Theme, boolean]> => [
          [theme, true],
          [theme, false],
        ]
      )
    )(
      "Menu AC-005, AC-004: SHOULD set the gap between entries under %s (expanded: %s)",
      (theme, expanded) => {
        render(
          <ThemeProvider theme={theme}>
            <MenuExpandContext.Provider
              value={{
                expanded,
                activeAccordionPopover: null,
                setActiveAccordionPopover: noop,
              }}
            >
              <MenuSection data-testid="section-element">
                {sectionChildren}
              </MenuSection>
            </MenuExpandContext.Provider>
          </ThemeProvider>
        );
        expect(styleVar(screen.getByTestId("section-element"), "gap-xs")).toBe(
          spacing(isNorteUi(theme) ? "1" : "1-5")
        );
      }
    );
  });
});
