import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon, Link } from "@nimbus-ds/components";
import { ExternalLinkIcon } from "@nimbus-ds/icons";

import { HelpLink } from "./HelpLink";

const meta: Meta<typeof HelpLink> = {
  title: "Patterns/HelpLink",
  component: HelpLink,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HelpLink>;

export const basic: Story = {
  args: {
    children: (
      <Link
        as="a"
        href="https://nimbus.tiendanube.com/"
        target="_blank"
        appearance="primary"
        textDecoration="none"
      >
        Help link <Icon color="currentColor" source={<ExternalLinkIcon />} />
      </Link>
    ),
  },
};
