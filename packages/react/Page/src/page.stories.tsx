import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Button } from "@nimbus-ds/button";
import { Icon } from "@nimbus-ds/icon";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Alert } from "@nimbus-ds/alert";
import { Tag } from "@nimbus-ds/tag";
import { IconButton } from "@nimbus-ds/icon-button";
import {
  ChevronDownIcon,
  DownloadIcon,
  PlusCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@tiendanube/icons';

import { Page } from "./Page";

export default {
  title: "Patterns/Page",
  component: Page,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "Page.Header": Page.Header,
    "Page.Body": Page.Body
  },
  argTypes: {
    children: {
      control: { disable: true },
      description: "Content to be rendered inside the page body."
    },
    maxWidth: {
      control: "text",
      description: "Optional parameter to define a maximum width of the page content."
    }
  }
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
        <Icon color="neutral.background" source={<PlusCircleIcon />} />
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
  );
};

export const base = Template.bind({});
base.args = {};
