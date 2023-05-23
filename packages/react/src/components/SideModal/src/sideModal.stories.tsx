import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line
import { useArgs } from "@storybook/client-api";
import { Icon, Text, Button, Box } from "@nimbus-ds/components";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@nimbus-ds/icons";

import { SideModal } from "./SideModal";

export default {
  title: "Patterns/SideModal",
  component: SideModal,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    titleAction: { control: { disable: true } },
    headerAction: { control: { disable: true } },
    headerIcon: { control: { disable: true } },
    children: { control: { disable: true } },
    padding: {
      control: "radio",
      options: ["none", "base"],
      description: "SideModal padding",
      defaultValue: "none",
      table: {
        type: { summary: '"none" | "base"' },
        defaultValue: { summary: '"none"' },
      },
    },
    position: {
      control: "radio",
      options: ["left", "right"],
      description: "SideModal position",
      defaultValue: "right",
      table: {
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: '"right"' },
      },
    },
    open: {
      control: "boolean",
      description: "Controls the menu display",
      defaultValue: false,
      table: {
        type: { summary: "boolean" },
      },
    },
    onRemove: {
      control: { disable: true },
      description: "Function to be passed on actioning the dismiss button",
      table: {
        type: { summary: "(() => void)" },
      },
    },
    maxWidth: {
      table: {
        type: { summary: "string | Conditions<string>" },
        defaultValue: { summary: "375px" },
      },
    },
    zIndex: {
      control: { type: "number" },
      table: {
        type: { summary: "number | Conditions<number>" },
      },
    },
  },
} as ComponentMeta<typeof SideModal>;

const Template: ComponentStory<typeof SideModal> = (args) => {
  const [{ open }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ open: !open });
  return (
    <>
      <Button onClick={handleClose}>Open</Button>
      <SideModal {...args} onRemove={handleClose} open={open} />
    </>
  );
};

export const base = Template.bind({});
base.args = {
  maxWidth: { xs: "100%", md: "340px", lg: "540px" },
  title: "Instalar Kangu",
  headerIcon: <Icon color="primary-textHigh" source={<CheckCircleIcon />} />,
  padding: "base",
  paddingHeader: "none",
  paddingBody: "none",
  paddingFooter: "none",
  headerAction: (
    <Box display="flex" alignItems="center" gap="1">
      <Icon color="primary-textHigh" source={<ChevronLeftIcon />} />
      <Text fontWeight="bold" fontSize="highlight">
        Formas de entrega
      </Text>
    </Box>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1"
      borderColor="neutral-interactive"
      height="100%"
      boxSizing="border-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center" fontSize="base">
        Replace me with your content
      </Text>
    </Box>
  ),
  footer: {
    primaryAction: { children: "Button" },
    secondaryAction: { children: "Button", appearance: "primary" },
  },
};

export const withTitle = Template.bind({});
withTitle.args = {
  maxWidth: { xs: "100%", md: "340px", lg: "540px" },
  title: "Instalar Kangu",
  padding: "base",
  paddingHeader: "none",
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1"
      borderColor="neutral-interactive"
      height="100%"
      boxSizing="border-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center" fontSize="base">
        Replace me with your content
      </Text>
    </Box>
  ),
  footer: {
    primaryAction: { children: "Button" },
    secondaryAction: { children: "Button", appearance: "primary" },
  },
};

export const withTitleAction = Template.bind({});
withTitleAction.args = {
  maxWidth: { xs: "100%", md: "340px", lg: "540px" },
  title: "Instalar Kangu",
  padding: "base",
  paddingHeader: "none",
  titleAction: (
    <Box display="flex" gap="2">
      <Icon color="primary-textHigh" source={<ChevronLeftIcon />} />
      <Icon color="primary-textHigh" source={<ChevronRightIcon />} />
    </Box>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1"
      borderColor="neutral-interactive"
      height="100%"
      boxSizing="border-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center" fontSize="base">
        Replace me with your content
      </Text>
    </Box>
  ),
  footer: {
    primaryAction: { children: "Button" },
    secondaryAction: { children: "Button", appearance: "primary" },
  },
};

export const withHeaderAction = Template.bind({});
withHeaderAction.args = {
  maxWidth: { xs: "100%", md: "340px", lg: "540px" },
  title: "Instalar Kangu",
  padding: "base",
  paddingHeader: "none",
  headerAction: (
    <Box display="flex" alignItems="center" gap="1">
      <Icon color="primary-textHigh" source={<ChevronLeftIcon />} />
      <Text fontWeight="bold" fontSize="highlight">
        Formas de entrega
      </Text>
    </Box>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1"
      borderColor="neutral-interactive"
      height="100%"
      boxSizing="border-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center" fontSize="base">
        Replace me with your content
      </Text>
    </Box>
  ),
  footer: {
    primaryAction: { children: "Button" },
    secondaryAction: { children: "Button", appearance: "primary" },
  },
};

export const withHeaderIcon = Template.bind({});
withHeaderIcon.args = {
  maxWidth: { xs: "100%", md: "340px", lg: "540px" },
  title: "Instalar Kangu",
  padding: "base",
  paddingHeader: "none",
  headerIcon: <Icon color="primary-textHigh" source={<CheckCircleIcon />} />,
  headerAction: (
    <Box display="flex" alignItems="center" gap="1">
      <Icon color="primary-textHigh" source={<ChevronLeftIcon />} />
      <Text fontWeight="bold" fontSize="highlight">
        Formas de entrega
      </Text>
    </Box>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1"
      borderColor="neutral-interactive"
      height="100%"
      boxSizing="border-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center" fontSize="base">
        Replace me with your content
      </Text>
    </Box>
  ),
  footer: {
    primaryAction: { children: "Button" },
    secondaryAction: { children: "Button", appearance: "primary" },
  },
};

export const withFooter = Template.bind({});
withFooter.args = {
  maxWidth: { xs: "100%", md: "340px", lg: "540px" },
  title: "Instalar Kangu",
  padding: "base",
  paddingHeader: "none",
  headerIcon: <Icon color="primary-textHigh" source={<CheckCircleIcon />} />,
  headerAction: (
    <Box display="flex" alignItems="center" gap="1">
      <Icon color="primary-textHigh" source={<ChevronLeftIcon />} />
      <Text fontWeight="bold" fontSize="highlight">
        Formas de entrega
      </Text>
    </Box>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1"
      borderColor="neutral-interactive"
      height="100%"
      boxSizing="border-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center" fontSize="base">
        Replace me with your content
      </Text>
    </Box>
  ),
  footer: {
    primaryAction: { children: "Button" },
    secondaryAction: { children: "Button", appearance: "primary" },
  },
};

export const withoutFooter = Template.bind({});
withoutFooter.args = {
  maxWidth: { xs: "100%", md: "340px", lg: "540px" },
  title: "Instalar Kangu",
  headerIcon: <Icon color="primary-textHigh" source={<CheckCircleIcon />} />,
  paddingBody: "base",
  headerAction: (
    <Box display="flex" alignItems="center" gap="1">
      <Icon color="primary-textHigh" source={<ChevronLeftIcon />} />
      <Text fontWeight="bold" fontSize="highlight">
        Formas de entrega
      </Text>
    </Box>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1"
      borderColor="neutral-interactive"
      height="100%"
      boxSizing="border-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center" fontSize="base">
        Replace me with your content
      </Text>
    </Box>
  ),
};
