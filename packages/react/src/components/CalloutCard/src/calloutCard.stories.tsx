import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BoxUnpackedIcon } from "@nimbus-ds/icons";

import { Box, Link } from "@nimbus-ds/components";
import { CalloutCard } from "./CalloutCard";

const meta: Meta<typeof CalloutCard> = {
  title: "Patterns/CalloutCard",
  component: CalloutCard,
  argTypes: {
    onClick: { control: { disable: true } },
    icon: { control: { disable: true } },
    link: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CalloutCard>;

export const basic: Story = {
  args: {
    appearance: "neutral",
    title: "Title",
    subtitle: "Description",
    icon: BoxUnpackedIcon,
    link: (
      <Box display="flex" gap="3" marginTop="2">
        <Link
          appearance="primary"
          as="a"
          target="_link"
          href="https://nimbus.nuvemshop.com.br"
        >
          Link
        </Link>
        <Link
          appearance="primary"
          as="a"
          target="_link"
          href="https://nimbus.nuvemshop.com.br"
        >
          Link
        </Link>
      </Box>
    ),
  },
};

export const neutral: Story = {
  args: {
    appearance: "neutral",
    title: "Title",
    subtitle: "Description",
    icon: BoxUnpackedIcon,
  },
};

export const primary: Story = {
  args: {
    appearance: "primary",
    title: "Title",
    subtitle: "Description",
    icon: BoxUnpackedIcon,
  },
};

export const success: Story = {
  args: {
    appearance: "success",
    title: "Title",
    subtitle: "Description",
    icon: BoxUnpackedIcon,
  },
};

export const warning: Story = {
  args: {
    appearance: "warning",
    title: "Title",
    subtitle: "Description",
    icon: BoxUnpackedIcon,
  },
};

export const danger: Story = {
  args: {
    appearance: "danger",
    title: "Title",
    subtitle: "Description",
    icon: BoxUnpackedIcon,
    onClick: () => console.log("adasda"),
  },
};

export const stressed: Story = {
  args: {
    appearance: "neutral",
    title:
      "This is a stressed version of the component. It includes a very long title and extra long description.",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel tincidunt nunc, in porttitor erat. Sed tristique mauris porttitor, lobortis nibh nec, vulputate tellus. Donec lacinia massa vitae lectus congue venenatis. Nulla facilisi. Maecenas fermentum pretium diam id aliquet.",
    icon: BoxUnpackedIcon,
  },
};
