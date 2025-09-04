import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Button, Icon, Link, Text, Title } from "@nimbus-ds/components";
import {
  BoxPackedIcon,
  CheckIcon,
  CloseIcon,
  ExternalLinkIcon,
} from "@nimbus-ds/icons";

import { InitialScreen, PlanDisplay, HelpLink } from "@nimbus-ds/patterns";

const meta: Meta = {
  title: "Templates/LandingScreen",
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const sampleImage = (
  <Box
    backgroundColor="primary-surface"
    borderColor="primary-interactive"
    borderStyle="dashed"
    borderWidth="1"
    borderRadius="2"
    flexGrow="1"
    minWidth="180px"
    maxWidth="480px"
    height="100%"
    minHeight="192px"
    display="flex"
    alignItems="center"
    justifyContent="center"
  />
);

/**
 * The LandingScreen template is used to introduce users to an application or service, offering options to access more information or proceed further.
 * It is composed of several sections, each with a different purpose, such as presenting the main features, benefits, and plans. It is a flexible template that can be customized to fit the needs of the application or service, combined with two main pattern components: InitialScreen and PlanDisplay.
 */
export const base: Story = {
  render: () => (
    <InitialScreen mx="auto">
      <InitialScreen.Hero
        subtitle="SUBTITLE"
        title="Title text"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type. "
        actions={
          <>
            <Button appearance="primary">Button</Button>
            <Button>Button</Button>
          </>
        }
        image={sampleImage}
        backgroundColor={{ xs: "neutral-background", md: "transparent" }}
      >
        <HelpLink>
          <Box py="4">
            <Link
              as="a"
              href="https://nimbus.tiendanube.com/"
              target="_blank"
              appearance="primary"
              textDecoration="none"
            >
              Help link{" "}
              <Icon color="currentColor" source={<ExternalLinkIcon />} />
            </Link>
          </Box>
        </HelpLink>
      </InitialScreen.Hero>
      <InitialScreen.Section
        title="Title text - Beneficios"
        backgroundColor={{ xs: "neutral-surface", md: "transparent" }}
      >
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
      <InitialScreen.Section
        title="Title text - Detalle"
        backgroundColor={{ xs: "neutral-background", md: "transparent" }}
      >
        <InitialScreen.Feature
          content={
            <>
              <InitialScreen.FeatureItem
                title="Detail text"
                description="Lorem ipsum is simply dummy text of the printing and typesetting industry."
              >
                <InitialScreen.FeatureItemSpacing />
              </InitialScreen.FeatureItem>

              <InitialScreen.FeatureItem
                title="Detail text"
                description="Lorem ipsum is simply dummy text of the printing and typesetting industry."
              >
                <InitialScreen.FeatureItemSpacing />
              </InitialScreen.FeatureItem>
              <InitialScreen.FeatureItem
                title="Detail text"
                description="Lorem ipsum is simply dummy text of the printing and typesetting industry."
              >
                <InitialScreen.FeatureItemSpacing />
              </InitialScreen.FeatureItem>
              <InitialScreen.FeatureItem
                title="Detail text"
                description="Lorem ipsum is simply dummy text of the printing and typesetting industry."
              />
            </>
          }
          image={sampleImage}
        />
      </InitialScreen.Section>
      <InitialScreen.Section
        title="Title text - Planes"
        backgroundColor={{ xs: "neutral-surface", md: "transparent" }}
      >
        <PlanDisplay mx="4">
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
