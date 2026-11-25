import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";
import { CashIcon, CogIcon, HomeIcon } from "@nimbus-ds/icons";

import { useMenuExpandContext } from "@common/contexts";
import { Menu } from "./Menu";
import { MenuProps } from "./menu.types";

const bodyChildren = "Body content";

const spacing = (value: string) => `var(--nimbus-spacing-${value})`;
const color = (token: string) => `var(--nimbus-colors-${token})`;
const styleVar = (el: Element, name: string) =>
  el
    .getAttribute("style")
    ?.match(new RegExp(`--${name}__[a-z0-9]+: ([^;]+)`))?.[1];
const classOf = (el: Element) => el.getAttribute("class") ?? "";
const chevronColorOf = (footer: Element) =>
  Array.from(footer.querySelectorAll("[class*='nimbus-icon_base']"))
    .pop()
    ?.getAttribute("class")
    ?.match(/nimbus-icon_color_([a-zA-Z-]+)__/)?.[1];
const byTestId = (id: string) => screen.getByTestId(id);
const footerOf = () => document.querySelector(".menu-footer") as HTMLElement;

const CompleteMenu: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <Menu expanded={expanded} data-testid="menu">
    <Menu.Header data-testid="menu-header">Logo</Menu.Header>
    <Menu.Body data-testid="menu-body">
      <Menu.Section data-testid="section-untitled">
        <Menu.Button startIcon={HomeIcon} label="Inicio" />
      </Menu.Section>
      <Menu.Section title="Administrar" data-testid="section-titled">
        <Menu.ButtonAccordion
          contentid="ventas"
          menuButton={{ startIcon: CashIcon, label: "Ventas" }}
        >
          <Menu.Button label="Lista de ventas" />
        </Menu.ButtonAccordion>
      </Menu.Section>
    </Menu.Body>
    <Menu.Footer className="menu-footer" startIcon={CogIcon} label="Ajustes" />
  </Menu>
);

const renderMenu = (theme: Theme | undefined, expanded: boolean) =>
  render(
    theme ? (
      <ThemeProvider theme={theme}>
        <CompleteMenu expanded={expanded} />
      </ThemeProvider>
    ) : (
      <CompleteMenu expanded={expanded} />
    )
  );

const makeSut = (rest?: Omit<MenuProps, "children">) => {
  render(
    <Menu {...rest} data-testid="menu-element">
      {bodyChildren}
    </Menu>
  );
};

const ContextConsumer: React.FC = () => {
  const context = useMenuExpandContext(false);
  return (
    <div data-testid="context-value">
      {JSON.stringify({
        expanded: context.expanded,
        showPopoversWhenCollapsed: context.showPopoversWhenCollapsed,
        popoverPosition: context.popoverPosition,
      })}
    </div>
  );
};

describe("GIVEN <Menu />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut();
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });

  describe("WHEN tooltip configuration is provided", () => {
    it("Menu AC-001: SHOULD pass showPopoversWhenCollapsed and popoverPosition to context", () => {
      render(
        <Menu
          expanded={false}
          showPopoversWhenCollapsed={false}
          popoverPosition="left"
        >
          <ContextConsumer />
        </Menu>
      );

      const contextValue = JSON.parse(
        screen.getByTestId("context-value").textContent || "{}"
      );

      expect(contextValue.expanded).toBe(false);
      expect(contextValue.showPopoversWhenCollapsed).toBe(false);
      expect(contextValue.popoverPosition).toBe("left");
    });

    it("Menu AC-001: SHOULD use default values when tooltip props are not provided", () => {
      render(
        <Menu>
          <ContextConsumer />
        </Menu>
      );

      const contextValue = JSON.parse(
        screen.getByTestId("context-value").textContent || "{}"
      );

      expect(contextValue.expanded).toBe(true);
      expect(contextValue.showPopoversWhenCollapsed).toBe(true);
      expect(contextValue.popoverPosition).toBe("right");
    });
  });
  describe("WHEN composed with its parts", () => {
    it("Menu AC-002: SHOULD show section titles only when expanded and dividers only for titled sections when collapsed", () => {
      const { unmount } = renderMenu(undefined, true);
      expect(screen.getByText("Administrar")).toBeInTheDocument();
      expect(screen.queryByTestId("menu-section--collapsed")).toBeNull();
      expect(screen.getByText("Inicio")).toBeInTheDocument();
      unmount();

      renderMenu(undefined, false);
      expect(screen.queryByText("Administrar")).toBeNull();
      expect(screen.getAllByTestId("menu-section--collapsed")).toHaveLength(1);
      expect(
        byTestId("section-untitled").querySelector(
          "[data-testid='menu-section--collapsed']"
        )
      ).toBeNull();
      expect(byTestId("menu-body").querySelectorAll("button")).toHaveLength(2);
    });

    it("Menu AC-003 (partial, DOM only): SHOULD make only the Body scrollable", () => {
      renderMenu(undefined, true);
      expect(classOf(byTestId("menu-body"))).toMatch(/overflowY-auto/);
      expect(styleVar(byTestId("menu-body"), "flex-xs")).toBe("1 1 auto");
      expect(styleVar(byTestId("menu-header"), "flex-xs")).toBe("0 1 auto");
      expect(styleVar(footerOf(), "flex-xs")).toBe("0 1 auto");
      expect(classOf(byTestId("menu-header"))).not.toMatch(/overflowY-auto/);
      expect(classOf(footerOf())).not.toMatch(/overflowY-auto/);
    });
  });

  describe("WHEN rendered under a theme", () => {
    it.each<Theme>(["next-norteui", "next-norteui-dark"])(
      "Menu AC-005: SHOULD use the Norte UI spacing under %s when expanded",
      (theme) => {
        renderMenu(theme, true);
        expect(styleVar(byTestId("section-titled"), "gap-xs")).toBe(
          spacing("1")
        );
        expect(styleVar(footerOf(), "paddingLeft-xs")).toBe(spacing("2"));
        expect(styleVar(footerOf(), "paddingRight-xs")).toBe(spacing("2"));
      }
    );

    it.each<Theme>(["next-norteui", "next-norteui-dark"])(
      "Menu AC-005: SHOULD use the Norte UI spacing under %s when collapsed",
      (theme) => {
        renderMenu(theme, false);
        expect(styleVar(byTestId("section-untitled"), "gap-xs")).toBe(
          spacing("1")
        );
        ["menu-header", "menu-body"].forEach((id) => {
          expect(styleVar(byTestId(id), "paddingLeft-xs")).toBe(spacing("2"));
          expect(styleVar(byTestId(id), "paddingRight-xs")).toBe(spacing("2"));
        });
        expect(styleVar(byTestId("menu-header"), "paddingTop-xs")).toBe(
          spacing("4")
        );
        expect(styleVar(byTestId("menu-body"), "paddingBottom-xs")).toBe(
          spacing("4")
        );
        expect(styleVar(footerOf(), "paddingLeft-xs")).toBe(spacing("2"));
        expect(styleVar(footerOf(), "paddingRight-xs")).toBe(spacing("2"));
      }
    );

    it("Menu AC-006: SHOULD use neutral-surfaceDisabled and a neutral-textLow chevron under next-norteui", () => {
      renderMenu("next-norteui", true);
      expect(styleVar(byTestId("menu"), "backgroundColor-xs")).toBe(
        color("neutral-surfaceDisabled")
      );
      expect(chevronColorOf(footerOf())).toBe("neutral-textLow");
    });

    it("Menu AC-007: SHOULD keep the previous background and chevron colors under next-norteui-dark", () => {
      renderMenu("next-norteui-dark", true);
      expect(styleVar(byTestId("menu"), "backgroundColor-xs")).toBe(
        color("neutral-background")
      );
      expect(chevronColorOf(footerOf())).toBe("neutral-textHigh");
    });

    it("Menu AC-012: SHOULD use the previous appearance without a ThemeProvider", () => {
      renderMenu(undefined, false);
      expect(styleVar(byTestId("menu"), "backgroundColor-xs")).toBe(
        color("neutral-background")
      );
      expect(styleVar(byTestId("section-untitled"), "gap-xs")).toBe(
        spacing("1-5")
      );
      expect(styleVar(byTestId("menu-body"), "paddingLeft-xs")).toBe(
        spacing("1")
      );
      expect(
        styleVar(byTestId("menu-body"), "paddingRight-xs")
      ).toBeUndefined();
    });

    it("Menu AC-005, AC-006, AC-007: SHOULD follow the provider when the theme changes after mount", () => {
      const tree = (theme: Theme) => (
        <ThemeProvider theme={theme}>
          <CompleteMenu expanded={false} />
        </ThemeProvider>
      );
      const { rerender } = render(tree("base"));
      const steps: Array<[Theme, string, string]> = [
        ["next-norteui", "neutral-surfaceDisabled", "2"],
        ["next-norteui-dark", "neutral-background", "2"],
        ["base", "neutral-background", "1"],
      ];
      steps.forEach(([theme, background, paddingLeft]) => {
        rerender(tree(theme));
        expect(styleVar(byTestId("menu"), "backgroundColor-xs")).toBe(
          color(background)
        );
        expect(styleVar(byTestId("menu-body"), "paddingLeft-xs")).toBe(
          spacing(paddingLeft)
        );
      });
    });
  });
});
