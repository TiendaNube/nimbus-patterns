import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nimbus-ds/components";
import { PaperclipIcon, MicrophoneIcon } from "@nimbus-ds/icons";

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

export const basic: Story = {
  args: {
    children: (
      <>
        <Button size="2xs" appearance="transparent">
          <PaperclipIcon />
        </Button>
        <Button size="2xs" appearance="transparent">
          <MicrophoneIcon />
        </Button>
      </>
    ),
  },
};

export const singleAction: Story = {
  args: {
    children: (
      <Button size="2xs" appearance="transparent">
        <PaperclipIcon />
      </Button>
    ),
  },
};

export const multipleActions: Story = {
  args: {
    children: (
      <>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button size="2xs" appearance="transparent">
            <PaperclipIcon />
          </Button>
          <Button size="2xs" appearance="transparent">
            <MicrophoneIcon />
          </Button>
        </div>
        <Button size="2xs" appearance="primary">
          Send
        </Button>
      </>
    ),
  },
};
