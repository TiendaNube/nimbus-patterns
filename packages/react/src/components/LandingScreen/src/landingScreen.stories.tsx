import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Button,
  List,
  Text,
  Thumbnail,
  Title,
} from "@nimbus-ds/components";
import {
  BagIcon,
  BoxPackedIcon,
  BoxUnpackedIcon,
  FireIcon,
  TagIcon,
  TiendanubeIcon,
} from "@nimbus-ds/icons";

import { CalloutCard } from "@nimbus-ds/callout-card";
import { Layout } from "@nimbus-ds/layout";
import { LandingScreen } from "./LandingScreen";
import LandingScreenheroBullet from "./components/LandingScreenHeroBullet";

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

export const bullets: Story = {
  render: () => (
    <LandingScreen>
      <LandingScreen.Hero
        subtitle={"META".toUpperCase()} // Deberia ser responsabilidad del Hero hacer uppercase este subtitle?
        title="¡Vendé más con Instagram y Facebook!"
        bullets={[
          <LandingScreenheroBullet
            icon={<FireIcon />}
            text="Integración gratis y rápida"
          />,
          <LandingScreenheroBullet
            icon={<BagIcon />}
            text="Sincronización de catálogo en tiempo real"
          />,
          <LandingScreenheroBullet
            icon={<TagIcon />}
            text="Creación y seguimiento de campañas"
          />,
          <LandingScreenheroBullet
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
      >
        {/* LandingScren.AppModule/ */}
        <Box display="flex" flexDirection="column" gap="4">
          <Title as="h4">Title/Highlight text</Title>
          <Text fontSize="caption">
            Instale aplicaciones para vender productos
          </Text>

          {/* Module app card */}
          <CalloutCard
            appearance="primary"
            title="Title app (link)"
            subtitle="Promociones (mas de 15 opciones)..."
            icon={BoxUnpackedIcon}
          />
        </Box>
      </LandingScreen.Hero>
      <LandingScreen.Section title="Beneficios">
        <Box display="flex" gap="3">
          <LandingScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Gestión unificada"
          >
            <Text>
              Ahorrá tiempo gestionando tus envíos de forma unificada. Vas a
              poder generar, imprimir y pagar tus etiquetas, desde el
              administrador de tu tienda.
            </Text>
          </LandingScreen.Card>

          <LandingScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Gestión unificada"
          >
            <Text>
              Ahorrá tiempo gestionando tus envíos de forma unificada. Vas a
              poder generar, imprimir y pagar tus etiquetas, desde el
              administrador de tu tienda.
            </Text>
          </LandingScreen.Card>
          <LandingScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Gestión unificada"
          >
            <Text>
              Ahorrá tiempo gestionando tus envíos de forma unificada. Vas a
              poder generar, imprimir y pagar tus etiquetas, desde el
              administrador de tu tienda.
            </Text>
            <Box marginTop="1">
              <Button>
                Más info <i>(prueba de flexibilidad)</i>
              </Button>
            </Box>
          </LandingScreen.Card>
        </Box>
      </LandingScreen.Section>
      <LandingScreen.Section title="Detalle">
        <Layout columns="2 - symmetric" width="100%">
          <Layout.Section>
            <List as="ol">
              <List.Item>
                <Title>Cargá saldo</Title>
                <Text>
                  Podés hacerlo con tarjeta de crédito, débito o mercado pago.
                </Text>
              </List.Item>
            </List>
          </Layout.Section>
          <Layout.Section>
            <Thumbnail
              width="100%"
              alt="./static/mockup-perfit.jpg"
              src="./static/mockup-perfit.jpg"
              aspectRatio="4/3"
            />
          </Layout.Section>
        </Layout>
      </LandingScreen.Section>
      <LandingScreen.Section title="Planes" />
    </LandingScreen>
  ),
};
