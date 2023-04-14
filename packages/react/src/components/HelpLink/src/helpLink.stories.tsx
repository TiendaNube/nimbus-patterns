import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Icon } from "@nimbus-ds/components";
import { ExternalLinkIcon } from "@nimbus-ds/icons";

import { HelpLink } from "./HelpLink";

export default {
  title: "Patterns/HelpLink",
  component: HelpLink,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    link: { control: { disable: true } },
  },
} as ComponentMeta<typeof HelpLink>;

const Template: ComponentStory<typeof HelpLink> = (args) => (
  <HelpLink
    {...args}
    link={{
      children: (
        <>
          Help link <Icon color="currentColor" source={<ExternalLinkIcon />} />
        </>
      )
    }}
  />
);

export const base = Template.bind({});
base.args = {};
