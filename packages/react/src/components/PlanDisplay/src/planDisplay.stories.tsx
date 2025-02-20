import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box, Button, Text, Title } from "@nimbus-ds/components";
import { CheckIcon, CloseIcon } from "@nimbus-ds/icons";
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
