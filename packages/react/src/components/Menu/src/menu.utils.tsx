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
  CogIcon
} from "@nimbus-ds/icons";
import { Box, Badge, Tag, Icon } from "@nimbus-ds/components";
import { Menu } from "./Menu";

const TiendanubeLogo: React.FC = () => (
  <svg
    width="120"
    height="20"
    viewBox="0 0 120 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M17.8 0C17.78 0 17.78 0 17.78 0C15.16 0 12.68 1.02 10.82 2.84C9.88 2.44 8.84 2.22 7.78 2.22C3.5 2.22 0 5.7 0 10C0 14.3 3.48 17.78 7.78 17.78C8.82 17.78 9.86 17.56 10.8 17.16C12.6 18.92 15.06 20 17.76 20C23.28 20 27.76 15.52 27.76 10C27.78 4.5 23.3 0 17.8 0ZM17.78 17.78C13.5 17.78 10 14.3 10 10H7.78C7.78 11.96 8.34 13.8 9.32 15.34C8.82 15.48 8.3 15.56 7.78 15.56C4.72 15.56 2.22 13.06 2.22 10C2.22 6.94 4.72 4.44 7.78 4.44C9 4.44 10.14 4.82 11.12 5.56C12.54 6.62 13.34 8.24 13.34 10H15.58C15.58 7.68 14.58 5.52 12.8 4.04C14.2 2.88 15.96 2.22 17.8 2.22C22.08 2.22 25.58 5.72 25.58 10C25.56 14.28 22.08 17.78 17.78 17.78Z"
    />
    <path
      fill="currentColor"
      d="M33.42 15.58V8.46001H31.92V6.68001H33.42V4.04001H35.52V6.68001H37.02V8.46001H35.52V15.58H33.42Z"
    />
    <path
      fill="currentColor"
      d="M39.2 5.38001C38.5 5.38001 37.92 4.80001 37.92 4.10001C37.92 3.38001 38.5 2.80001 39.2 2.80001C39.94 2.80001 40.5 3.40001 40.5 4.10001C40.5 4.80001 39.96 5.38001 39.2 5.38001ZM38.18 15.58V6.68001H40.28V15.58H38.18Z"
    />
    <path
      fill="currentColor"
      d="M50.14 13.48C49.4 14.88 48.02 15.78 46.12 15.78C43.42 15.78 41.5 13.86 41.5 11.12C41.5 8.46001 43.46 6.46001 46.02 6.46001C48.62 6.46001 50.44 8.46001 50.44 11.12C50.44 11.28 50.44 11.5 50.42 11.76H43.58C43.68 13.04 44.82 14.02 46.14 14.02C47.3 14.02 47.9 13.46 48.4 12.68L50.14 13.48ZM48.36 10.24C48.22 9.06001 47.28 8.18001 45.98 8.18001C44.72 8.18001 43.74 9.22001 43.6 10.24H48.36Z"
    />
    <path
      fill="currentColor"
      d="M53.68 15.58H51.58V6.68001H53.68V7.86001C54.24 7.00001 55.16 6.46001 56.4 6.46001C58.58 6.46001 59.84 7.90001 59.84 10.22V15.58H57.74V10.62C57.74 9.24001 57.06 8.40001 55.76 8.40001C54.5 8.40001 53.68 9.36001 53.68 10.88V15.58Z"
    />
    <path
      fill="currentColor"
      d="M68.3 15.58V14.3C67.64 15.22 66.52 15.78 65.28 15.78C62.82 15.78 60.94 13.78 60.94 11.12C60.94 8.50001 62.82 6.46001 65.28 6.46001C66.52 6.46001 67.64 6.96001 68.3 7.90001V3.34001H70.38V15.58H68.3ZM65.72 13.88C67.22 13.88 68.38 12.64 68.38 11.12C68.38 9.60001 67.22 8.36001 65.72 8.36001C64.22 8.36001 63.06 9.60001 63.06 11.12C63.06 12.64 64.22 13.88 65.72 13.88Z"
    />
    <path
      fill="currentColor"
      d="M74.78 10.32L77.2 10.02V9.64001C77.2 8.76001 76.58 8.18001 75.62 8.18001C74.72 8.18001 74.14 8.64001 73.86 9.52001L71.94 9.02001C72.38 7.42001 73.8 6.44001 75.62 6.44001C77.94 6.44001 79.24 7.66001 79.24 9.76001V15.54H77.28L77.26 14.46C76.66 15.32 75.64 15.76 74.48 15.76C72.8 15.76 71.62 14.68 71.62 13.18C71.62 11.6 72.68 10.64 74.78 10.32ZM74.98 14.1C76.28 14.1 77.22 13.26 77.22 12.08V11.58L75.2 11.86C74.2 11.98 73.72 12.44 73.72 13.08C73.72 13.72 74.24 14.1 74.98 14.1Z"
    />
    <path
      fill="currentColor"
      d="M83.04 15.58H80.94V6.68001H83.04V7.86001C83.6 7.00001 84.52 6.46001 85.76 6.46001C87.94 6.46001 89.2 7.90001 89.2 10.22V15.58H87.1V10.62C87.1 9.24001 86.42 8.40001 85.12 8.40001C83.86 8.40001 83.04 9.36001 83.04 10.88V15.58Z"
    />
    <path
      fill="currentColor"
      d="M90.72 11.74V6.68002H92.82V11.62C92.82 13.02 93.5 13.86 94.68 13.86C95.84 13.86 96.54 13.02 96.54 11.62V6.68002H98.64V11.74C98.64 14.3 97.16 15.78 94.68 15.78C92.22 15.8 90.72 14.3 90.72 11.74Z"
    />
    <path
      fill="currentColor"
      d="M100.32 15.58V3.34001H102.4V7.96001C103.06 7.04001 104.18 6.48001 105.42 6.48001C107.88 6.48001 109.76 8.48001 109.76 11.14C109.76 13.76 107.88 15.8 105.42 15.8C104.18 15.8 103.06 15.3 102.4 14.36V15.58H100.32ZM105 8.36001C103.5 8.36001 102.34 9.60001 102.34 11.12C102.34 12.64 103.5 13.88 105 13.88C106.5 13.88 107.66 12.64 107.66 11.12C107.66 9.60001 106.5 8.36001 105 8.36001Z"
    />
    <path
      fill="currentColor"
      d="M119.12 13.48C118.38 14.88 117 15.78 115.1 15.78C112.4 15.78 110.48 13.86 110.48 11.12C110.48 8.46001 112.44 6.46001 115 6.46001C117.6 6.46001 119.42 8.46001 119.42 11.12C119.42 11.28 119.42 11.5 119.4 11.76H112.56C112.66 13.04 113.8 14.02 115.12 14.02C116.28 14.02 116.88 13.46 117.38 12.68L119.12 13.48ZM117.34 10.24C117.2 9.06001 116.26 8.18001 114.96 8.18001C113.7 8.18001 112.72 9.22001 112.58 10.24H117.34Z"
    />
  </svg>
);

export const MenuStories = (
  <Menu>
    <Menu.Header>
      <Box display="flex" gap="2" alignItems="center" width="100%">
        <Icon source={<TiendanubeLogo />} color="primary-interactive" />
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
            "aria-controls": "content-1"
          }}
        >
          <Menu.Button label="Lista de ventas" />
          <Menu.Button label="Exportar lista" />
        </Menu.ButtonAccordion>
        <Menu.Button startIcon={TagIcon} label="Productos" />
        <Menu.Button startIcon={UserIcon} label="Clientes">
          <Tag appearance="primary">Nuevo</Tag>
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
