import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line
import { useArgs } from "@storybook/client-api";

import { ChevronRightIcon, HomeIcon } from "@nimbus-ds/icons";
import { Box, Tag, Badge, Icon } from "@nimbus-ds/components";

import { MenuButton } from "./MenuButton";

export default {
  title: "Patterns/MenuButton",
  component: MenuButton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    label: {
      control: "text",
    },
    onClick: {
      control: { disable: true },
    },
    startIcon: {
      control: { disable: true },
    },
    children: {
      control: { disable: true },
    },
    active: {
      control: "boolean",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof MenuButton>;

const Template: ComponentStory<typeof MenuButton> = (args) => {
  const [{ active }, updateArgs] = useArgs();
  const handleActive = () => updateArgs({ active: !active });

  return <MenuButton {...args} onClick={handleActive} active={active} />;
};

const AccordionTemplate: ComponentStory<typeof MenuButton> = (args) => {
  const [{ active }, updateArgs] = useArgs();
  const handleActive = () => updateArgs({ active: !active });

  return (
    <Box
      backgroundColor={active ? "primary-surface" : "neutral-background"}
      borderRadius=".5rem"
    >
      <MenuButton
        {...args}
        onClick={handleActive}
        active={active}
        id="control-1"
        aria-expanded={active}
        aria-controls="content-1"
      />
      {active && (
        <Box
          id="content-1"
          aria-hidden={!active}
          height={active ? "auto" : "0"}
          overflow="hidden"
          pl="6"
          pt="1"
          pb="1"
          pr="1"
        >
          <MenuButton label="First item" />
          <MenuButton label="Second item" />
        </Box>
      )}
    </Box>
  );
};

export const sampleAppMenuButton = Template.bind({});
sampleAppMenuButton.args = {
  label: "Menu button",
  startIcon: HomeIcon,
};

export const accordionMenuButton = AccordionTemplate.bind({});
accordionMenuButton.args = {
  label: "Menu accordion",
  startIcon: HomeIcon,
};

export const menuButtonWithTag = Template.bind({});
menuButtonWithTag.args = {
  label: "Button with tag children",
  startIcon: HomeIcon,
  children: <Tag appearance="primary">Children tag</Tag>,
};

export const menuButtonWithBadge = Template.bind({});
menuButtonWithBadge.args = {
  label: "Button with badge children",
  startIcon: HomeIcon,
  children: <Badge count="9999" appearance="primary" />,
};

export const menuButtonWithRightIcon = Template.bind({});
menuButtonWithRightIcon.args = {
  label: "Button with right icon children",
  startIcon: HomeIcon,
  children: <Icon source={<ChevronRightIcon />} />,
};
