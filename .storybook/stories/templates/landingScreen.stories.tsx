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
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type. "
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
            title="Card beneficio"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley."
          />

          <InitialScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Card beneficio"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley."
          />
          <InitialScreen.Card
            icon={<BoxPackedIcon size="large" />}
            title="Card beneficio"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley."
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
                Lorem Ipsum is simply dummy.
              </Text>
            </PlanDisplay.Header>
            <PlanDisplay.Content>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
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
                Lorem Ipsum is simply dummy.
              </Text>
            </PlanDisplay.Header>
            <PlanDisplay.Content>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
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
                Lorem Ipsum is simply dummy.
              </Text>
            </PlanDisplay.Header>
            <PlanDisplay.Content>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet
                icon={<CheckIcon fontWeight="bold" fontSize="24px" />}
              >
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CheckIcon />}>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
              </PlanDisplay.Bullet>
              <PlanDisplay.Bullet icon={<CloseIcon />} disabled>
                Lorem Ipsum is simply dummy.
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
                    Button
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
