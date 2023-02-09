import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";
import { Icon } from "@nimbus-ds/icon";
import { Page } from "@nimbus-ds/page";

import { ChevronLeftIcon, GiftBoxIcon, UserIcon } from "@tiendanube/icons";

import { AppShell } from "./AppShell";

export default {
  title: "Patterns/AppShell",
  component: AppShell,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "AppShell.Header": AppShell.Header
  },
  argTypes: {
    children: {
      control: { disable: true },
      description: "Content to be rendered inside the app body."
    },
    menu: {
      control: { disable: true },
      description: "Optional menu component to be rendered on a left sidebar."
    }
  }
} as ComponentMeta<typeof AppShell>;

const backButton = (
  <Button appearance="transparent">
    <Icon source={<ChevronLeftIcon />} />
    Volver
  </Button>
);

const buttonStack = (
  <>
    <Button appearance="transparent">
      <Icon source={<GiftBoxIcon />} />
      Novedades
    </Button>
    <Button appearance="transparent">
      <Icon source={<UserIcon />} />
      Mi cuenta
    </Button>
  </>
);

const Template: ComponentStory<typeof AppShell> = (args) => {
  const sampleMenu = (
    <Box
      backgroundColor="primary.surface"
      borderColor="primary.interactive"
      borderStyle="dashed"
      borderWidth="1px"
      borderRadius=".5rem"
      width="15rem"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="base" color="primary.interactive">
        Menu content
      </Text>
    </Box>
  );

  return (
    <AppShell {...args} menu={sampleMenu}>
      <AppShell.Header leftSlot={backButton} rightSlot={buttonStack} />
      <Box
        backgroundColor="primary.surface"
        borderColor="primary.interactive"
        borderStyle="dashed"
        borderWidth="1px"
        borderRadius=".5rem"
        width="100%"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="base" color="primary.interactive">
          Children content
        </Text>
      </Box>
    </AppShell>
  );
};

const PageTemplate: ComponentStory<typeof AppShell> = (args) => (
  <AppShell {...args}>
    <AppShell.Header leftSlot={backButton} rightSlot={buttonStack} />
    <Page maxWidth="800px">
      <Page.Header title="Page demo" />
      <Page.Body>
        <Box
          backgroundColor="primary.surface"
          borderColor="primary.interactive"
          borderStyle="dashed"
          borderWidth="1px"
          borderRadius=".5rem"
          width="100%"
          height="500px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="base" color="primary.interactive">
            Body content
          </Text>
        </Box>
      </Page.Body>
    </Page>
  </AppShell>
);

export const base = Template.bind({});
base.args = {};

export const demoApp = PageTemplate.bind({});
demoApp.args = {};
