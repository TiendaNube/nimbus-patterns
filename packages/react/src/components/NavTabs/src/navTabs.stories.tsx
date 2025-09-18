import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  HomeIcon,
  MoneyIcon,
  TagIcon,
  MenuIcon,
  GenerativeStarsIcon,
} from "@nimbus-ds/icons";

import { NavTabs } from "./NavTabs";

const meta: Meta<typeof NavTabs> = {
  title: "Patterns/NavTabs",
  component: NavTabs,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavTabs>;

export const basic: Story = {
  args: {
    children: (
      <>
        <NavTabs.Item
          active
          icon={<HomeIcon size="medium" />}
          onClick={() => false}
          ariaLabel="Home"
        />
        <NavTabs.Item
          badge
          icon={<MoneyIcon size="medium" />}
          onClick={() => false}
          ariaLabel="Orders"
        />
        <NavTabs.Item
          icon={<TagIcon size="medium" />}
          onClick={() => false}
          ariaLabel="Products"
        />
        <NavTabs.Item
          icon={<MenuIcon size="medium" />}
          onClick={() => false}
          ariaLabel="Menu"
        />
      </>
    ),
  },
};

export const withAiItem: Story = {
  args: {
    children: (
      <>
        <NavTabs.Item
          active
          icon={<HomeIcon size="medium" />}
          onClick={() => false}
          ariaLabel="Home"
        />
        <NavTabs.Item
          badge
          icon={<MoneyIcon size="medium" />}
          onClick={() => false}
          ariaLabel="Orders"
        />
        <NavTabs.Item
          icon={<GenerativeStarsIcon size="medium" />}
          onClick={() => false}
          ariaLabel="AI"
          appearance="ai-generative"
        />
        <NavTabs.Item
          icon={<TagIcon size="medium" />}
          onClick={() => false}
          ariaLabel="Products"
        />
        <NavTabs.Item
          icon={<MenuIcon size="medium" />}
          onClick={() => false}
          ariaLabel="Menu"
        />
      </>
    ),
  },
};
