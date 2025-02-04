import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Button, Text, Thumbnail } from "@nimbus-ds/components";
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

export const bullets: Story = {
  render: () => (
    <LandingScreen>
      <LandingScreen.Hero
        subtitle={"META".toUpperCase()} // Deberia ser responsabilidad del Hero hacer uppercase este subtitle?
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
          <Box display="flex" flexDirection="column" gap="3">
            <Text
              fontSize="highlight"
              fontWeight="medium"
              color="neutral-textHigh"
            >
              Title/Highlight text
            </Text>
            <Text fontSize="caption">
              Instale aplicaciones para vender productos
            </Text>
          </Box>

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
        <LandingScreen.CardLayout>
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
            <LandingScreen.FeatureImage>
              <Thumbnail
                // width="100%"
                alt="./static/feature_img.png"
                src="./static/feature_img.png"
                aspectRatio="4/3"
              />
            </LandingScreen.FeatureImage>
          }
        />
      </LandingScreen.Section>
      <LandingScreen.Section title="Planes" />
    </LandingScreen>
  ),
};
