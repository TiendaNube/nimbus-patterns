import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import {
  Button,
  Icon,
  Box,
  Text,
  Alert,
  Tag,
  IconButton,
} from "@nimbus-ds/components";
import {
  ChevronDownIcon,
  DownloadIcon,
  PlusCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@nimbus-ds/icons";

import { Page } from "./Page";

export default {
  title: "Patterns/Page",
  component: Page,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "Page.Header": Page.Header,
    "Page.Body": Page.Body,
  },
  argTypes: {
    children: {
      control: { disable: true },
    },
    maxWidth: {
      control: "text",
    },
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => {
  const headerButtons = (
    <>
      <IconButton source={<ChevronLeftIcon />} size="2rem" />
      <IconButton source={<ChevronRightIcon />} size="2rem" />
      <Button>
        Mis aplicaciones
        <Icon source={<ChevronDownIcon />} />
      </Button>
      <Button>
        Exportar lista
        <Icon source={<DownloadIcon />} />
      </Button>
      <Button appearance="primary">
        <Icon color="neutral-background" source={<PlusCircleIcon />} />
        Agregar orden de compra
      </Button>
    </>
  );

  return (
    <Page {...args}>
      <Page.Header
        title="Page title"
        subtitle="Page subtitle"
        buttonStack={headerButtons}
      >
        <Box display="flex" gap="2">
          <Tag appearance="primary">Example tag</Tag>
          <Tag>Example tag</Tag>
        </Box>
        <Alert appearance="warning" title="Example alert">
          This is an example Alert component inside the Page Header.
        </Alert>
      </Page.Header>
      <Page.Body>
        <Box
          backgroundColor="primary-surface"
          borderColor="primary-interactive"
          borderStyle="dashed"
          borderWidth="1px"
          borderRadius=".5rem"
          width="100%"
          height="500px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="base" color="primary-interactive">
            Body content
          </Text>
        </Box>
      </Page.Body>
    </Page>
  );
};

export const base = Template.bind({});
base.args = {};
