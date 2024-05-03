import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nimbus-ds/components";
import { Layout } from "@nimbus-ds/layout";

import { EmptyApp } from "./EmptyApp";

const meta: Meta<typeof EmptyApp> = {
  title: "Patterns/EmptyApp",
  component: EmptyApp,
  argTypes: {
    children: { control: { disable: true } }
  },
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof EmptyApp>;

const perfitLogo = (
  <svg
    width="127"
    height="26"
    viewBox="0 0 127 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_28)">
      <path
        d="M48.66 0.48H40.91C39.82 0.48 38.96 1.33 38.96 2.42V27.03C38.96 28.12 39.81 28.98 40.91 28.98C42 28.98 42.86 28.13 42.86 27.03V17.33H48.66C53.75 17.33 56.91 14.09 56.91 8.88C56.91 3.7 53.74 0.48 48.66 0.48ZM52.97 8.89C52.97 11.94 51.25 13.69 48.25 13.69H42.85V4.13H48.25C51.3 4.13 52.97 5.83 52.97 8.89Z"
        fill="white"
      />
      <path
        d="M74.83 17.12C74.83 15.71 74.43 8.71 66.58 8.71C60.95 8.71 57.73 12.43 57.73 18.92C57.73 25.63 60.93 29.18 66.98 29.18C71.03 29.18 73.25 27.16 73.65 26.76C73.97 26.44 74.26 26.06 74.26 25.43C74.26 24.47 73.47 23.68 72.51 23.68C72.01 23.68 71.73 23.84 71.44 24.04C70.35 24.85 69.11 25.65 66.97 25.65C63.75 25.65 61.72 23.64 61.51 20.27H72.64C74.83 20.27 74.83 18.22 74.83 17.12ZM66.58 12.2C69.48 12.2 70.97 13.72 71.13 16.86H61.56C61.95 13.86 63.73 12.2 66.58 12.2Z"
        fill="white"
      />
      <path
        d="M88.34 8.79C86.06 8.79 84.41 9.57 83.24 10.71C82.82 9.48 82.34 8.94 81.48 8.95C80.44 8.96 79.61 9.77 79.61 10.82V27.12C79.61 28.17 80.43 28.98 81.48 28.98C82.53 28.98 83.35 28.16 83.35 27.12V18.13C83.35 14.52 85.17 12.45 88.35 12.45C89.36 12.45 90.18 11.63 90.18 10.63C90.16 9.61 89.43 8.79 88.34 8.79Z"
        fill="white"
      />
      <path
        d="M101.4 0C95.85 0 93.87 3.87 93.87 7.49V27.13C93.87 28.18 94.69 28.99 95.73 28.99C96.78 28.99 97.6 28.17 97.6 27.13V12.84H100.67C101.67 12.84 102.46 12.06 102.46 11.06C102.46 10.06 101.67 9.27 100.67 9.27H97.6V7.49C97.6 4.89 98.88 3.57 101.39 3.57C102.39 3.57 103.18 2.79 103.18 1.79C103.19 0.78 102.4 0 101.4 0Z"
        fill="white"
      />
      <path
        d="M109.45 2.05C108.09 2.05 107.34 2.83 107.34 4.24C107.34 5.54 108.15 6.35 109.45 6.35C110.75 6.35 111.56 5.54 111.56 4.24C111.56 2.82 110.81 2.05 109.45 2.05Z"
        fill="white"
      />
      <path
        d="M109.45 8.95C108.4 8.95 107.59 9.77 107.59 10.82V27.12C107.59 28.17 108.41 28.98 109.45 28.98C110.5 28.98 111.32 28.16 111.32 27.12V10.82C111.32 9.77 110.5 8.95 109.45 8.95Z"
        fill="white"
      />
      <path
        d="M124.19 25.42C123.06 25.42 122.44 24.68 122.44 23.35V12.85H124.47C125.47 12.85 126.25 12.07 126.25 11.07C126.25 10.07 125.47 9.28 124.47 9.28H122.44V5.64C122.44 4.61 121.6 3.77 120.57 3.77C119.58 3.77 118.7 4.64 118.7 5.64V23.35C118.7 26.77 120.85 28.99 124.18 28.99C125.2 28.99 126.01 28.21 126.01 27.21C126.02 26.2 125.21 25.42 124.19 25.42Z"
        fill="white"
      />
      <path
        d="M22.74 16.62V25.23C22.74 25.29 22.69 25.34 22.62 25.34H4.69002C4.63002 25.34 4.57002 25.29 4.57002 25.23V16.55L1.46002 14.47V25.23C1.46002 27.01 2.91002 28.45 4.69002 28.45H22.63C24.41 28.45 25.85 27 25.85 25.23V14.55L22.74 16.62Z"
        fill="white"
      />
      <path
        d="M27.15 1.24C26.9 0.79 26.43 0.5 25.92 0.5C25.69 0.5 25.46 0.56 25.26 0.67L13.59 6.95L2.05 0.76C1.85 0.65 1.62 0.59 1.39 0.59C0.88 0.59 0.4 0.87 0.16 1.33C-0.19 2 0.0600002 2.84 0.72 3.21L12.9 11.34L12.94 11.36C13.14 11.47 13.37 11.53 13.6 11.53C13.83 11.53 14.06 11.47 14.26 11.36L26.6 3.12C27.26 2.75 27.51 1.91 27.15 1.24Z"
        fill="white"
      />
      <path
        d="M27.15 8.88C26.91 8.43 26.44 8.15 25.92 8.15C25.69 8.15 25.46 8.21 25.26 8.32L13.59 14.59L2.05001 8.41C1.85001 8.3 1.62001 8.24 1.39001 8.24C0.88001 8.24 0.40001 8.52 0.16001 8.97C-0.0199897 9.3 -0.0499897 9.68 0.0500103 10.03C0.16001 10.38 0.39001 10.67 0.71001 10.85L12.89 18.98L12.93 19C13.13 19.11 13.36 19.16 13.59 19.16C13.82 19.16 14.05 19.1 14.25 19L26.6 10.76C27.26 10.39 27.51 9.55 27.15 8.88Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_28">
        <rect width="126.25" height="29.19" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const basic: Story = {
  render: () => (
    <EmptyApp>
      <EmptyApp.HeroSection
        subtitle="Marketing automation"
        title="Impulsá tus ventas con"
        titleChildren={perfitLogo}
        content="Aumentá las visitas a tu sitio, captá nuevos suscriptores, optimizá las conversiones, recuperá y fidelizá clientes implementando email marketing y automation."
        actions={<Button>Comenzar ahora</Button>}
        alt="hero image"
        src="./static/mockup-perfit.jpg"
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
