import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Button, Text, Thumbnail, Title } from "@nimbus-ds/components";
import {
  BagIcon,
  BoxPackedIcon,
  CheckIcon,
  CloseIcon,
  FireIcon,
  TagIcon,
  TiendanubeIcon,
} from "@nimbus-ds/icons";

import { PlanDisplay } from "@nimbus-ds/plan-display";
import { InitialScreen } from "@nimbus-ds/initial-screen";

const meta: Meta = {
  title: "Templates/LandingScreen",
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const base: Story = {
  render: (args) => (
    <InitialScreen>
      <InitialScreen.Hero
        subtitle={"META".toUpperCase()}
        title="¡Vendé más con Instagram y Facebook!"
        bullets={[
          <InitialScreen.Bullet
            icon={<FireIcon />}
            text="Integración gratis y rápida"
          />,
          <InitialScreen.Bullet
            icon={<BagIcon />}
            text="Sincronización de catálogo en tiempo real"
          />,
          <InitialScreen.Bullet
            icon={<TagIcon />}
            text="Creación y seguimiento de campañas"
          />,
          <InitialScreen.Bullet
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
      <InitialScreen.Section title="Beneficios">
        <InitialScreen.CardLayout>
          <InitialScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Gestión unificada"
            description="Ahorrá tiempo gestionando tus envíos de forma unificada. Vas a
              poder generar, imprimir y pagar tus etiquetas, desde el
              administrador de tu tienda."
          />

          <InitialScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Gestión unificada"
            description="Ahorrá tiempo gestionando tus envíos de forma unificada. Vas a
              poder generar, imprimir y pagar tus etiquetas, desde el
              administrador de tu tienda."
          />
          <InitialScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Gestión unificada"
            description="Ahorrá tiempo gestionando tus envíos de forma unificada. Vas a
              poder generar, imprimir y pagar tus etiquetas, desde el
              administrador de tu tienda."
          />
        </InitialScreen.CardLayout>
      </InitialScreen.Section>
      <InitialScreen.Section title="Detalle">
        <InitialScreen.Feature
          content={
            <>
              <InitialScreen.FeatureItem
                title="1. Cargá saldo"
                description="Podés hacerlo con tarjeta de crédito, débito o mercado pago."
              >
                <InitialScreen.FeatureItemSpacing />
              </InitialScreen.FeatureItem>

              <InitialScreen.FeatureItem
                title="2. Generá la etiqueta"
                description="Revisá los datos y en simples pasos creá la etiqueta."
              >
                <InitialScreen.FeatureItemSpacing />
              </InitialScreen.FeatureItem>
              <InitialScreen.FeatureItem
                title="3. Imprimí la etiqueta"
                description="Una vez impresa colocala en el paquete a enviar."
              >
                <InitialScreen.FeatureItemSpacing />
              </InitialScreen.FeatureItem>
              <InitialScreen.FeatureItem
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
      </InitialScreen.Section>
      <InitialScreen.Section title="Planes">
        <PlanDisplay>
          <PlanDisplay.Card>
            <PlanDisplay.Header
              subtitle="Punto de venta"
              title={
                <Box display="flex" gap="1">
                  <Title as="h3" color="neutral-textLow">
                    Plan
                  </Title>
                  <Title as="h3" color="neutral-textHigh">
                    Básico
                  </Title>
                </Box>
              }
            >
              <Title as="h5">Suscripción gratuita</Title>
              <Text fontWeight="bold" fontSize="highlight">
                1.5% costo por transacción
              </Text>
            </PlanDisplay.Header>
            <PlanDisplay.Content>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Descuentos personalizados
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Registro de clientes
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Búsqueda de clientes
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Venta con envío
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Venta sin stock
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Registro de medio de pago
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Escaneo de producto
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Gestión de caja
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Asignación de vendedor
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Creación de productos durante la venta
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Guardar carritos
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Atajos de teclado
              </PlanDisplay.Bullet>
            </PlanDisplay.Content>
          </PlanDisplay.Card>
          <PlanDisplay.Card>
            <PlanDisplay.Header
              subtitle="Punto de venta"
              title={
                <Box display="flex" gap="1">
                  <Title as="h3" color="neutral-textLow">
                    Plan
                  </Title>
                  <Title as="h3" color="neutral-textHigh">
                    Emprendedor
                  </Title>
                </Box>
              }
            >
              <Title as="h5">$6.999 / mes</Title>
              <Text fontWeight="bold" fontSize="highlight">
                0.5% costo por transacción
              </Text>
            </PlanDisplay.Header>
            <PlanDisplay.Content>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Descuentos personalizados
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Registro de clientes
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Búsqueda de clientes
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Venta con envío
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Venta sin stock
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Registro de medio de pago
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Escaneo de producto
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Gestión de caja
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Asignación de vendedor
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Creación de productos durante la venta
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Guardar carritos
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Atajos de teclado
              </PlanDisplay.Bullet>
            </PlanDisplay.Content>
          </PlanDisplay.Card>
          <PlanDisplay.Card highlighted>
            <PlanDisplay.Header
              subtitle="Punto de venta"
              title={
                <Box display="flex" gap="1">
                  <Title as="h3" color="neutral-textLow">
                    Plan
                  </Title>
                  <Title as="h3" color="neutral-textHigh">
                    Avanzado
                  </Title>
                </Box>
              }
            >
              <Title as="h5">$14.999 / mes</Title>
              <Text fontWeight="bold" fontSize="highlight">
                0.15% costo por transacción
              </Text>
            </PlanDisplay.Header>
            <PlanDisplay.Content>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Descuentos personalizados
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Registro de clientes
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Búsqueda de clientes
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Venta con envío
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Venta sin stock
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Registro de medio de pago
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Escaneo de producto
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Gestión de caja
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Asignación de vendedor
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Creación de productos durante la venta
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Guardar carritos
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Atajos de teclado
              </PlanDisplay.Bullet>
            </PlanDisplay.Content>
            <PlanDisplay.Footer>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
                gap="2"
              >
                <Button appearance="primary">
                  <Text fontSize="base" color="currentColor">
                    Comenzar gratis por 7 días*
                  </Text>
                </Button>
                <Text fontSize="caption">
                  *Al finalizar la prueba podrás elegir cancelar, continuar o
                  cambiar de plan
                </Text>
              </Box>
            </PlanDisplay.Footer>
          </PlanDisplay.Card>
        </PlanDisplay>
      </InitialScreen.Section>
    </InitialScreen>
  ),
  args: {},
};
