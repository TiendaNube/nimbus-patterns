import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line
import { useArgs } from "@storybook/client-api";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";
import { Stack } from "@nimbus-ds/stack";
import { Button } from "@nimbus-ds/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@tiendanube/icons";

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
  headerIcon: <Icon color="primary.textHigh" source={<CheckCircleIcon />} />,
  paddingHeader: "none",
  paddingBody: "none",
  paddingFooter: "none",
  headerAction: (
    <Stack display="flex" alignItems="center" gap="1">
      <Icon color="primary.textHigh" source={<ChevronLeftIcon />} />
      <Text fontWeight="bold" fontSize="highlight">
        Formas de entrega
      </Text>
    </Stack>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1px"
      borderColor="neutral.interactive"
      height="100%"
      boxSizing="border-box"
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Text textAlign="center" fontSize="base">
          Replace me with your content
        </Text>
      </Stack>
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
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1px"
      borderColor="neutral.interactive"
      height="100%"
      boxSizing="border-box"
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Text textAlign="center" fontSize="base">
          Replace me with your content
        </Text>
      </Stack>
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
  titleAction: (
    <Stack display="flex" gap="2">
      <Icon color="primary.textHigh" source={<ChevronLeftIcon />} />
      <Icon color="primary.textHigh" source={<ChevronRightIcon />} />
    </Stack>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1px"
      borderColor="neutral.interactive"
      height="100%"
      boxSizing="border-box"
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Text textAlign="center" fontSize="base">
          Replace me with your content
        </Text>
      </Stack>
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
  headerAction: (
    <Stack display="flex" alignItems="center" gap="1">
      <Icon color="primary.textHigh" source={<ChevronLeftIcon />} />
      <Text fontWeight="bold" fontSize="highlight">
        Formas de entrega
      </Text>
    </Stack>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1px"
      borderColor="neutral.interactive"
      height="100%"
      boxSizing="border-box"
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Text textAlign="center" fontSize="base">
          Replace me with your content
        </Text>
      </Stack>
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
  headerIcon: <Icon color="primary.textHigh" source={<CheckCircleIcon />} />,
  headerAction: (
    <Stack display="flex" alignItems="center" gap="1">
      <Icon color="primary.textHigh" source={<ChevronLeftIcon />} />
      <Text fontWeight="bold" fontSize="highlight">
        Formas de entrega
      </Text>
    </Stack>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1px"
      borderColor="neutral.interactive"
      height="100%"
      boxSizing="border-box"
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Text textAlign="center" fontSize="base">
          Replace me with your content
        </Text>
      </Stack>
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
  headerIcon: <Icon color="primary.textHigh" source={<CheckCircleIcon />} />,
  headerAction: (
    <Stack display="flex" alignItems="center" gap="1">
      <Icon color="primary.textHigh" source={<ChevronLeftIcon />} />
      <Text fontWeight="bold" fontSize="highlight">
        Formas de entrega
      </Text>
    </Stack>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1px"
      borderColor="neutral.interactive"
      height="100%"
      boxSizing="border-box"
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Text textAlign="center" fontSize="base">
          Replace me with your content
        </Text>
      </Stack>
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
  headerIcon: <Icon color="primary.textHigh" source={<CheckCircleIcon />} />,
  paddingBody: "base",
  headerAction: (
    <Stack display="flex" alignItems="center" gap="1">
      <Icon color="primary.textHigh" source={<ChevronLeftIcon />} />
      <Text fontWeight="bold" fontSize="highlight">
        Formas de entrega
      </Text>
    </Stack>
  ),
  children: (
    <Box
      borderStyle="dashed"
      borderWidth="1px"
      borderColor="neutral.interactive"
      height="100%"
      boxSizing="border-box"
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Text textAlign="center" fontSize="base">
          Replace me with your content
        </Text>
      </Stack>
    </Box>
  ),
};
