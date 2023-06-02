import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button, Icon } from "@nimbus-ds/components";
import { ChevronLeftIcon, GiftBoxIcon, UserIcon } from "@nimbus-ds/icons";
import { AppShell } from "../../AppShell";

const meta: Meta<typeof AppShell.Header> = {
  title: "Patterns/AppShell/AppShell.Header",
  component: AppShell.Header,
  argTypes: {
    leftSlot: {
      control: { disable: true },
    },
    rightSlot: {
      control: { disable: true },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AppShell.Header>;

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

export const basic: Story = {
  render: (args) => (
    <AppShell>
      <AppShell.Header
        {...args}
        leftSlot={backButton}
        rightSlot={buttonStack}
      />
    </AppShell>
  ),
  args: {},
};
