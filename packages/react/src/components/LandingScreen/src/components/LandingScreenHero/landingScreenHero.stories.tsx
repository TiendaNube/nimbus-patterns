import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CalloutCard } from "@nimbus-ds/callout-card";
import { Box, Link } from "@nimbus-ds/components";
import { BoxUnpackedIcon } from "@nimbus-ds/icons";
import { LandingScreenHero } from "./LandingScreenHero";
import { LandingScreen } from "../../LandingScreen";

const meta: Meta<typeof LandingScreen.Hero> = {
  title: "Patterns/LandingScreen/LandingScreen.Hero",
  component: LandingScreen.Hero,
  argTypes: {},
  tags: ["autodocs"],
  render: ({ ...args }) => (
    <LandingScreenHero
      {...args}
      image={{ src: "/static/3.jpg", alt: "/static/3.jpg" }}
      title="Hero title"
      subtitle="Hero subtitle"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel tincidunt nunc, in porttitor erat. Sed tristique mauris porttitor, lobortis nibh nec, vulputate tellus. Donec lacinia massa vitae lectus congue venenatis. Nulla facilisi. Maecenas fermentum pretium diam id aliquet."
    />
  ),
};

export default meta;
type Story = StoryObj<typeof LandingScreen.Hero>;

export const basic: Story = {
  args: {},
};

export const withModule: Story = {
  args: {
    children: [
      <LandingScreen.Module
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
      </LandingScreen.Module>,
    ],
  },
};
