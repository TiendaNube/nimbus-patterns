import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";
import { IconButton, Checkbox, Text } from "@nimbus-ds/components";
import { TrashIcon } from "@nimbus-ds/icons";

import { ThumbnailWithAction } from "./ThumbnailWithAction";
import { useHasLightClass } from "./thumbnailWithAction.utils";

const meta: Meta<typeof ThumbnailWithAction> = {
  title: "Patterns/ThumbnailWithAction",
  component: ThumbnailWithAction,
  argTypes: {
    children: { control: { disable: true } },
    thumbnail: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => (
    <ThumbnailWithAction
      {...args}
      thumbnail={{
        aspectRatio: "1/1",
        width: "120px",
        alt: "Alt text",
        src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80",
      }}
    />
  ),
};

export default meta;
type Story = StoryObj<typeof ThumbnailWithAction>;

export const basic: Story = {
  args: {},
};

export const withIconButton: Story = {
  args: {
    children: <IconButton source={<TrashIcon />} size="2rem" />,
  },
};

export const withCheckbox: Story = {
  args: {
    children: <Checkbox name="checkbox-element" />,
  },
};

export const withCaption: Story = {
  render: (args) => {
    const isLightTheme = useHasLightClass();

    const captionBackground = isLightTheme
      ? tokens.color.light.neutral.background.value
      : tokens.color.dark.neutral.background.value;

    return (
      <ThumbnailWithAction
        {...args}
        thumbnail={{
          aspectRatio: "1/1",
          width: "120px",
          alt: "Alt text",
          src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80",
        }}
        overflow="hidden"
        backgroundImage={[
          "linear-gradient(180deg, ",
          captionBackground,
          "00 0%, ",
          captionBackground,
          "87 40%, ",
          captionBackground,
          "bd 100%)",
        ].join("")}
      />
    );
  },
  args: {
    children: <Text>Image caption</Text>,
    contentPosition: "bottom-left",
    width: "100%",
  },
};
