import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Button,
  Link,
  Text,
  Thumbnail,
  Title,
} from "@nimbus-ds/components";
import {
  BagIcon,
  BoxPackedIcon,
  BoxUnpackedIcon,
  CheckIcon,
  CloseIcon,
  FireIcon,
  TagIcon,
  TiendanubeIcon,
} from "@nimbus-ds/icons";

import { CalloutCard } from "@nimbus-ds/callout-card";
import { PlanDisplay } from "@nimbus-ds/plan-display";
import { InitialScreen } from "./InitialScreen";
import { InitialScreenBullet } from "./components/InitialScreenBullet";

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
        image={{
          alt: "hero image",
          src: "./static/mockup-perfit.jpg",
        }}
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
        image={{
          alt: "hero image",
          src: "./static/mockup-perfit.jpg",
        }}
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
        bullets={[
          <InitialScreenBullet
            icon={<FireIcon />}
            text="Integración gratis y rápida"
          />,
          <InitialScreenBullet
            icon={<BagIcon />}
            text="Sincronización de catálogo en tiempo real"
          />,
          <InitialScreenBullet
            icon={<TagIcon />}
            text="Creación y seguimiento de campañas"
          />,
          <InitialScreenBullet
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
};
