import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nimbus-ds/components";
import { Layout } from "@nimbus-ds/patterns";

import { EmptyApp } from "./EmptyApp";

const meta: Meta<typeof EmptyApp> = {
  title: "Patterns/EmptyApp",
  component: EmptyApp,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyApp>;

export const basic: Story = {
  render: () => (
    <EmptyApp>
      <EmptyApp.HeroSection
        subtitle="Marketing automation"
        title="Impulsá las ventas de tu tienda"
        content="Aumentá las visitas a tu sitio, captá nuevos suscriptores, optimizá las conversiones, recuperá y fidelizá clientes implementando email marketing y automation."
        actions={<Button>Comenzar ahora</Button>}
        alt="hero image"
      />
      <EmptyApp.ContentSection title="Soluciones para llevar tu negocio al próximo nivel">
        <Layout columns="2 - asymmetric" gap="6" alignItems="center">
          <Layout.Section alignItems="center">
            <EmptyApp.ContentImageElement alt="mockup" />
          </Layout.Section>
          <Layout.Section>
            <EmptyApp.ContentTextElement
              title="Estrategias efectivas para promocionar tus productos"
              content="Enviá campañas de email marketing para comunicar descuentos y novedades de tu negocio, atrayendo más visitantes a tu tienda. Encontrá inspiración con más de 500 plantillas prediseñadas."
              bottomDivider
            />
            <EmptyApp.ContentTextElement
              title="Más carritos y visitas recuperadas"
              content="Aumentá tus ventas enviando mensajes automáticos a visitantes
              que no finalizaron su compra. Incentivalos con cupones de
              descuento y recomendaciones basadas en sus intereses."
              bottomDivider
            />
            <EmptyApp.ContentTextElement
              title="Cada contacto recibe lo que desea"
              content="Segmentá a tus clientes según la cantidad y frecuencia de compra. Premiá a los clientes más fieles e incentivá a volver a quienes hace tiempo no compran. ¡Todo en piloto automático!"
            />
          </Layout.Section>
        </Layout>
      </EmptyApp.ContentSection>
      <EmptyApp.ContentSection
        title="Planes y precios de Marketing Automation"
        subtitle="Realizá una prueba gratuita durante 15 días, sin compromisos de compra y en compañía de nuestros especialistas, quienes te ayudarán a conocer todas las funcionalidades."
        actions={<Button appearance="primary">Comenzar ahora</Button>}
      >
        <Layout columns="2 - symmetric" width="100%">
          <Layout.Section>
            <EmptyApp.PlanCard
              planContext="Plan gratuito"
              planName="Gratis para siempre"
            >
              <EmptyApp.PlanItem label="Hasta 500 contactos" />
              <EmptyApp.PlanItem label="Envío de 2.000 emails/mes" />
              <EmptyApp.PlanItem label="Campañas simples" />
              <EmptyApp.PlanItem label="500+ campañas prediseñadas" />
              <EmptyApp.PlanItem label="Automations básicos" />
              <EmptyApp.PlanItem label="Formularios popup de suscripción" />
              <EmptyApp.PlanItem
                label="Campañas inteligentes y tests A/B"
                disabled
              />
              <EmptyApp.PlanItem label="Automations avanzados" disabled />
              <EmptyApp.PlanItem
                label="Segmentación por ciclo de vida"
                disabled
              />
            </EmptyApp.PlanCard>
          </Layout.Section>
          <Layout.Section>
            <EmptyApp.PlanCard
              planContext="Suscripción mensual"
              planName="Desde R$30/mes"
            >
              <EmptyApp.PlanItem label="Hasta 500 contactos" />
              <EmptyApp.PlanItem label="Envío de 2.000 emails/mes" />
              <EmptyApp.PlanItem label="Campañas simples" />
              <EmptyApp.PlanItem label="500+ campañas prediseñadas" />
              <EmptyApp.PlanItem label="Automations básicos" />
              <EmptyApp.PlanItem label="Formularios popup de suscripción" />
              <EmptyApp.PlanItem label="Campañas inteligentes y tests A/B" />
              <EmptyApp.PlanItem label="Automations avanzados" />
              <EmptyApp.PlanItem label="Segmentación por ciclo de vida" />
            </EmptyApp.PlanCard>
          </Layout.Section>
        </Layout>
      </EmptyApp.ContentSection>
    </EmptyApp>
  )
};
