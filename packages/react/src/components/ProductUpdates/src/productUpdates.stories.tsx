import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Thumbnail, Text, Tag, Button, Link } from "@nimbus-ds/components";
import { ProductUpdates } from "./ProductUpdates";

const meta: Meta<typeof ProductUpdates> = {
  title: "Patterns/ProductUpdates",
  component: ProductUpdates,
  argTypes: {
    bodyContent: { control: { disable: true } },
    tag: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <ProductUpdates {...args}>
      <Text fontSize="base" color="primary-interactive" textAlign="center">
        This is a new feature that is being showcased by our Product Updates
        component
      </Text>
    </ProductUpdates>
  ),
};

export default meta;
type Story = StoryObj<typeof ProductUpdates>;

export const basic: Story = {
  args: {
    title: "Title",
    text: "Content text",
    visible: true,
  },
};

export const withDismissLink: Story = {
  args: {
    title: "Title",
    text: "Content text",
    dismissLink: "Dismiss Popover",
    visible: true,
  },
};

export const withDismissButton: Story = {
  args: {
    title: "Title",
    text: "Content text",
    visible: true,
  },
};

export const withCustomContent: Story = {
  args: {
    title: "Title",
    text: "Content text",
    visible: true,
    maxWidth: "300px",
    bodyContent: (
      <Thumbnail
        aspectRatio="2/1"
        alt="Thumbnail component"
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2299&q=80"
      />
    ),
  },
};

export const withTag: Story = {
  args: {
    title: "Title text",
    text: "Content text",
    tag: <Tag appearance="primary">Novo</Tag>,
    dismissLink: "Link",
    visible: true,
  },
};

export const withTagAndDismissButton: Story = {
  args: {
    title: "Title text",
    text: "Content text",
    tag: <Tag appearance="primary">Novo</Tag>,
    visible: true,
  },
};

export const withLink: Story = {
  render: () => (
    <ProductUpdates
      title="Title text"
      text="Content text"
      tag={<Tag appearance="primary">Novo</Tag>}
      visible
      maxWidth="320px"
      width="stretch"
      bodyContent={
        <ProductUpdates.Footer
          leftLink={
            <Link as="button" appearance="neutral-background">
              Generar
            </Link>
          }
        />
      }
      bodyContentProps={{ gap: "none" }}
    >
      <Text fontSize="base" color="primary-interactive" textAlign="center">
        This is a new feature that is being showcased by our Product Updates
        component
      </Text>
    </ProductUpdates>
  ),
};

export const withFooter: Story = {
  render: () => (
    <ProductUpdates
      title="Title text"
      text="Content text"
      tag={<Tag appearance="primary">Novo</Tag>}
      visible
      maxWidth="320px"
      width="stretch"
      bodyContent={
        <ProductUpdates.Footer
          renderDivider
          paginator={
            <ProductUpdates.Paginator totalItems={5} activeIndex={0} />
          }
          rightButton={<Button size="small">Siguiente</Button>}
        />
      }
    >
      <Text fontSize="base" color="primary-interactive" textAlign="center">
        This is a new feature that is being showcased by our Product Updates
        component
      </Text>
    </ProductUpdates>
  ),
};

export const multiStepWizard: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    const totalSteps = 5;
    const steps = [
      {
        title: "Informes detallados",
        text: "Genera informes de pagos personalizados que te ayuden a analizar el comportamiento de tus clientes y optimizar tus estrategias.",
      },
      {
        title: "Nuevas métricas",
        text: "Accede a métricas avanzadas para entender mejor el rendimiento de tu tienda.",
      },
      {
        title: "Filtros mejorados",
        text: "Utiliza filtros más precisos para encontrar exactamente la información que necesitas.",
      },
      {
        title: "Exportar datos",
        text: "Exporta tus reportes en múltiples formatos para compartir con tu equipo.",
      },
      {
        title: "Empieza ahora",
        text: "Todo listo para que aproveches al máximo estas nuevas herramientas.",
      },
    ];

    return (
      <ProductUpdates
        title={steps[step].title}
        text={steps[step].text}
        visible
        maxWidth="320px"
        bodyContent={
          <ProductUpdates.Footer
            renderDivider
            leftLink={
              step > 0 ? (
                <Link
                  as="button"
                  appearance="neutral-background"
                  onClick={() => setStep(step - 1)}
                  textDecoration="none"
                >
                  Volver
                </Link>
              ) : undefined
            }
            paginator={
              <ProductUpdates.Paginator
                totalItems={totalSteps}
                activeIndex={step}
              />
            }
            rightButton={
              step < totalSteps - 1 ? (
                <Button size="small" onClick={() => setStep(step + 1)}>
                  Siguiente
                </Button>
              ) : (
                <Button
                  appearance="primary"
                  size="small"
                  onClick={() => setStep(0)}
                >
                  Entendido
                </Button>
              )
            }
          />
        }
      >
        <Text fontSize="base" color="primary-interactive" textAlign="center">
          This is a new feature that is being showcased by our Product Updates
          component
        </Text>
      </ProductUpdates>
    );
  },
};
