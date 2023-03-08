import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import tokens from "@nimbus-ds/tokens/dist/js/tokens";
import { IconButton, Checkbox, Text } from "@nimbus-ds/components";
import { TrashIcon } from "@nimbus-ds/icons";

import { ThumbnailWithAction } from "./ThumbnailWithAction";
import { useHasLightClass } from "./thumbnailWithAction.utils";

export default {
  title: "Patterns/ThumbnailWithAction",
  component: ThumbnailWithAction,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    children: { control: { disable: true } },
    thumbnail: { control: { disable: true } },
  },
} as ComponentMeta<typeof ThumbnailWithAction>;

const Template: ComponentStory<typeof ThumbnailWithAction> = (args) => (
  <ThumbnailWithAction {...args} thumbnail={{
      aspectRatio: "1/1",
      width: "120px",
      alt: "Alt text",
      src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80"
    }}
  />
);

const CaptionTemplate: ComponentStory<typeof ThumbnailWithAction> = (args) => {
  const isLightTheme = useHasLightClass();

  const captionBackground = isLightTheme
    ? tokens.color.sys.light.neutral.background.value
    : tokens.color.sys.dark.neutral.background.value;

  return (
    <ThumbnailWithAction
      {...args}
      thumbnail={{
        aspectRatio: "1/1",
        width: "120px",
        alt: "Alt text",
        src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80"
      }}
      overflow="hidden"
      backgroundImage={[
        "linear-gradient(180deg, ",
        captionBackground,
        "00 0%, ",
        captionBackground,
        "87 40%, ",
        captionBackground,
        "bd 100%)"
      ].join("")}
    />
  );
};

export const withIconButton = Template.bind({});
withIconButton.args = {
  children: <IconButton source={<TrashIcon />} size="2rem" />
};

export const withCheckbox = Template.bind({});
withCheckbox.args = {
  children: <Checkbox name="checkbox-element" />
};

export const withCaption = CaptionTemplate.bind({});
withCaption.args = {
  children: <Text>Image caption</Text>,
  contentPosition: "bottom-left",
  width: "100%"
};
