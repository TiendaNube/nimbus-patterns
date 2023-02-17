import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Box, Text } from "@nimbus-ds/components";

import { Layout } from "./Layout";

export default {
  title: "Patterns/Layout",
  component: Layout,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "Layout.Section": Layout.Section,
  },
  argTypes: {
    children: {
      control: { disable: true },
      description: "Content to be rendered inside the layout.",
    },
    columns: {
      control: "select",
      description: "Number of columns to be rendered for the children",
    },
  },
} as ComponentMeta<typeof Layout>;

interface ExampleBoxProps {
  text: string;
}

const ExampleBox: React.FC<ExampleBoxProps> = ({ text }: ExampleBoxProps) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    backgroundColor="primary.surface"
    borderColor="primary.interactive"
    borderStyle="dashed"
    borderWidth="1px"
    borderRadius=".5rem"
    width="100%"
    padding="4"
    boxSizing="border-box"
  >
    <Text fontSize="caption" textAlign="center" color="primary.interactive">
      {text}
    </Text>
  </Box>
);

const Template: ComponentStory<typeof Layout> = (args) => (
  <Layout {...args}>
    <Layout.Section>
      <ExampleBox text="1st content" />
    </Layout.Section>
    <Layout.Section>
      <ExampleBox text="2nd content" />
    </Layout.Section>
    <Layout.Section>
      <ExampleBox text="3rd content" />
    </Layout.Section>
    <Layout.Section>
      <ExampleBox text="4th content" />
    </Layout.Section>
    <Layout.Section>
      <ExampleBox text="5th content" />
    </Layout.Section>
    <Layout.Section>
      <ExampleBox text="6th content" />
    </Layout.Section>
  </Layout>
);

export const oneColumn = Template.bind({});
oneColumn.args = {
  columns: "1",
};

export const twoColumnsAsymmetric = Template.bind({});
twoColumnsAsymmetric.args = {
  columns: "2 - asymmetric",
};

export const twoColumnsSymmetric = Template.bind({});
twoColumnsSymmetric.args = {
  columns: "2 - symmetric",
};

export const threeColumns = Template.bind({});
threeColumns.args = {
  columns: "3",
};
