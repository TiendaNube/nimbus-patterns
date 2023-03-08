import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { NavTabs } from "./NavTabs";

import { HomeIcon, MoneyIcon, TagIcon, MenuIcon } from "@nimbus-ds/icons";

export default {
  title: "Patterns/NavTabs",
  component: NavTabs,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "NavTabs.Item": NavTabs.Item,
  },
  argTypes: {
    children: { control: { disable: true } },
  },
} as ComponentMeta<typeof NavTabs>;

const Template: ComponentStory<typeof NavTabs> = (args) => {
  const handleClick = () => {
    // Do nothing
  };

  return (
    <NavTabs {...args}>
      <NavTabs.Item
        active
        icon={<HomeIcon size="medium" />}
        onClick={handleClick}
      />
      <NavTabs.Item
        badge
        icon={<MoneyIcon size="medium" />}
        onClick={handleClick}
      />
      <NavTabs.Item icon={<TagIcon size="medium" />} onClick={handleClick} />
      <NavTabs.Item icon={<MenuIcon size="medium" />} onClick={handleClick} />
    </NavTabs>
  );
};

export const base = Template.bind({});
base.args = {};
