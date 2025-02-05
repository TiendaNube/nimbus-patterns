import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Button, Link, Thumbnail } from "@nimbus-ds/components";
import {
  BagIcon,
  BoxPackedIcon,
  BoxUnpackedIcon,
  FireIcon,
  TagIcon,
  TiendanubeIcon,
} from "@nimbus-ds/icons";

import { CalloutCard } from "@nimbus-ds/callout-card";
import { LandingScreen } from "./LandingScreen";
import { LandingScreenBullet } from "./components/LandingScreenBullet";

const meta: Meta<typeof LandingScreen> = {
  title: "Patterns/LandingScreen",
  component: LandingScreen,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LandingScreen>;

export const basic: Story = {
  render: () => (
    <LandingScreen>
      <LandingScreen.Hero
        subtitle={"Impulsá tus ventas con".toUpperCase()} // Deberia ser responsabilidad del Hero hacer uppercase este subtitle?
        title="Marketing Automation"
        description="Aumentá las visitas a tu sitio, captá nuevos suscriptores, optimizá las conversiones, recuperá y fidelizá clientes implementando email marketing y automation."
        actions={
          <>
            <Button appearance="primary">Comenzar ahora</Button>
            <Button appearance="neutral">Saber más</Button>
          </>
        }
        image={{
          alt: "hero image",
          src: "./static/mockup-perfit.jpg",
        }}
      />
    </LandingScreen>
  ),
};

export const appModule: Story = {
  render: () => (
    <LandingScreen>
      <LandingScreen.Hero
        subtitle={"Impulsá tus ventas con".toUpperCase()}
        title="Marketing Automation"
        description="Aumentá las visitas a tu sitio, captá nuevos suscriptores, optimizá las conversiones, recuperá y fidelizá clientes implementando email marketing y automation."
        actions={
          <>
            <Button appearance="primary">Comenzar ahora</Button>
            <Button appearance="neutral">Saber más</Button>
          </>
        }
        image={{
          alt: "hero image",
          src: "./static/mockup-perfit.jpg",
        }}
      >
        <LandingScreen.Module
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
        </LandingScreen.Module>
      </LandingScreen.Hero>
    </LandingScreen>
  ),
};

export const bullets: Story = {
  render: () => (
    <LandingScreen>
      <LandingScreen.Hero
        subtitle={"META".toUpperCase()}
        title="¡Vendé más con Instagram y Facebook!"
        bullets={[
          <LandingScreenBullet
            icon={<FireIcon />}
            text="Integración gratis y rápida"
          />,
          <LandingScreenBullet
            icon={<BagIcon />}
            text="Sincronización de catálogo en tiempo real"
          />,
          <LandingScreenBullet
            icon={<TagIcon />}
            text="Creación y seguimiento de campañas"
          />,
          <LandingScreenBullet
            icon={<TiendanubeIcon />}
            text="Medición de conversiones con API y píxel de Meta"
          />,
        ]}
        actions={<Button appearance="primary">Conectar cuenta</Button>}
        image={{
          alt: "hero image",
          src: "./static/3_320x320.jpg",
        }}
      />
    </LandingScreen>
  ),
};

export const sections: Story = {
  render: () => (
    <LandingScreen>
      <LandingScreen.Hero
        subtitle={"Impulsá tus ventas con".toUpperCase()}
        title="Marketing Automation"
        description="Aumentá las visitas a tu sitio, captá nuevos suscriptores, optimizá las conversiones, recuperá y fidelizá clientes implementando email marketing y automation."
        actions={
          <>
            <Button appearance="primary">Comenzar ahora</Button>
            <Button appearance="neutral">Saber más</Button>
          </>
        }
        image={{
          alt: "hero image",
          src: "./static/mockup-perfit.jpg",
        }}
      >
        <LandingScreen.Module
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
        </LandingScreen.Module>
      </LandingScreen.Hero>
      <LandingScreen.Section title="Beneficios">
        <LandingScreen.CardLayout>
          <LandingScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Gestión unificada"
            description="Ahorrá tiempo gestionando tus envíos de forma unificada. Vas a
              poder generar, imprimir y pagar tus etiquetas, desde el
              administrador de tu tienda."
          />

          <LandingScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Gestión unificada"
            description="Ahorrá tiempo gestionando tus envíos de forma unificada. Vas a
              poder generar, imprimir y pagar tus etiquetas, desde el
              administrador de tu tienda."
          />
          <LandingScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Gestión unificada"
            description="Ahorrá tiempo gestionando tus envíos de forma unificada. Vas a
              poder generar, imprimir y pagar tus etiquetas, desde el
              administrador de tu tienda."
          />
        </LandingScreen.CardLayout>
      </LandingScreen.Section>
      <LandingScreen.Section title="Detalle">
        <LandingScreen.Feature
          content={
            <>
              <LandingScreen.FeatureItem
                title="1. Cargá saldo"
                description="Podés hacerlo con tarjeta de crédito, débito o mercado pago."
              >
                <LandingScreen.FeatureItemSpacing />
              </LandingScreen.FeatureItem>

              <LandingScreen.FeatureItem
                title="2. Generá la etiqueta"
                description="Revisá los datos y en simples pasos creá la etiqueta."
              >
                <LandingScreen.FeatureItemSpacing />
              </LandingScreen.FeatureItem>
              <LandingScreen.FeatureItem
                title="3. Imprimí la etiqueta"
                description="Una vez impresa colocala en el paquete a enviar."
              >
                <LandingScreen.FeatureItemSpacing />
              </LandingScreen.FeatureItem>
              <LandingScreen.FeatureItem
                title="4. Despachá el paquete"
                description="Podés despachar el paquete en cualquier sucursal de Correo Argentino o Andreani, o puntos de despacho."
              />
            </>
          }
          image={
            <Thumbnail
              alt="./static/feature_img.png"
              src="./static/feature_img.png"
              aspectRatio="4/3"
            />
          }
        />
      </LandingScreen.Section>
      <LandingScreen.Section title="Planes" />
    </LandingScreen>
  ),
};
