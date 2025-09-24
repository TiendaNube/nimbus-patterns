import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/components";
import { PlusCircleIcon, UploadIcon, FileIcon } from "@nimbus-ds/icons";

import { ChatInputPopoverButton } from "./ChatInputPopoverButton";

const meta: Meta<typeof ChatInputPopoverButton> = {
  title: "Patterns/ChatInput/ChatInput.PopoverButton",
  component: ChatInputPopoverButton,
  argTypes: {
    text: {
      control: "text",
      description: "The text content of the button",
    },
    icon: {
      control: { disable: true },
      description: "Icon element to be displayed before the text",
    },
    onClick: {
      action: "clicked",
      description: "Click handler for the button",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatInputPopoverButton>;

export const Default: Story = {
  args: {
    text: "Button text",
    onClick: () => console.log("Button clicked"),
  },
  render: (args) => (
    <Box margin="4" maxWidth="200px">
      <ChatInputPopoverButton {...args} />
    </Box>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: <PlusCircleIcon />,
    text: "Upload file",
    onClick: () => console.log("Upload file clicked"),
  },
  render: (args) => (
    <Box margin="4" maxWidth="200px">
      <ChatInputPopoverButton {...args} />
    </Box>
  ),
};

export const MultipleButtons: Story = {
  render: () => (
    <Box
      margin="4"
      maxWidth="200px"
      display="flex"
      flexDirection="column"
      gap="1"
    >
      <ChatInputPopoverButton
        icon={<UploadIcon />}
        text="Upload document"
        onClick={() => console.log("Upload document clicked")}
      />
      <ChatInputPopoverButton
        icon={<UploadIcon />}
        text="Upload image"
        onClick={() => console.log("Upload image clicked")}
      />
      <ChatInputPopoverButton
        icon={<FileIcon />}
        text="Browse files"
        onClick={() => console.log("Browse file clicked")}
      />
    </Box>
  ),
};
