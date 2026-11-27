/* eslint import/no-relative-packages: "off" */
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";
import { Tag } from "@nimbus-ds/components";
import { CashIcon, CogIcon, HomeIcon, TagIcon } from "@nimbus-ds/icons";

import { MenuButton } from "../components/MenuButton/src";
import { Menu } from "../components/Menu/src";
import { MenuFooterProps } from "../components/Menu/src/components/MenuFooter/menuFooter.types";

type ThemeCase = Theme | "no provider";

const previousReleaseThemes: ThemeCase[] = [
  "base",
  "dark",
  "next",
  "next-dark",
  "no provider",
];

/**
 * Normalizes values that change between renders or style releases without
 * changing the rendered component: React ids, sprinkle hash suffixes and the
 * empty popover portal roots that `ThemeProvider` hosts.
 */
const normalize = (html: string): string =>
  html
    .replace(/«r[0-9a-zA-Z]+»|:r[0-9a-zA-Z]+:|_r_[0-9a-z]+_/g, ":r_id:")
    .replace(/__[a-z0-9]{5,}\b/g, "__h")
    .replace(
      /<div id="nimbus-popover-floating"><div id=":r_id:" data-floating-ui-portal=""><\/div><\/div>/g,
      ""
    );

const renderMarkup = (theme: ThemeCase, node: React.ReactElement): string => {
  if (theme === "no provider") {
    const { container, unmount } = render(node);
    const html = container.innerHTML;
    unmount();
    return normalize(html);
  }
  const { container, unmount } = render(
    <ThemeProvider theme={theme}>{node}</ThemeProvider>
  );
  const html = (container.firstElementChild as HTMLElement).innerHTML;
  unmount();
  return normalize(html);
};

const accordion = (props: { open?: boolean; active?: boolean } = {}) => (
  <MenuButton.Accordion
    contentid="content-1"
    menuButton={{ label: "Ventas", startIcon: CashIcon }}
    {...props}
  >
    <MenuButton label="Lista de ventas" />
    <MenuButton label="Exportar lista" active />
  </MenuButton.Accordion>
);

const completeMenu = (
  expanded: boolean,
  footer: Partial<MenuFooterProps> = {}
) => (
  <Menu expanded={expanded}>
    <Menu.Header>Logo</Menu.Header>
    <Menu.Body>
      <Menu.Section>
        <Menu.Button startIcon={HomeIcon} label="Inicio" active />
      </Menu.Section>
      <Menu.Section title="Administrar">
        <Menu.ButtonAccordion
          contentid="content-2"
          open
          menuButton={{ startIcon: TagIcon, label: "Productos" }}
        >
          <Menu.Button label="Productos" />
        </Menu.ButtonAccordion>
        <Menu.Button startIcon={CashIcon} label="Ventas" disabled />
      </Menu.Section>
    </Menu.Body>
    <Menu.Footer startIcon={CogIcon} label="Ajustes" {...footer} />
  </Menu>
);

const fixtures: Array<{ name: string; element: React.ReactElement }> = [
  {
    name: "MenuButton rest",
    element: (
      <MenuButton label="Clientes" startIcon={HomeIcon}>
        <Tag appearance="primary">Nuevo</Tag>
      </MenuButton>
    ),
  },
  {
    name: "MenuButton selected",
    element: <MenuButton label="Clientes" startIcon={HomeIcon} active />,
  },
  {
    name: "MenuButton disabled",
    element: <MenuButton label="Clientes" startIcon={HomeIcon} disabled />,
  },
  {
    name: "MenuButton disabled and selected",
    element: (
      <MenuButton label="Clientes" startIcon={HomeIcon} disabled active />
    ),
  },
  {
    name: "MenuButton collapsed",
    element: (
      <MenuButton label="Clientes" startIcon={HomeIcon} expanded={false} />
    ),
  },
  { name: "MenuButton.Accordion closed", element: accordion() },
  { name: "MenuButton.Accordion open", element: accordion({ open: true }) },
  {
    name: "MenuButton.Accordion selected and open",
    element: accordion({ open: true, active: true }),
  },
  {
    name: "MenuButton.Accordion collapsed",
    element: (
      <Menu expanded={false}>
        <Menu.Body>
          <Menu.Section>{accordion({ open: true })}</Menu.Section>
        </Menu.Body>
      </Menu>
    ),
  },
  { name: "Menu expanded", element: completeMenu(true) },
  { name: "Menu collapsed", element: completeMenu(false) },
  {
    name: "Menu expanded with selected footer",
    element: completeMenu(true, { active: true }),
  },
  {
    name: "Menu expanded with disabled footer",
    element: completeMenu(true, { disabled: true }),
  },
  {
    name: "Menu collapsed with selected footer",
    element: completeMenu(false, { active: true }),
  },
];

describe("GIVEN MenuButton and Menu under the themes of the previous release", () => {
  describe.each(fixtures)("WHEN rendering $name", ({ element }) => {
    it.each(previousReleaseThemes)(
      "MenuButton AC-008, Menu AC-004: SHOULD match the previous release markup under %s",
      (theme) => {
        expect(renderMarkup(theme, element)).toMatchSnapshot();
      }
    );

    it("MenuButton AC-011, AC-016, Menu AC-008, AC-012: SHOULD render next, next-dark and no provider exactly as base", () => {
      const baseMarkup = renderMarkup("base", element);
      expect(baseMarkup).toBeTruthy();
      expect(renderMarkup("next", element)).toEqual(baseMarkup);
      expect(renderMarkup("next-dark", element)).toEqual(baseMarkup);
      expect(renderMarkup("no provider", element)).toEqual(baseMarkup);
    });
  });
});
