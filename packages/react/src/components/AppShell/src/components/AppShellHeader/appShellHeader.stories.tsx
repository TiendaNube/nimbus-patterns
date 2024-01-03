import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button, Icon, Tooltip, IconButton } from "@nimbus-ds/components";
import {
  ChevronLeftIcon,
  UserIcon,
  NotificationIcon,
  QuestionCircleIcon
} from "@nimbus-ds/icons";
import { AppShell } from "../../AppShell";

const meta: Meta<typeof AppShell.Header> = {
  title: "Patterns/AppShell/AppShell.Header",
  component: AppShell.Header,
  argTypes: {
    leftSlot: {
      control: { disable: true }
    },
    rightSlot: {
      control: { disable: true }
    }
  },
  tags: ["autodocs"]
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
    <Tooltip content="Novedades" arrow={false}>
      <IconButton
        size="2.125rem"
        source={<NotificationIcon size={18} />}
        backgroundColor="transparent"
        borderColor={{
          xs: "transparent",
          hover: "neutral-interactiveHover"
        }}
      />
    </Tooltip>
    <Tooltip content="Ayuda" arrow={false}>
      <IconButton
        size="2.125rem"
        source={<QuestionCircleIcon size={18} />}
        backgroundColor="transparent"
        borderColor={{
          xs: "transparent",
          hover: "neutral-interactiveHover"
        }}
      />
    </Tooltip>
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
  args: {}
};
