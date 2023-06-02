import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Icon,
  Box,
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

import { Page } from "../../Page";

const meta: Meta<typeof Page.Header> = {
  title: "Patterns/Page/Page.Header",
  component: Page.Header,
  argTypes: {
    children: { control: { disable: true } },
    buttonStack: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Page.Header>;

export const basic: Story = {
  args: {
    title: "Page title",
    subtitle: "Page subtitle",
    buttonStack: (
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
    ),
    children: (
      <>
        <Box display="flex" gap="2">
          <Tag appearance="primary">Example tag</Tag>
          <Tag>Example tag</Tag>
        </Box>
        <Alert appearance="warning" title="Example alert">
          This is an example Alert component inside the Page Header.
        </Alert>
      </>
    ),
  },
};
