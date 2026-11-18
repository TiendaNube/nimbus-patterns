import React from "react";
import { render, screen } from "@testing-library/react";
import { useTheme } from "@nimbus-ds/styles";

import { MenuButton } from "@nimbus-ds/menubutton";
import { Menu } from "./Menu";
import { MenuSection, MenuHeader, MenuBody, MenuFooter } from "./components";

// The unanchored "@nimbus-ds/menu" moduleNameMapper entry in jest.config.ts
// also captures "@nimbus-ds/menubutton", so point it at its source here.
jest.mock("@nimbus-ds/menubutton", () =>
  jest.requireActual("../../MenuButton/src")
);

jest.mock("@nimbus-ds/styles", () => ({
  ...jest.requireActual("@nimbus-ds/styles"),
  useTheme: jest.fn(),
}));

const mockedUseTheme = useTheme as jest.Mock;

const setTheme = (currentTheme: string) =>
  mockedUseTheme.mockReturnValue({ currentTheme, changeTheme: jest.fn() });

const tokensOf = (element: Element | null | undefined) =>
  `${element?.className ?? ""} ${element?.getAttribute("style") ?? ""}`;

const renderMenu = (expanded = true) =>
  render(
    <Menu expanded={expanded} data-testid="menu-element">
      <MenuHeader data-testid="header-element">Header</MenuHeader>
      <MenuBody data-testid="body-element">
        <MenuSection title="Section" data-testid="section-element">
          <MenuButton label="Item" />
        </MenuSection>
      </MenuBody>
      <MenuFooter label="Footer" className="footer-element" />
    </Menu>
  );

const getFooterIcon = () =>
  screen.getByText("Footer").closest("button")?.querySelector("svg")
    ?.parentElement;

describe("GIVEN <Menu /> under each theme", () => {
  afterEach(() => mockedUseTheme.mockReset());

  describe.each(["next-norteui", "next-norteui-dark"])(
    "WHEN the theme is %s",
    (theme) => {
      beforeEach(() => setTheme(theme));

      it("SHOULD render the menu with neutral-surfaceDisabled", () => {
        renderMenu();
        expect(tokensOf(screen.getByTestId("menu-element"))).toContain(
          "neutral-surfaceDisabled"
        );
      });

      it("SHOULD render the section with a 4px gap", () => {
        renderMenu();
        expect(tokensOf(screen.getByTestId("section-element"))).toContain(
          "var(--nimbus-spacing-1)"
        );
      });

      it("SHOULD render the footer icon with neutral-textLow", () => {
        renderMenu();
        expect(tokensOf(getFooterIcon())).toContain("neutral-textLow");
      });

      it("SHOULD use 8px horizontal padding on header, body and footer when collapsed", () => {
        renderMenu(false);
        [
          screen.getByTestId("header-element"),
          screen.getByTestId("body-element"),
          document.querySelector(".footer-element"),
        ].forEach((element) => {
          const tokens = tokensOf(element);
          expect(tokens).toMatch(
            /--paddingLeft-xs__\w+: var\(--nimbus-spacing-2\)/
          );
          expect(tokens).toMatch(
            /--paddingRight-xs__\w+: var\(--nimbus-spacing-2\)/
          );
        });
      });
    }
  );

  describe.each(["base", "dark", "next", "next-dark"])(
    "WHEN the theme is %s",
    (theme) => {
      beforeEach(() => setTheme(theme));

      it("SHOULD keep neutral-background on the menu", () => {
        renderMenu();
        const tokens = tokensOf(screen.getByTestId("menu-element"));
        expect(tokens).toContain("neutral-background");
        expect(tokens).not.toContain("neutral-surfaceDisabled");
      });

      it("SHOULD keep the 1-5 gap on the section", () => {
        renderMenu();
        expect(tokensOf(screen.getByTestId("section-element"))).toContain(
          "var(--nimbus-spacing-1-5)"
        );
      });

      it("SHOULD keep neutral-textHigh on the footer icon", () => {
        renderMenu();
        expect(tokensOf(getFooterIcon())).toContain("neutral-textHigh");
      });

      it("SHOULD keep the 4px left-only padding on header and body when collapsed", () => {
        renderMenu(false);
        [
          screen.getByTestId("header-element"),
          screen.getByTestId("body-element"),
        ].forEach((element) => {
          const tokens = tokensOf(element);
          expect(tokens).toMatch(
            /--paddingLeft-xs__\w+: var\(--nimbus-spacing-1\)/
          );
          expect(tokens).not.toMatch(/--paddingRight-xs__/);
        });
      });
    }
  );
});
