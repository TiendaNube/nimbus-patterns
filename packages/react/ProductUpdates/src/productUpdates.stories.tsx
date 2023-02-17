import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Thumbnail, Text } from "@nimbus-ds/components";

import { ProductUpdates } from "./ProductUpdates";

export default {
  title: "Patterns/ProductUpdates",
  component: ProductUpdates,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    bodyContent: {
      control: { disable: true },
      description: "Optional content for the body of the Popover",
    },
    dismissLink: {
      control: "text",
      description:
        "Optional bottom link to dismiss the Popover. If unset, an IconButton with an X will appear on the superior right corner.",
    },
    visible: { control: { disable: true } },
  },
} as ComponentMeta<typeof ProductUpdates>;

const Template: ComponentStory<typeof ProductUpdates> = (args) => (
  <ProductUpdates {...args}>
    <Text fontSize="base" color="primary.interactive" textAlign="center">
      This is a new feature that is being showcased by our Product Updates
      component
    </Text>
  </ProductUpdates>
);

export const withDismissLink = Template.bind({});
withDismissLink.args = {
  title: "Title",
  text: "Content text",
  dismissLink: "Dismiss Popover",
  visible: true,
};

export const withDismissButton = Template.bind({});
withDismissButton.args = {
  title: "Title",
  text: "Content text",
  visible: true,
};

export const withCustomContent = Template.bind({});
withCustomContent.args = {
  title: "Title",
  text: "Content text",
  visible: true,
  bodyContent: (
    <Thumbnail
      aspectRatio="2/1"
      alt="Thumbnail component"
      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2299&q=80"
    />
  ),
};
