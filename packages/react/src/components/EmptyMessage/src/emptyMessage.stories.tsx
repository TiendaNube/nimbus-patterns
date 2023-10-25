import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchIcon, RedoIcon } from "@nimbus-ds/icons";
import { Button, Link, Icon } from "@nimbus-ds/components";

import { EmptyMessage } from "./EmptyMessage";

const meta: Meta<typeof EmptyMessage> = {
  title: "Patterns/EmptyMessage",
  component: EmptyMessage,
  argTypes: {
    actions: { control: { disable: true } },
    illustration: { control: { disable: true } },
    icon: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyMessage>;

export const basic: Story = {
  args: {
    title: "This is an empty message component.",
    text: "This component has an icon.",
    actions: (
      <Link appearance="primary" textDecoration="none">
        <Icon color="currentColor" source={<RedoIcon />} />
        Reload page
      </Link>
    ),
  },
};

export const withIcon: Story = {
  args: {
    title: "This is an empty message component.",
    text: "This component has an icon.",
    actions: (
      <Link appearance="primary">
        <Icon color="currentColor" source={<RedoIcon />} />
        Reload page
      </Link>
    ),
    icon: <SearchIcon size={32} />,
  },
};

export const withImage: Story = {
  args: {
    title: "This empty message has an illustration.",
    text: "When in mobile, it will stack vertically, while on desktop it will span two columns.",
    actions: (
      <>
        <Button appearance="primary">Primary action</Button>
        <Link appearance="primary" textDecoration="none">
          Secondary action
        </Link>
      </>
    ),
    illustration: (
      <img
        width={300}
        alt="This shows the possibility of illustration on an empty message"
        src="https://d26lpennugtm8s.cloudfront.net/assets/common/img/empty-screens/empty-orders.png"
      />
    ),
  },
};
