import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box, Button, Link, Tag, Text } from "@nimbus-ds/components";
import { CashierIcon, CheckIcon, GenerativeStarsIcon } from "@nimbus-ds/icons";
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

export const Default: Story = {
  render: () => (
    <PlanDisplay minPlanWidth="236px">
      {/* Default card */}
      <PlanDisplay.Card>
        <PlanDisplay.Header
          subtitle="Inicial"
          title={<PlanDisplay.Price price="Gratis" />}
        />
        <PlanDisplay.Content>
          <Box display="flex" flexDirection="column" gap="3" pb="2">
            <Text>Todo lo que necesitas para empezar a vender online.</Text>
            <Button fullWidth>Comenzar gratis</Button>
          </Box>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Tu tienda lista para empezar a vender
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Productos y visitas sin límite
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Medios de pago y envío de Tiendanube
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
      </PlanDisplay.Card>

      {/* Card with tag */}
      <PlanDisplay.Card>
        <PlanDisplay.Header
          subtitle="Esencial"
          tag={<Tag appearance="neutral">Plan actual</Tag>}
          title={
            <PlanDisplay.Price
              price="$24.999"
              previousPrice="$29.999"
              period="/mes"
              annualNote={
                <>
                  $269.990/año.{" "}
                  <Text as="span" color="primary-textLow" fontSize="caption">
                    Ahorra $30.000.
                  </Text>
                </>
              }
            />
          }
        />
        <PlanDisplay.Content>
          <Box display="flex" flexDirection="column" gap="3" pb="2">
            <Text>Potenciá tu marca y vendé como una tienda profesional.</Text>
            <Button fullWidth>Subir de plan</Button>
          </Box>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Incluye todo lo del plan anterior, más:
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Carga masiva de productos
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Dominio propio
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
      </PlanDisplay.Card>

      {/* Featured card with ribbon */}
      <PlanDisplay.Card ribbonLabel="Más escogido">
        <PlanDisplay.Header
          subtitle="Avanzado"
          title={<PlanDisplay.Price price="$219.999" period="/mes" />}
        />
        <PlanDisplay.Content>
          <Box display="flex" flexDirection="column" gap="3" pb="2">
            <Text>Gestión avanzada y control total para tu negocio.</Text>
            <Button appearance="primary" fullWidth>
              Subir de plan
            </Button>
          </Box>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Incluye todo lo del plan anterior, más:
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Campos personalizados en productos y órdenes
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet
            icon={<CheckIcon />}
            badge={<Tag appearance="primary">Nuevo</Tag>}
          >
            Hasta 3 tablas de precios mayoristas
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<GenerativeStarsIcon />}>
            IA ilimitada para potenciar tu gestión
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
        <PlanDisplay.Footer icon={<CashierIcon />}>
          <Text>
            Obtén{" "}
            <Link
              as="a"
              href="#"
              appearance="primary"
              textDecoration="underline"
            >
              Punto de venta Plus
            </Link>{" "}
            extra por $149.90/mes
          </Text>
        </PlanDisplay.Footer>
      </PlanDisplay.Card>

      {/* Gradient card */}
      <PlanDisplay.Card gradient>
        <PlanDisplay.Header
          subtitle="Evolución"
          title={<PlanDisplay.Price price="$439.999" period="/mes" />}
        />
        <PlanDisplay.Content>
          <Box display="flex" flexDirection="column" gap="3" pb="2">
            <Text>La solución completa para escalar sin límites.</Text>
            <Button fullWidth>Subir de plan</Button>
          </Box>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Incluye todo lo del plan anterior, más:
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Soporte prioritario y ejecutivo de cuenta
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<GenerativeStarsIcon />}>
            IA ilimitada para potenciar tu gestión
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
      </PlanDisplay.Card>
    </PlanDisplay>
  ),
};

/**
 * Two-plan layout: a current plan (with tag) and a featured upgrade (with ribbon).
 */
export const TwoPlans: Story = {
  render: () => (
    <PlanDisplay minPlanWidth="236px">
      {/* Card with tag */}
      <PlanDisplay.Card>
        <PlanDisplay.Header
          subtitle="Esencial"
          tag={<Tag appearance="neutral">Plan actual</Tag>}
          title={
            <PlanDisplay.Price
              price="$24.999"
              previousPrice="$29.999"
              period="/mes"
            />
          }
        />
        <PlanDisplay.Content>
          <Box display="flex" flexDirection="column" gap="3" pb="2">
            <Text>Potenciá tu marca y vendé como una tienda profesional.</Text>
            <Button fullWidth>Subir de plan</Button>
          </Box>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Incluye todo lo del plan anterior, más:
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Carga masiva de productos
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Dominio propio
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
      </PlanDisplay.Card>

      {/* Featured card with ribbon */}
      <PlanDisplay.Card ribbonLabel="Más escogido">
        <PlanDisplay.Header
          subtitle="Avanzado"
          title={<PlanDisplay.Price price="$219.999" period="/mes" />}
        />
        <PlanDisplay.Content>
          <Box display="flex" flexDirection="column" gap="3" pb="2">
            <Text>Gestión avanzada y control total para tu negocio.</Text>
            <Button appearance="primary" fullWidth>
              Subir de plan
            </Button>
          </Box>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Incluye todo lo del plan anterior, más:
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Campos personalizados en productos y órdenes
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<GenerativeStarsIcon />}>
            IA ilimitada para potenciar tu gestión
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
      </PlanDisplay.Card>
    </PlanDisplay>
  ),
};

/**
 * Three-plan layout: starter, current plan (with tag) and a featured upgrade (with ribbon).
 */
export const ThreePlans: Story = {
  render: () => (
    <PlanDisplay minPlanWidth="236px">
      {/* Default card */}
      <PlanDisplay.Card>
        <PlanDisplay.Header
          subtitle="Inicial"
          title={<PlanDisplay.Price price="Gratis" />}
        />
        <PlanDisplay.Content>
          <Box display="flex" flexDirection="column" gap="3" pb="2">
            <Text>Todo lo que necesitas para empezar a vender online.</Text>
            <Button fullWidth>Comenzar gratis</Button>
          </Box>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Tu tienda lista para empezar a vender
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Productos y visitas sin límite
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Medios de pago y envío de Tiendanube
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
      </PlanDisplay.Card>

      {/* Card with tag */}
      <PlanDisplay.Card>
        <PlanDisplay.Header
          subtitle="Esencial"
          tag={<Tag appearance="neutral">Plan actual</Tag>}
          title={
            <PlanDisplay.Price
              price="$24.999"
              previousPrice="$29.999"
              period="/mes"
            />
          }
        />
        <PlanDisplay.Content>
          <Box display="flex" flexDirection="column" gap="3" pb="2">
            <Text>Potenciá tu marca y vendé como una tienda profesional.</Text>
            <Button fullWidth>Subir de plan</Button>
          </Box>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Incluye todo lo del plan anterior, más:
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Carga masiva de productos
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Dominio propio
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
      </PlanDisplay.Card>

      {/* Featured card with ribbon */}
      <PlanDisplay.Card ribbonLabel="Más escogido">
        <PlanDisplay.Header
          subtitle="Avanzado"
          title={<PlanDisplay.Price price="$219.999" period="/mes" />}
        />
        <PlanDisplay.Content>
          <Box display="flex" flexDirection="column" gap="3" pb="2">
            <Text>Gestión avanzada y control total para tu negocio.</Text>
            <Button appearance="primary" fullWidth>
              Subir de plan
            </Button>
          </Box>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Incluye todo lo del plan anterior, más:
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Campos personalizados en productos y órdenes
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<GenerativeStarsIcon />}>
            IA ilimitada para potenciar tu gestión
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
      </PlanDisplay.Card>
    </PlanDisplay>
  ),
};

/**
 * Horizontal (desktop) layout: plan info on the left — name, price, description and CTA — separated
 * by a vertical divider from a single column of feature bullets, vertically centered.
 */
export const Horizontal: Story = {
  render: () => (
    <Box style={{ maxWidth: 740 }}>
      <PlanDisplay.Card>
        <Box display="flex" gap="6" alignItems="center">
          {/* Plan info */}
          <Box
            display="flex"
            flexDirection="column"
            gap="3"
            justifyContent="center"
            style={{ flex: "0 0 253px" }}
          >
            <PlanDisplay.Header
              subtitle="Inicial"
              title={<PlanDisplay.Price price="Gratis" />}
            />
            <Box display="flex" flexDirection="column" gap="3">
              <Text>Tudo o que você precisa para começar a vender online.</Text>
              <Button fullWidth>Bajar de plan</Button>
            </Box>
          </Box>

          {/* Vertical divider */}
          <Box
            alignSelf="stretch"
            backgroundColor="neutral-surfaceHighlight"
            style={{ width: "1px", flexShrink: 0 }}
          />

          {/* Feature bullets */}
          <Box
            display="flex"
            flexDirection="column"
            gap="3"
            style={{ flex: "1 1 0" }}
          >
            <PlanDisplay.Bullet icon={<CheckIcon />}>
              Sua loja autogerenciável e pronta para vender
            </PlanDisplay.Bullet>
            <PlanDisplay.Bullet icon={<CheckIcon />}>
              Produtos e visitas sem limite
            </PlanDisplay.Bullet>
            <PlanDisplay.Bullet icon={<CheckIcon />}>
              Meios de pagamento e envio da Nuvemshop
            </PlanDisplay.Bullet>
          </Box>
        </Box>
      </PlanDisplay.Card>
    </Box>
  ),
};

/**
 * Mobile layout of the same plan: the horizontal card stacks vertically. The header, description + CTA
 * and feature bullets are separated by spacing only, matching the horizontal desktop layout.
 */
export const HorizontalMobile: Story = {
  render: () => (
    <Box style={{ maxWidth: 361 }}>
      <PlanDisplay.Card>
        <Box display="flex" flexDirection="column" gap="6">
          {/* Plan info */}
          <Box display="flex" flexDirection="column" gap="3">
            <PlanDisplay.Header
              subtitle="Inicial"
              title={<PlanDisplay.Price price="Gratis" />}
            />
            <Box display="flex" flexDirection="column" gap="3">
              <Text>Tudo o que você precisa para começar a vender online.</Text>
              <Button fullWidth>Bajar de plan</Button>
            </Box>
          </Box>

          {/* Feature bullets */}
          <Box display="flex" flexDirection="column" gap="3">
            <PlanDisplay.Bullet icon={<CheckIcon />}>
              Sua loja autogerenciável e pronta para vender
            </PlanDisplay.Bullet>
            <PlanDisplay.Bullet icon={<CheckIcon />}>
              Produtos e visitas sem limite
            </PlanDisplay.Bullet>
            <PlanDisplay.Bullet icon={<CheckIcon />}>
              Meios de pagamento e envio da Nuvemshop
            </PlanDisplay.Bullet>
          </Box>
        </Box>
      </PlanDisplay.Card>
    </Box>
  ),
};

type PlaygroundArgs = {
  showRibbon: boolean;
  showGradient: boolean;
  showTag: boolean;
  showDiscount: boolean;
  showSuffix: boolean;
  showDescription: boolean;
  showButton: boolean;
  showFooter: boolean;
};

/**
 * Mirrors the configurable properties of the Figma master component. Each toggle maps to an
 * optional slot/prop, showing how every part of a plan card is opt-in through composition.
 */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    showRibbon: true,
    showGradient: false,
    showTag: true,
    showDiscount: true,
    showSuffix: true,
    showDescription: true,
    showButton: true,
    showFooter: true,
  },
  argTypes: {
    showRibbon: { control: "boolean" },
    showGradient: { control: "boolean" },
    showTag: { control: "boolean" },
    showDiscount: { control: "boolean" },
    showSuffix: { control: "boolean" },
    showDescription: { control: "boolean" },
    showButton: { control: "boolean" },
    showFooter: { control: "boolean" },
  },
  render: ({
    showRibbon,
    showGradient,
    showTag,
    showDiscount,
    showSuffix,
    showDescription,
    showButton,
    showFooter,
  }) => (
    <PlanDisplay minPlanWidth="236px">
      <PlanDisplay.Card
        ribbonLabel={showRibbon ? "Más escogido" : undefined}
        gradient={showGradient}
      >
        <PlanDisplay.Header
          subtitle="Avanzado"
          tag={showTag ? <Tag appearance="neutral">Plan actual</Tag> : undefined}
          title={
            <PlanDisplay.Price
              price="$24.999"
              previousPrice={showDiscount ? "$29.999" : undefined}
              period={showSuffix ? "/mes" : undefined}
              annualNote={
                showDescription ? (
                  <>
                    $269.990/año.{" "}
                    <Text as="span" color="primary-textLow" fontSize="caption">
                      Ahorra $30.000.
                    </Text>
                  </>
                ) : undefined
              }
            />
          }
        />
        <PlanDisplay.Content>
          <Box display="flex" flexDirection="column" gap="3" pb="2">
            <Text>Gestión avanzada y control total para tu negocio.</Text>
            {showButton && (
              <Button appearance="primary" fullWidth>
                Subir de plan
              </Button>
            )}
          </Box>
          <PlanDisplay.Bullet icon={<CheckIcon />}>
            Incluye todo lo del plan anterior, más:
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet
            icon={<CheckIcon />}
            badge={<Tag appearance="primary">Nuevo</Tag>}
          >
            Hasta 3 tablas de precios mayoristas
          </PlanDisplay.Bullet>
          <PlanDisplay.Bullet icon={<GenerativeStarsIcon />}>
            IA ilimitada para potenciar tu gestión
          </PlanDisplay.Bullet>
        </PlanDisplay.Content>
        {showFooter && (
          <PlanDisplay.Footer icon={<CashierIcon />}>
            <Text>
              Obtén{" "}
              <Link
                as="a"
                href="#"
                appearance="primary"
                textDecoration="underline"
              >
                Punto de venta Plus
              </Link>{" "}
              extra por $149.90/mes
            </Text>
          </PlanDisplay.Footer>
        )}
      </PlanDisplay.Card>
    </PlanDisplay>
  ),
};
