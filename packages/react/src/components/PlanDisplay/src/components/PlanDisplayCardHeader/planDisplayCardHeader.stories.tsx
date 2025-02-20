import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Text, Title } from "@nimbus-ds/components";
import { PlanDisplay } from "../../PlanDisplay";

const meta: Meta<typeof PlanDisplay.Header> = {
  title: "Patterns/PlanDisplay/PlanDisplay.Header",
  component: PlanDisplay.Header,
  argTypes: {
    children: {
      control: { type: "text" },
    },
    subtitle: { control: { type: "text" } },
    title: { control: { type: "text" } },
  },
  render: (args) => (
    <PlanDisplay.Header {...args} title={<Title as="h4">{args.title}</Title>}>
      <Text>{args.children}</Text>
    </PlanDisplay.Header>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlanDisplay.Header>;

export const base: Story = {
  args: {
    subtitle: "Plan display subtitle",
    title: "Plan display title",
    children: "Plan display header children",
  },
};
