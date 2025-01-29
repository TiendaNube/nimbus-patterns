import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nimbus-ds/components";
import { TiendanubeIcon } from "@nimbus-ds/icons";

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
        subtitle={"PUNTO DE VENTA".toUpperCase()} // Deberia ser responsabilidad del Hero hacer uppercase este subtitle?
        title="Vendé en persona y gestioná todo en un solo lugar"
        bullets={[
          <LandingScreenheroBullet
            icon={<TiendanubeIcon />}
            text="Lorem Ipsum is simply dummy text of the printing."
          />,
          <LandingScreenheroBullet
            icon={<TiendanubeIcon />}
            text="Lorem Ipsum is simply dummy text of the printing."
          />,
          <LandingScreenheroBullet
            icon={<TiendanubeIcon />}
            text="Lorem Ipsum is simply dummy text of the printing."
          />,
          <LandingScreenheroBullet
            icon={<TiendanubeIcon />}
            text="Lorem Ipsum is simply dummy text of the printing."
          />,
          <LandingScreenheroBullet
            icon={<TiendanubeIcon />}
            text="Lorem Ipsum is simply dummy text of the printing."
          />,
        ]}
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
      />
      <LandingScreen.Section title="Beneficios"></LandingScreen.Section>
      <LandingScreen.Section title="Detalle"></LandingScreen.Section>
      <LandingScreen.Section title="Planes"></LandingScreen.Section>
    </LandingScreen>
  ),
};
