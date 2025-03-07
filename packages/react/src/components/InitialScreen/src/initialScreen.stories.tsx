import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Button, Link } from "@nimbus-ds/components";
import {
  BagIcon,
  BoxUnpackedIcon,
  FireIcon,
  TagIcon,
  TiendanubeIcon,
} from "@nimbus-ds/icons";

import { CalloutCard } from "@nimbus-ds/callout-card";
import { InitialScreen } from "./InitialScreen";

const meta: Meta<typeof InitialScreen> = {
  title: "Patterns/InitialScreen",
  component: InitialScreen,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InitialScreen>;

export const basic: Story = {
  render: () => (
    <InitialScreen>
      <InitialScreen.Hero
        subtitle={"Impulsá tus ventas con".toUpperCase()}
        title="Marketing Automation"
        description="Aumentá las visitas a tu sitio, captá nuevos suscriptores, optimizá las conversiones, recuperá y fidelizá clientes implementando email marketing y automation."
        actions={
          <>
            <Button appearance="primary">Comenzar ahora</Button>
            <Button appearance="neutral">Saber más</Button>
          </>
        }
        image={
          <img
            src="./static/mockup-perfit.jpg"
            alt="./static/mockup-perfit.jpg"
            width="100%"
          />
        }
      />
    </InitialScreen>
  ),
};

export const appModule: Story = {
  render: () => (
    <InitialScreen>
      <InitialScreen.Hero
        subtitle={"Impulsá tus ventas con".toUpperCase()}
        title="Marketing Automation"
        description="Aumentá las visitas a tu sitio, captá nuevos suscriptores, optimizá las conversiones, recuperá y fidelizá clientes implementando email marketing y automation."
        actions={
          <>
            <Button appearance="primary">Comenzar ahora</Button>
            <Button appearance="neutral">Saber más</Button>
          </>
        }
        image={
          <img
            src="./static/mockup-perfit.jpg"
            alt="./static/mockup-perfit.jpg"
            width="100%"
          />
        }
      >
        <InitialScreen.Module
          title="¿Querés crear promociones?"
          description="Instale aplicativos para fazer dropshipping e venda productos sem a necessidade de manter estoque."
        >
          <CalloutCard
            appearance="primary"
            title="Ali Express"
            subtitle="This component is used to provide the user with useful information, tips, tutorials or shortcuts to other parts of the product."
            link={
              <Box display="flex" gap="3">
                <Link appearance="primary">Instalar</Link>
                <Link appearance="primary">Más apps de Ali express</Link>
              </Box>
            }
            icon={BoxUnpackedIcon}
          />
        </InitialScreen.Module>
      </InitialScreen.Hero>
    </InitialScreen>
  ),
};

export const bullets: Story = {
  render: () => (
    <InitialScreen>
      <InitialScreen.Hero
        subtitle={"META".toUpperCase()}
        title="¡Vendé más con Instagram y Facebook!"
        bullets={
          <>
            <InitialScreen.Bullet
              icon={<FireIcon />}
              text="Integración gratis y rápida"
            />
            <InitialScreen.Bullet
              icon={<BagIcon />}
              text="Sincronización de catálogo en tiempo real"
            />
            <InitialScreen.Bullet
              icon={<TagIcon />}
              text="Creación y seguimiento de campañas"
            />
            <InitialScreen.Bullet
              icon={<TiendanubeIcon />}
              text="Medición de conversiones con API y píxel de Meta"
            />
          </>
        }
        actions={<Button appearance="primary">Conectar cuenta</Button>}
        image={
          <img
            src="./static/product.jpg"
            alt="./static/product.jpg"
            width="100%"
          />
        }
      />
    </InitialScreen>
  ),
};
