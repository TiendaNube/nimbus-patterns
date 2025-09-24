import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, IconButton } from "@nimbus-ds/components";
import { PlusIcon, PlusCircleIcon, ImageIcon } from "@nimbus-ds/icons";

import { ChatInputPopover } from "./ChatInputPopover";
import { ChatInputPopoverButton } from "../ChatInputPopoverButton/ChatInputPopoverButton";

const meta: Meta<typeof ChatInputPopover> = {
  title: "Patterns/ChatInput/Components/Popover",
  component: ChatInputPopover,
  argTypes: {
    content: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatInputPopover>;

export const Default: Story = {
  render: () => (
    <Box margin="4">
      <ChatInputPopover
        content={
          <Box display="flex" flexDirection="column" gap="1" minWidth="140px">
            <ChatInputPopoverButton
              icon={<PlusCircleIcon />}
              text="Upload file"
              onClick={() => console.log("Upload file clicked")}
            />
            <ChatInputPopoverButton
              icon={<ImageIcon />}
              text="Upload image"
              onClick={() => console.log("Upload image clicked")}
            />
          </Box>
        }
      >
        <IconButton
          color="neutral-textLow"
          source={<PlusIcon />}
          size="2rem"
          borderColor="transparent"
          backgroundColor="transparent"
        />
      </ChatInputPopover>
    </Box>
  ),
};

export const SingleOption: Story = {
  render: () => (
    <Box margin="4">
      <ChatInputPopover
        content={
          <Box display="flex" flexDirection="column" gap="1" minWidth="120px">
            <ChatInputPopoverButton
              icon={<PlusCircleIcon />}
              text="Upload file"
              onClick={() => console.log("Upload file clicked")}
            />
          </Box>
        }
      >
        <IconButton
          color="neutral-textLow"
          source={<PlusIcon />}
          size="2rem"
          borderColor="transparent"
          backgroundColor="transparent"
        />
      </ChatInputPopover>
    </Box>
  ),
};

export const MultipleOptions: Story = {
  render: () => (
    <Box margin="4">
      <ChatInputPopover
        content={
          <Box display="flex" flexDirection="column" gap="1" minWidth="160px">
            <ChatInputPopoverButton
              icon={<PlusCircleIcon />}
              text="Upload document"
              onClick={() => console.log("Upload document clicked")}
            />
            <ChatInputPopoverButton
              icon={<ImageIcon />}
              text="Upload image"
              onClick={() => console.log("Upload image clicked")}
            />
            <ChatInputPopoverButton
              text="Other option"
              onClick={() => console.log("Other option clicked")}
            />
          </Box>
        }
      >
        <IconButton
          color="neutral-textLow"
          source={<PlusIcon />}
          size="2rem"
          borderColor="transparent"
          backgroundColor="transparent"
        />
      </ChatInputPopover>
    </Box>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <Box margin="4">
      <ChatInputPopover
        content={
          <Box p="3" minWidth="200px">
            <Box mb="2">
              <h4>Custom Content</h4>
            </Box>
            <Box display="flex" flexDirection="column" gap="2">
              <p>This is custom content inside the popover.</p>
              <button
                type="button"
                onClick={() => console.log("Custom action")}
              >
                Custom Action
              </button>
            </Box>
          </Box>
        }
      >
        <IconButton
          color="neutral-textLow"
          source={<PlusIcon />}
          size="2rem"
          borderColor="transparent"
          backgroundColor="transparent"
        />
      </ChatInputPopover>
    </Box>
  ),
};
