import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Box, IconButton } from "@nimbus-ds/components";
import {
  UploadIcon,
  MicrophoneIcon,
  PlusIcon,
  ArrowupIcon,
} from "@nimbus-ds/icons";

import { ChatInput } from "../../ChatInput";

const meta: Meta<typeof ChatInput.Actions> = {
  title: "Patterns/ChatInput/ChatInput.Actions",
  component: ChatInput.Actions,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatInput.Actions>;

export const singleAction: Story = {
  args: {
    children: (
      <Button appearance="transparent">
        <UploadIcon />
      </Button>
    ),
  },
};

export const multipleActions: Story = {
  args: {
    children: (
      <>
        <Box display="flex" gap="2" alignItems="center">
          <IconButton
            color="neutral-textLow"
            source={<PlusIcon />}
            size="2rem"
            borderColor="transparent"
            backgroundColor="transparent"
          />
        </Box>
        <Box display="flex" gap="2" alignItems="center">
          <IconButton
            color="neutral-textLow"
            source={<MicrophoneIcon />}
            size="2rem"
            borderColor="transparent"
            backgroundColor="transparent"
          />
          <IconButton
            color="neutral-background"
            source={<ArrowupIcon />}
            appearance="ai-generative"
            size="2rem"
            borderColor="transparent"
          />
        </Box>
      </>
    ),
  },
};
