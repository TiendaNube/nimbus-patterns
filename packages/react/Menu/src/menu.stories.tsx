import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line
import { useArgs } from "@storybook/client-api";

import {
  HomeIcon,
  StatsIcon,
  CashIcon,
  TagIcon,
  UserIcon,
  DiscountCircleIcon,
  ToolsIcon,
  AppsIcon,
  EcosystemIcon,
  CogIcon,
  ExternalLinkIcon,
  TiendanubeIcon,
} from "@nimbus-ds/icons";

import {
  Sidebar,
  Button,
  Box,
  Badge,
  Tag,
  IconButton,
  Icon,
  Text,
} from "@nimbus-ds/components";
import { MenuButton } from "@nimbus-ds/menubutton";

import { Menu } from "./Menu";

export default {
  title: "Patterns/Menu",
  component: Menu,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "Menu.Body": Menu.Body,
    "Menu.Button": MenuButton,
    "Menu.Footer": Menu.Footer,
    "Menu.Header": Menu.Header,
    "Menu.Section": Menu.Section,
  },
  argTypes: {},
} as ComponentMeta<typeof Menu>;

const SampleMenu = (
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
        <Menu.Button startIcon={HomeIcon} label="Inicio" />
        <Menu.Button startIcon={StatsIcon} label="Estadísticas" />
      </Menu.Section>
      <Menu.Section title="Administrar">
        <Box backgroundColor="primary.surface" borderRadius=".5rem">
          <Menu.Button
            id="control-1"
            aria-expanded
            aria-controls="content-1"
            startIcon={CashIcon}
            label="Ventas"
          >
            <Badge appearance="primary" count="1299" />
          </Menu.Button>
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
            <Menu.Button label="Lista de ventas" active />
            <Menu.Button label="Exportar lista" />
          </Box>
        </Box>
        <Menu.Button startIcon={TagIcon} label="Productos" />
        <Menu.Button startIcon={UserIcon} label="Clientes">
          <Tag appearance="primary">¡Nuevo!</Tag>
        </Menu.Button>
        <Menu.Button startIcon={DiscountCircleIcon} label="Marketing" />
      </Menu.Section>
      <Menu.Section title="Personalizar">
        <Menu.Button startIcon={ToolsIcon} label="Mi Tiendanube" />
      </Menu.Section>
      <Menu.Section title="Potenciar">
        <Menu.Button startIcon={AppsIcon} label="Mis aplicaciones" />
        <Menu.Button startIcon={EcosystemIcon} label="Canales de venta" />
      </Menu.Section>
    </Menu.Body>
    <Menu.Footer label="Configuración" startIcon={CogIcon} />
  </Menu>
);

const Template: ComponentStory<typeof Menu> = () => SampleMenu;

const TemplateWithSidebar: ComponentStory<typeof Menu> = (args) => {
  const [{ open }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ open: !open });
  return (
    <>
      <Button onClick={handleClose}>Open</Button>
      <Sidebar {...args} onRemove={handleClose} open={open}>
        {SampleMenu}
      </Sidebar>
    </>
  );
};

const TemplateWithFixedBar: ComponentStory<typeof Menu> = () => (
  <Box display="flex" gap="4">
    <Box
      display="flex"
      flex="0 1 auto"
      width="20rem"
      height="100vh"
      borderColor="neutral.surfaceHighlight"
      borderStyle="solid"
      borderWidth="0 1px 0 0"
      position="sticky"
      left="0"
      top="0"
      overflow="hidden"
    >
      {SampleMenu}
    </Box>
    <Box
      display="flex"
      flex="1 1 auto"
      backgroundColor="primary.surface"
      borderColor="primary.interactive"
      borderStyle="dashed"
      borderWidth="1px"
      borderRadius=".5rem"
      height="2000px"
      width="100%"
      padding="4"
    />
  </Box>
);

export const sampleAppMenu = Template.bind({});
sampleAppMenu.args = {};

export const menuInsideSidebar = TemplateWithSidebar.bind({});
menuInsideSidebar.args = {};

export const menuInsideFixedBar = TemplateWithFixedBar.bind({});
menuInsideFixedBar.args = {};
