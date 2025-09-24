import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, IconButton } from "@nimbus-ds/components";
import { PlusIcon, MicrophoneIcon, ArrowupIcon } from "@nimbus-ds/icons";

import { ChatInput } from "./ChatInput";

const meta: Meta<typeof ChatInput> = {
  title: "Patterns/ChatInput",
  component: ChatInput,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Base: Story = {
  render: () => (
    <Box maxWidth="360px" margin="4">
      <ChatInput>
        <ChatInput.Field
          id="ai-generative"
          placeholder="Placeholder"
          lines={1}
        />
        <ChatInput.Actions>
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
              color="neutral-textLow"
              source={<ArrowupIcon />}
              appearance="ai-generative"
              disabled
              size="2rem"
            />
          </Box>
        </ChatInput.Actions>
      </ChatInput>
    </Box>
  ),
};

export const Filled: Story = {
  render: () => (
    <Box maxWidth="360px" margin="4">
      <ChatInput aiFocused>
        <ChatInput.Field
          id="ai-generative"
          placeholder="Placeholder"
          lines={1}
          defaultValue="Filled"
        />
        <ChatInput.Actions>
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
        </ChatInput.Actions>
      </ChatInput>
    </Box>
  ),
};
