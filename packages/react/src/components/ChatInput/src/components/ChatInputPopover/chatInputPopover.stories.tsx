import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, IconButton } from "@nimbus-ds/components";
import { PlusIcon, PlusCircleIcon, UploadIcon } from "@nimbus-ds/icons";

import { ChatInputPopover } from "./ChatInputPopover";
import { ChatInputPopoverButton } from "../ChatInputPopoverButton/ChatInputPopoverButton";

const meta: Meta<typeof ChatInputPopover> = {
  title: "Patterns/ChatInput/ChatInput.Popover",
  component: ChatInputPopover,
  argTypes: {
    content: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatInputPopover>;

export const SingleOption: Story = {
  render: () => (
    <Box margin="4">
      <ChatInputPopover
        visible
        content={
          <>
            <ChatInputPopoverButton
              icon={<PlusCircleIcon />}
              text="Upload file"
              onClick={() => console.log("Upload file clicked")}
            />
            <ChatInputPopoverButton
              icon={<UploadIcon />}
              text="Upload image"
              onClick={() => console.log("Upload image clicked")}
            />
          </>
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
        visible
        content={
          <>
            <ChatInputPopoverButton
              icon={<PlusCircleIcon />}
              text="Upload document"
              onClick={() => console.log("Upload document clicked")}
            />
            <ChatInputPopoverButton
              icon={<UploadIcon />}
              text="Upload image"
              onClick={() => console.log("Upload image clicked")}
            />
            <ChatInputPopoverButton
              text="Other option"
              onClick={() => console.log("Other option clicked")}
            />
          </>
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
