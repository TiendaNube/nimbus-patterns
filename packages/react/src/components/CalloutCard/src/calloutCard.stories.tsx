import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { BoxUnpackedIcon } from "@nimbus-ds/icons";

import { Link } from "@nimbus-ds/components";
import { CalloutCard } from "./CalloutCard";

export default {
  title: "Patterns/CalloutCard",
  component: CalloutCard,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    onClick: { control: { disable: true } },
    icon: { control: { disable: true } },
  },
} as ComponentMeta<typeof CalloutCard>;

const Template: ComponentStory<typeof CalloutCard> = (args) => (
  <CalloutCard {...args} />
);

export const base = Template.bind({});
base.args = {
  appearance: "neutral",
  title: "Title",
  subtitle: "Description",
  icon: BoxUnpackedIcon,
  link: (
    <Link
      appearance="primary"
      as="a"
      target="_link"
      href="https://nimbus.nuvemshop.com.br"
    >
      Link
    </Link>
  ),
};

export const neutral = Template.bind({});
neutral.args = {
  appearance: "neutral",
  title: "Title",
  subtitle: "Description",
  icon: BoxUnpackedIcon,
};

export const primary = Template.bind({});
primary.args = {
  appearance: "primary",
  title: "Title",
  subtitle: "Description",
  icon: BoxUnpackedIcon,
};

export const success = Template.bind({});
success.args = {
  appearance: "success",
  title: "Title",
  subtitle: "Description",
  icon: BoxUnpackedIcon,
};

export const warning = Template.bind({});
warning.args = {
  appearance: "warning",
  title: "Title",
  subtitle: "Description",
  icon: BoxUnpackedIcon,
};

export const danger = Template.bind({});
danger.args = {
  appearance: "danger",
  title: "Title",
  subtitle: "Description",
  icon: BoxUnpackedIcon,
  onClick: () => console.log("adasda"),
};
