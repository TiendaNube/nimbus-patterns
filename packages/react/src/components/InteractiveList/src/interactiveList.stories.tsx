import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Tag, Box } from "@nimbus-ds/components";

import { InteractiveList } from "./InteractiveList";

export default {
  title: "Patterns/InteractiveList",
  component: InteractiveList,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "InteractiveList.Structure": InteractiveList.Structure,
    "InteractiveList.ButtonItem": InteractiveList.ButtonItem,
    "InteractiveList.CheckboxItem": InteractiveList.CheckboxItem,
    "InteractiveList.RadioItem": InteractiveList.RadioItem,
    "InteractiveList.ToggleItem": InteractiveList.ToggleItem,
  },
  argTypes: {
    children: { control: { disable: true } },
    topDivider: { control: "boolean" },
  },
} as ComponentMeta<typeof InteractiveList>;

const CheckboxTemplate: ComponentStory<typeof InteractiveList.CheckboxItem> = (
  args
) => (
  <InteractiveList>
    <InteractiveList.CheckboxItem {...args} />
    <InteractiveList.CheckboxItem
      {...args}
      title="Second element"
      description="Description of the second element"
    />
    <InteractiveList.CheckboxItem
      {...args}
      title="Third element"
      description="Description of the third element"
    />
  </InteractiveList>
);

const RadioTemplate: ComponentStory<typeof InteractiveList.RadioItem> = (
  args
) => (
  <InteractiveList>
    <InteractiveList.RadioItem {...args} />
    <InteractiveList.RadioItem
      {...args}
      title="Second element"
      description="Description of the second element"
    />
    <InteractiveList.RadioItem
      {...args}
      title="Third element"
      description="Description of the third element"
    />
  </InteractiveList>
);

const ToggleTemplate: ComponentStory<typeof InteractiveList.ToggleItem> = (
  args
) => (
  <InteractiveList>
    <InteractiveList.ToggleItem {...args} />
    <InteractiveList.ToggleItem
      {...args}
      title="Second element"
      description="Description of the second element"
    />
    <InteractiveList.ToggleItem
      {...args}
      title="Third element"
      description="Description of the third element"
    />
  </InteractiveList>
);

const ButtonTemplate: ComponentStory<typeof InteractiveList.ButtonItem> = (
  args
) => (
  <InteractiveList>
    <InteractiveList.ButtonItem {...args} />
    <InteractiveList.ButtonItem
      {...args}
      title="Second element"
      description="Description of the second element"
    />
    <InteractiveList.ButtonItem
      {...args}
      title="Third element"
      description="Description of the third element"
    />
  </InteractiveList>
);

const NoDividersTemplate: ComponentStory<typeof InteractiveList.ButtonItem> = (
  args
) => (
  <InteractiveList bottomDivider={false}>
    <InteractiveList.ButtonItem {...args} />
    <InteractiveList.ButtonItem
      {...args}
      title="Second element"
      description="Description of the second element"
    />
    <InteractiveList.ButtonItem
      {...args}
      title="Third element"
      description="Description of the third element"
    />
  </InteractiveList>
);

export const asCheckbox = CheckboxTemplate.bind({});
asCheckbox.args = {
  title: "Title",
  description: "Description",
  checkbox: { name: "InteractiveList elements" },
  children: (
    <Box display="flex" gap="1" mt="2">
      <Tag>Text</Tag>
      <Tag>Text</Tag>
      <Tag>Text</Tag>
    </Box>
  ),
};

export const asRadio = RadioTemplate.bind({});
asRadio.args = {
  title: "Title",
  description: "Description",
  radio: { name: "InteractiveList elements" },
  children: (
    <Box display="flex" gap="1" mt="2">
      <Tag>Text</Tag>
      <Tag>Text</Tag>
      <Tag>Text</Tag>
    </Box>
  ),
};

export const asToggle = ToggleTemplate.bind({});
asToggle.args = {
  title: "Title",
  description: "Description",
  toggle: { name: "InteractiveList elements" },
  children: (
    <Box display="flex" gap="1" mt="2">
      <Tag>Text</Tag>
      <Tag>Text</Tag>
      <Tag>Text</Tag>
    </Box>
  ),
};

export const asButton = ButtonTemplate.bind({});
asButton.args = {
  title: "Title",
  description: "Description",
  iconButton: { onClick: () => console.log("clicked") },
  children: (
    <Box display="flex" gap="1" mt="2">
      <Tag>Text</Tag>
      <Tag>Text</Tag>
      <Tag>Text</Tag>
    </Box>
  ),
};

export const noDividers = NoDividersTemplate.bind({});
noDividers.args = {
  title: "Title",
  description: "Description",
  iconButton: { onClick: () => console.log("clicked") },
  topDivider: false,
  children: (
    <Box display="flex" gap="1" mt="2">
      <Tag>Text</Tag>
      <Tag>Text</Tag>
      <Tag>Text</Tag>
    </Box>
  ),
};
