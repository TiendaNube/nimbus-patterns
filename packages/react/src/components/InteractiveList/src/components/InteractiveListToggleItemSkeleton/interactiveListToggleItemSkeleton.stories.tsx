import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { Tag, Box } from "@nimbus-ds/components";

import { InteractiveList } from "../../InteractiveList";

export default {
  title: "Skeleton/InteractiveList",
  component: InteractiveList,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },

  argTypes: {
    children: { control: { disable: true } },
  },
} as ComponentMeta<typeof InteractiveList>;

const Template: ComponentStory<typeof InteractiveList.ToggleItemSkeleton> = (
  args
) => (
  <InteractiveList>
    <InteractiveList.ToggleItemSkeleton {...args} />
    <InteractiveList.ToggleItemSkeleton
      {...args}
      title="Second element"
      description="Description of the second element"
    />
    <InteractiveList.ToggleItemSkeleton
      {...args}
      title="Third element"
      description="Description of the third element"
    />
  </InteractiveList>
);

export const asToggle = Template.bind({});
asToggle.args = {
  title: "Title",
  description: "Description",
  children: (
    <Box display="flex" gap="1" mt="2">
      <Tag.Skeleton />
      <Tag.Skeleton />
      <Tag.Skeleton />
    </Box>
  ),
};
