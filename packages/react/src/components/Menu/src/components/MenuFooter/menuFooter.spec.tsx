import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";
import { CogIcon } from "@nimbus-ds/icons";

import { MenuExpandContext } from "@common/contexts";
import { noop } from "@common/utils";
import { MenuFooter } from "./MenuFooter";
import { MenuFooterProps } from "./menuFooter.types";

const label = "Ajustes";
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
const footerOf = () => document.querySelector(".menu-footer") as HTMLElement;
const chevronColorOf = () =>
  Array.from(footerOf().querySelectorAll("[class*='nimbus-icon_base']"))
    .pop()
    ?.getAttribute("class")
    ?.match(/nimbus-icon_color_([a-zA-Z-]+)__/)?.[1];

const renderFooter = (
  theme: Theme,
  expanded: boolean,
  props: Partial<MenuFooterProps> = {}
) =>
  render(
    <ThemeProvider theme={theme}>
      <MenuExpandContext.Provider
        value={{
          expanded,
          showPopoversWhenCollapsed: false,
          activeAccordionPopover: null,
          setActiveAccordionPopover: noop,
        }}
      >
        <MenuFooter
          className="menu-footer"
          label={label}
          startIcon={CogIcon}
          {...props}
        />
      </MenuExpandContext.Provider>
    </ThemeProvider>
  );

const stateCases: Array<[string, Partial<MenuFooterProps>]> = [
  ["rest", {}],
  ["active", { active: true }],
  ["disabled", { disabled: true }],
  ["disabled and active", { disabled: true, active: true }],
];

const expectedChevron = (theme: Theme, props: Partial<MenuFooterProps>) => {
  if (props.disabled) return "neutral-textDisabled";
  if (props.active) return "primary-interactive";
  return theme === "next-norteui" ? "neutral-textLow" : "neutral-textHigh";
};

describe("GIVEN <MenuFooter />", () => {
  describe("WHEN rendered under a theme", () => {
    it.each<[Theme, string, Partial<MenuFooterProps>]>(
      allThemes.flatMap((theme) =>
        stateCases.map(
          ([name, props]): [Theme, string, Partial<MenuFooterProps>] => [
            theme,
            name,
            props,
          ]
        )
      )
    )(
      "Menu AC-009: SHOULD color the chevron under %s when the footer is %s",
      (theme, _name, props) => {
        renderFooter(theme, true, props);
        expect(chevronColorOf()).toBe(expectedChevron(theme, props));
      }
    );

    it.each<Theme>(allThemes)(
      "Menu AC-005, AC-004: SHOULD set the footer padding under %s",
      (theme) => {
        const { unmount } = renderFooter(theme, true);
        expect(styleVar(footerOf(), "paddingLeft-xs")).toBe(spacing("2"));
        expect(styleVar(footerOf(), "paddingRight-xs")).toBe(
          isNorteUi(theme) ? spacing("2") : undefined
        );
        unmount();

        renderFooter(theme, false);
        expect(styleVar(footerOf(), "paddingLeft-xs")).toBe(
          spacing(isNorteUi(theme) ? "2" : "1")
        );
        expect(styleVar(footerOf(), "paddingRight-xs")).toBe(
          isNorteUi(theme) ? spacing("2") : undefined
        );
        expect(footerOf().getAttribute("class")).toMatch(
          /justifyContent-center/
        );
      }
    );
  });

  describe("WHEN activated", () => {
    it("Menu AC-009: SHOULD behave as a Menu Button and call onClick once", async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      renderFooter("next-norteui", true, { onClick });

      await user.click(screen.getByRole("button", { name: label }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Menu AC-009: SHOULD not call onClick when the footer is disabled", async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      renderFooter("next-norteui", true, { onClick, disabled: true });

      await user.click(screen.getByRole("button", { name: label }));
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
