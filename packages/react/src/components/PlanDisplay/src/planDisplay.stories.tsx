import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box, Button, Tag, Text, Title } from "@nimbus-ds/components";
import { CheckIcon, CloseIcon, StoreIcon } from "@nimbus-ds/icons";
import { PlanDisplay } from "./PlanDisplay";

const meta: Meta<typeof PlanDisplay> = {
  title: "Patterns/PlanDisplay",
  component: PlanDisplay,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlanDisplay>;

export const twoPlans: Story = {
  render: () => (
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
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Descuentos personalizados
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Registro de clientes
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Búsqueda de clientes
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Venta con envío
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Venta sin stock
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Registro de medio de pago
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Escaneo de producto
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Gestión de caja
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Asignación de vendedor
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Creación de productos durante la venta
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Guardar carritos
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Atajos de teclado
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
      </PlanDisplay.Card>
      <PlanDisplay.Card ribbonLabel="Más elegido">
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
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Descuentos personalizados
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Registro de clientes
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
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
  ),
};

export const threePlans: Story = {
  render: () => (
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
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Descuentos personalizados
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Registro de clientes
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Búsqueda de clientes
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Venta con envío
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Venta sin stock
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Registro de medio de pago
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Escaneo de producto
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Gestión de caja
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Asignación de vendedor
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Creación de productos durante la venta
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Guardar carritos
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
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
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Descuentos personalizados
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Registro de clientes
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
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
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Creación de productos durante la venta
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Guardar carritos
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="No incluido">
            Atajos de teclado
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
      </PlanDisplay.Card>
      <PlanDisplay.Card ribbonLabel="Más elegido">
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
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Descuentos personalizados
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Registro de clientes
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
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
  ),
};

// AC-08 — Responsive composition: horizontal is a consumer composition
// assembled from a single PlanDisplay.Card's existing subcomponents, laid
// out in a row — not a new PlanDisplay prop or a new named runtime variant.
export const horizontal: Story = {
  render: () => (
    <Box maxWidth="740px">
      <PlanDisplay.Card ribbonLabel="Más elegido">
        <Box display="flex" flexDirection="row" gap="4" alignItems="flex-start">
          <PlanDisplay.Header title={<Title as="h4">Pro</Title>} subtitle="For growing stores" />
          <PlanDisplay.Content>
            <PlanDisplay.Price price="$29" period="/month" />
            <PlanDisplay.Bullet icon={<CheckIcon />}>
              Unlimited products
            </PlanDisplay.Bullet>
            <PlanDisplay.Bullet icon={<CheckIcon />}>
              Priority support
            </PlanDisplay.Bullet>
          </PlanDisplay.Content>
        </Box>
        <PlanDisplay.Footer>
          <Button appearance="primary">Choose plan</Button>
        </PlanDisplay.Footer>
      </PlanDisplay.Card>
    </Box>
  ),
};

// AC-08 — Responsive composition: horizontal-mobile arranges the same single
// card's content and order as `horizontal` above, but vertically. No
// automatic breakpoint transition between the two is implemented or
// promised — each is a distinct, explicit usage example.
export const horizontalMobile: Story = {
  render: () => (
    <Box maxWidth="361px">
      <PlanDisplay.Card ribbonLabel="Más elegido">
        <Box display="flex" flexDirection="column" gap="4" alignItems="stretch">
          <PlanDisplay.Header title={<Title as="h4">Pro</Title>} subtitle="For growing stores" />
          <PlanDisplay.Content>
            <PlanDisplay.Price price="$29" period="/month" />
            <PlanDisplay.Bullet icon={<CheckIcon />}>
              Unlimited products
            </PlanDisplay.Bullet>
            <PlanDisplay.Bullet icon={<CheckIcon />}>
              Priority support
            </PlanDisplay.Bullet>
          </PlanDisplay.Content>
        </Box>
        <PlanDisplay.Footer>
          <Button appearance="primary">Choose plan</Button>
        </PlanDisplay.Footer>
      </PlanDisplay.Card>
    </Box>
  ),
};

// Canonical visual-validation story (issue #185 validation amendment —
// "ribbon visual contract"). This is the fixture used to validate AC-02's
// ribbon treatment and AC-07's comparison alignment against the approved
// visual reference: full-width ribbon, primary-interactive background,
// centered neutral-background text, shared top border radius with the card
// surface (no seam), 2px primary-interactive border, and no default
// level-2 shadow. It is a validation fixture built entirely from the
// existing public composition (`.Card`, `.Header`, `.Price`, `.Content`,
// `.Bullet`, `.Footer`) — it does not introduce any new prop or variant.
export const canonicalRibbon: Story = {
  render: () => (
    <Box maxWidth="320px">
      <PlanDisplay.Card ribbonLabel="Más escogido">
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
        />
        <PlanDisplay.Content>
          <PlanDisplay.Price price="$219.999" period="/mes" />
          <Text fontWeight="regular" color="neutral-textLow">
            Gestión avanzada y control total para tu negocio.
          </Text>
          <PlanDisplay.Bullet icon={<CheckIcon aria-hidden="true" />}>
            Funciones heredadas del plan anterior
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon aria-hidden="true" />}>
            Campos personalizados
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet
            icon={<CheckIcon aria-hidden="true" />}
            badge={<Tag appearance="success">Nuevo</Tag>}
          >
            Tablas de precios mayoristas
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon aria-hidden="true" />}>
            Gestión con inteligencia artificial
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet
            icon={<CloseIcon aria-hidden="true" />}
            disabled
            unavailableLabel="No incluido"
          >
            Soporte prioritario
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
        <PlanDisplay.Footer icon={<StoreIcon aria-hidden="true" />}>
          <Box display="flex" flexDirection="column" gap="2" width="100%">
            <Button appearance="primary">Subir de plan</Button>
            <Text fontSize="caption" color="neutral-textLow">
              Punto de venta Plus
            </Text>
          </Box>
        </PlanDisplay.Footer>
      </PlanDisplay.Card>
    </Box>
  ),
};

// Migration example: the removed `highlighted` prop is replaced by
// `ribbonLabel` (or `gradient`) for plan emphasis.
export const migrationFromHighlighted: Story = {
  render: () => (
    <Box display="flex" gap="6">
      <PlanDisplay.Card ribbonLabel="Most popular">
        <PlanDisplay.Header title={<Title as="h4">Pro</Title>} subtitle="For growing stores" />
        <PlanDisplay.Content>
          <PlanDisplay.Price price="$29" period="/month" />
        </PlanDisplay.Content>
      </PlanDisplay.Card>
      <PlanDisplay.Card gradient>
        <PlanDisplay.Header title={<Title as="h4">Pro</Title>} subtitle="For growing stores" />
        <PlanDisplay.Content>
          <PlanDisplay.Price price="$29" period="/month" />
        </PlanDisplay.Content>
      </PlanDisplay.Card>
    </Box>
  ),
};
