import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line
import { SearchIcon, RedoIcon } from "@nimbus-ds/icons";
import { Button, Link, Icon } from "@nimbus-ds/components";

import { EmptyMessage } from "./EmptyMessage";

export default {
  title: "Patterns/EmptyMessage",
  component: EmptyMessage,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    actions: { control: { disable: true } },
    illustration: { control: { disable: true } },
    icon: { control: { disable: true } },
  },
} as ComponentMeta<typeof EmptyMessage>;

const Template: ComponentStory<typeof EmptyMessage> = (args) => (
  <EmptyMessage {...args} />
);

export const withIcon = Template.bind({});
withIcon.args = {
  title: "This is an empty message component.",
  text: "This component has an icon.",
  actions: (
    <Link appearance="primary">
      <Icon color="currentColor" source={<RedoIcon />} />
      Reload page
    </Link>
  ),
  icon: <SearchIcon size={32} />
};

export const withImage = Template.bind({});
withImage.args = {
  title: "This empty message has an illustration.",
  text: "When in mobile, it will stack vertically, while on desktop it will span two columns.",
  actions: (
    <>
      <Button appearance="primary">Primary action</Button>
      <Link appearance="primary">Secondary action</Link>
    </>
  ),
  illustration: (
    <img
      width={300}
      alt="This shows the possibility of illustration on an empty message"
      src="https://d26lpennugtm8s.cloudfront.net/assets/common/img/empty-screens/empty-orders.png"
    />
  )
};
