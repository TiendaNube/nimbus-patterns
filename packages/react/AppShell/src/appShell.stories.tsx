import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import {
  Box,
  Text,
  Button,
  Icon,
  Badge,
  Tag,
  IconButton,
} from "@nimbus-ds/components";

import { Menu } from "@nimbus-ds/menu";
import { MenuButton } from "@nimbus-ds/menubutton";
import { Page } from "@nimbus-ds/page";

import {
  AppsIcon,
  CashIcon,
  ChevronLeftIcon,
  CogIcon,
  DiscountCircleIcon,
  EcosystemIcon,
  ExternalLinkIcon,
  GiftBoxIcon,
  HomeIcon,
  StatsIcon,
  TagIcon,
  TiendanubeIcon,
  ToolsIcon,
  UserIcon,
} from "@nimbus-ds/icons";

import { AppShell } from "./AppShell";

export default {
  title: "Patterns/AppShell",
  component: AppShell,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "AppShell.Header": AppShell.Header,
  },
  argTypes: {
    children: {
      control: { disable: true },
      description: "Content to be rendered inside the app body.",
    },
    menu: {
      control: { disable: true },
      description: "Optional menu component to be rendered on a left sidebar.",
    },
  },
} as ComponentMeta<typeof AppShell>;

const backButton = (
  <Button appearance="transparent">
    <Icon source={<ChevronLeftIcon />} />
    Volver
  </Button>
);

const buttonStack = (
  <>
    <Button appearance="transparent">
      <Icon source={<GiftBoxIcon />} />
      Novedades
    </Button>
    <Button appearance="transparent">
      <Icon source={<UserIcon />} />
      Mi cuenta
    </Button>
  </>
);

const AppMenu = (
  <Menu>
    <Menu.Header>
      <Box display="flex" gap="2" alignItems="center" width="100%">
        <Icon
          color="neutral.textHigh"
          source={<TiendanubeIcon size="medium" />}
        />
        <Box display="inline-flex" flex="1">
          <Text fontSize="base" color="neutral.textHigh" fontWeight="bold">
            Tienda demo
          </Text>
        </Box>
        <IconButton source={<ExternalLinkIcon />} size="2rem" />
      </Box>
    </Menu.Header>
    <Menu.Body>
      <Menu.Section>
        <MenuButton startIcon={HomeIcon} label="Inicio" />
        <MenuButton startIcon={StatsIcon} label="Estadísticas" />
      </Menu.Section>
      <Menu.Section title="Administrar">
        <Box backgroundColor="primary.surface" borderRadius=".5rem">
          <MenuButton
            id="control-1"
            aria-expanded
            aria-controls="content-1"
            startIcon={CashIcon}
            label="Ventas"
          >
            <Badge appearance="primary" count="1299" />
          </MenuButton>
          <Box
            id="content-1"
            aria-hidden={false}
            height="auto"
            overflow="hidden"
            pl="6"
            pt="1"
            pb="1"
            pr="1"
          >
            <MenuButton label="Lista de ventas" active />
            <MenuButton label="Exportar lista" />
          </Box>
        </Box>
        <MenuButton startIcon={TagIcon} label="Productos" />
        <MenuButton startIcon={UserIcon} label="Clientes">
          <Tag appearance="primary">¡Nuevo!</Tag>
        </MenuButton>
        <MenuButton startIcon={DiscountCircleIcon} label="Marketing" />
      </Menu.Section>
      <Menu.Section title="Personalizar">
        <MenuButton startIcon={ToolsIcon} label="Mi Tiendanube" />
      </Menu.Section>
      <Menu.Section title="Potenciar">
        <MenuButton startIcon={AppsIcon} label="Mis aplicaciones" />
        <MenuButton startIcon={EcosystemIcon} label="Canales de venta" />
      </Menu.Section>
    </Menu.Body>
    <Menu.Footer label="Configuración" startIcon={CogIcon} />
  </Menu>
);

const Template: ComponentStory<typeof AppShell> = (args) => {
  const sampleMenu = (
    <Box
      backgroundColor="primary.surface"
      borderColor="primary.interactive"
      borderStyle="dashed"
      borderWidth="1px"
      borderRadius=".5rem"
      width="15rem"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="base" color="primary.interactive">
        Menu content
      </Text>
    </Box>
  );

  return (
    <AppShell {...args} menu={sampleMenu}>
      <AppShell.Header leftSlot={backButton} rightSlot={buttonStack} />
      <Box
        backgroundColor="primary.surface"
        borderColor="primary.interactive"
        borderStyle="dashed"
        borderWidth="1px"
        borderRadius=".5rem"
        width="100%"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="base" color="primary.interactive">
          Children content
        </Text>
      </Box>
    </AppShell>
  );
};

const PageTemplate: ComponentStory<typeof AppShell> = (args) => (
  <AppShell {...args} menu={AppMenu}>
    <AppShell.Header leftSlot={backButton} rightSlot={buttonStack} />
    <Page maxWidth="800px">
      <Page.Header title="Page demo" />
      <Page.Body>
        <Box
          backgroundColor="primary.surface"
          borderColor="primary.interactive"
          borderStyle="dashed"
          borderWidth="1px"
          borderRadius=".5rem"
          width="100%"
          height="500px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="base" color="primary.interactive">
            Body content
          </Text>
        </Box>
      </Page.Body>
    </Page>
  </AppShell>
);

export const base = Template.bind({});
base.args = {};

export const demoApp = PageTemplate.bind({});
demoApp.args = {};
