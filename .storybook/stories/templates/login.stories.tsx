import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { FormField } from "../../../packages/react/src/components/FormField/src";
import { Alert, Box, Button, Card, Checkbox, Input, Link, Text } from "@nimbus-ds/components";

const meta: Meta = {
  title: "Templates/Login",
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
  render: (args) => (
    <Box
      backgroundColor="neutral-surface"
      height={{
        xs: "calc(100vh - 61px)",
        md: "100%",
      }}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="4"
    >
      <Box maxWidth="500px" flex="1">
        <Card>
          <Card.Header title="Título del login" />
          <Card.Body>
            <Box display="flex" flexDirection="column" gap="4">
              <Text>
                ¿No tenés una cuenta?&nbsp;
                <Link appearance="primary" textDecoration="none">Creá acá una</Link>
              </Text>
              <Alert appearance="danger" title="Mensaje de error">
                Texto del error
              </Alert>
              <Box display="flex" flexDirection="column" gap="2">
                <FormField.Input label="Email" />
                <FormField label="Password">
                  <Input.Password />
                </FormField>
                <Link appearance="primary">¿Olvidaste tu contraseña?</Link>
              </Box>
              <Checkbox name="keep-login" label="Mantenerme conectado" />
            </Box>
          </Card.Body>
          <Card.Footer>
            <Button appearance="primary">Log in</Button>
          </Card.Footer>
        </Card>
      </Box>
    </Box>
  ),
  args: {},
};
