import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

import { Page } from "../../../packages/react/src/components/Page/src";
import { Layout } from "../../../packages/react/src/components/Layout/src";
import { MenuButton } from "../../../packages/react/src/components/MenuButton/src";
import {
  Alert,
  Box,
  Button,
  Chip,
  Icon,
  IconButton,
  Input,
  Modal,
  Popover,
  Tag,
  Text,
} from "@nimbus-ds/components";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  PlusCircleIcon,
  SearchIcon,
} from "@nimbus-ds/icons";

const meta: Meta = {
  title: "Templates/ConfirmationModal",
  argTypes: {
    children: {
      control: { disable: true },
    },
    menu: {
      control: { disable: true },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;


export const basic: Story = {
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ open: !open });

    const popoverContent = (
      <Box display="flex" flexDirection="column" width="100%">
        <MenuButton label="Acción secundaria" />
        <MenuButton label="Acción secundaria" />
        <MenuButton label="Acción secundaria" />
      </Box>
    );

    const buttonStack = (
      <>
        <IconButton source={<ChevronLeftIcon />} size="2rem" />
        <IconButton source={<ChevronRightIcon />} size="2rem" />
        <Popover content={popoverContent} arrow={false} padding="small">
          <Button>
            Menú contextual
            <Icon source={<ChevronDownIcon />} />
          </Button>
        </Popover>
        <Button>
          Acción secundaria
          <Icon source={<DownloadIcon />} />
        </Button>
        <Button appearance="primary">
          <Icon color="neutral-background" source={<PlusCircleIcon />} />
          Acción primaria
        </Button>
      </>
    );

    return (
      <>
        <Page maxWidth="1200px">
          <Page.Header
            title="Plantilla de página"
            subtitle="Subtítulo de la página"
            buttonStack={buttonStack}
          >
            <Box display="flex" gap="2">
              <Tag appearance="primary">Tag de ejemplo</Tag>
              <Tag>Tag de ejemplo</Tag>
            </Box>
            <Alert title="Alert de ejemplo">
              Este es un alert de ejemplo en el header de la página
            </Alert>
            <Box display="flex" flexDirection="column" gap="2">
              <Box display="flex" gap="1">
                <Input.Search placeholder="Buscar" />
                <Button><Icon color="currentColor" source={<SearchIcon />} /></Button>
              </Box>
              <Box display="flex" gap="2" alignItems="center">
                <Text>150 órdenes</Text>
                <Chip text="Filtro aplicado" removable />
              </Box>
            </Box>
          </Page.Header>
          <Page.Body>
            <Layout columns="1">
              <Box
                width="100%"
                p="4"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderColor="neutral-interactive"
                borderStyle="dashed"
                borderWidth="1"
                borderRadius="2"
              >
                <Button appearance="danger" onClick={handleOpen}>Abrir modal de confirmación</Button>
              </Box>
            </Layout>
          </Page.Body>
        </Page>
        <Modal open={open} onDismiss={handleOpen}>
          <Modal.Header title="Modal de confirmación" />
          <Modal.Body padding="none">
            <Text>¿Estás seguro que querés eliminar?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleOpen}>Cancelar</Button>
            <Button appearance="danger">Sí, eliminar</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  },
  args: {},
};
