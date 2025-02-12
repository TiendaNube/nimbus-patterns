import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CalloutCard } from "@nimbus-ds/callout-card";
import { Box, Button, Link } from "@nimbus-ds/components";
import { BoxUnpackedIcon, TiendanubeIcon } from "@nimbus-ds/icons";
import { InitialScreenHero } from "./InitialScreenHero";
import { InitialScreen } from "../../InitialScreen";
import InitialScreenBullet from "../InitialScreenBullet";

const meta: Meta<typeof InitialScreen.Hero> = {
  title: "Patterns/InitialScreen/InitialScreen.Hero",
  component: InitialScreen.Hero,
  argTypes: {
    actions: { control: { type: "text" } },
    bullets: { control: { type: "text" } },
    description: { control: { type: "text" } },
    children: { control: false },
    image: { control: false },
    as: { control: false },
  },
  tags: ["autodocs"],
  render: ({ actions, bullets, image, ...args }) => (
    <InitialScreenHero
      {...args}
      image={
        <img
          src="./static/mockup-perfit.jpg"
          alt="./static/mockup-perfit.jpg"
          width="100%"
        />
      }
      actions={
        actions && (
          <Box>
            <Button>{actions}</Button>
          </Box>
        )
      }
      bullets={
        bullets && [
          <InitialScreenBullet
            // We are sure that we're getting strings here as we set the control type to text
            text={bullets as unknown as string}
            icon={<TiendanubeIcon />}
          />,
        ]
      }
    />
  ),
};

export default meta;
type Story = StoryObj<typeof InitialScreen.Hero>;

export const basic: Story = {
  args: {
    title: "Hero title",
    subtitle: "Hero subtitle",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel tincidunt nunc, in porttitor erat. Sed tristique mauris porttitor, lobortis nibh nec, vulputate tellus. Donec lacinia massa vitae lectus congue venenatis. Nulla facilisi. Maecenas fermentum pretium diam id aliquet.",
  },
};

export const withModule: Story = {
  args: {
    title: "Hero title",
    subtitle: "Hero subtitle",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel tincidunt nunc, in porttitor erat. Sed tristique mauris porttitor, lobortis nibh nec, vulputate tellus. Donec lacinia massa vitae lectus congue venenatis. Nulla facilisi. Maecenas fermentum pretium diam id aliquet.",
    image: <img src="./static/3_320x320.jpg" alt="./static/3_320x320.jpg" />,
    children: [
      <InitialScreen.Module
        title="Module title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <CalloutCard
          appearance="primary"
          title="Callout card title"
          subtitle="Callout card description. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          link={
            <Box display="flex" gap="3">
              <Link appearance="primary">Link</Link>
              <Link appearance="primary">Second link</Link>
            </Box>
          }
          icon={BoxUnpackedIcon}
        />
      </InitialScreen.Module>,
    ],
  },
};
