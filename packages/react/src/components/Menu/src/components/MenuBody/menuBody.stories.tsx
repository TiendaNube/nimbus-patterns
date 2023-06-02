import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
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
} from "@nimbus-ds/icons";
import { Badge, Tag } from "@nimbus-ds/components";

import { Menu } from "../../Menu";

const meta: Meta<typeof Menu.Body> = {
  title: "Patterns/Menu/Menu.Body",
  component: Menu.Body,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <Menu>
      <Menu.Body {...args} />
    </Menu>
  ),
};

export default meta;
type Story = StoryObj<typeof Menu.Body>;

export const basic: Story = {
  args: {
    children: (
      <>
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
      </>
    ),
  },
};
