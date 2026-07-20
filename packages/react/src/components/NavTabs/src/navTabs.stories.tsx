import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon, MoneyIcon, TagIcon, MenuIcon } from "@nimbus-ds/icons";

import { NavTabs } from "./NavTabs";

const meta: Meta<typeof NavTabs> = {
  title: "Patterns/NavTabs",
  component: NavTabs,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      // NavTabs uses `position: fixed`, which targets the real browser
      // viewport unless an ancestor establishes a new containing block.
      // Storybook's Docs page renders stories inline rather than in a
      // full-height iframe (unlike Canvas), so without this the bar
      // escapes the small preview box and it renders empty. `transform`
      // creates that containing block; the fixed height gives the
      // preview box something to show (fixed content adds no flow height).
      <div
        style={{
          position: "relative",
          height: "80px",
          overflow: "hidden",
          transform: "translateZ(0)",
        }}
      >
        <Story />
      </div>
    ),
  ],
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

export const withAIGenerativeItem: Story = {
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
        <NavTabs.Item
          appearance="ai-generative"
          onClick={() => false}
          ariaLabel="Lumi assistant"
        />
      </>
    ),
  },
};
