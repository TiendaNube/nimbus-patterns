import React from "react";
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
import { Box, Badge, Tag, IconButton, Icon, Text } from "@nimbus-ds/components";
import { Menu } from "./Menu";

export const MenuStories = (
  <Menu>
    <Menu.Header>
      <Box display="flex" gap="2" alignItems="center" width="100%">
        <Icon
          color="neutral-textHigh"
          source={<TiendanubeIcon size="medium" />}
        />
        <Box display="inline-flex" flex="1">
          <Text fontSize="base" color="neutral-textHigh" fontWeight="bold">
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
        <Menu.ButtonAccordion
          open
          contentid="content-1"
          menuButton={{
            id: "control-1",
            startIcon: CashIcon,
            label: "Ventas",
            children: <Badge appearance="primary" count="1299" />,
            "aria-controls": "content-1",
          }}
        >
          <Menu.Button label="Lista de ventas" />
          <Menu.Button label="Exportar lista" />
        </Menu.ButtonAccordion>
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
