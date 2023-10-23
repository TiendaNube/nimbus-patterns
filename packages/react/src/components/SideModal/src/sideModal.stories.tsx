import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Icon, Text, Button, Box } from "@nimbus-ds/components";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@nimbus-ds/icons";

import { SideModal } from "./SideModal";
import { SideModalProps } from "./sideModal.types";

const meta: Meta<typeof SideModal> = {
  title: "Patterns/SideModal",
  component: SideModal,
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
  },
  tags: ["autodocs"],
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleClose = () => updateArgs({ open: !open });
    return (
      <>
        <Button onClick={handleClose}>Open</Button>
        <SideModal {...args} onRemove={handleClose} open={open} />
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof SideModal>;

export const basic: Story = {
  args: {
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
  },
};

const render = (args: SideModalProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen((prevState) => !prevState);
  return (
    <>
      <Button onClick={handleClose}>Open</Button>
      <SideModal {...args} onRemove={handleClose} open={open} />
    </>
  );
};

export const withTitle: Story = {
  render,
  args: {
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
  },
};

export const withTitleAction: Story = {
  render,
  args: {
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
  },
};

export const withHeaderAction: Story = {
  render,
  args: {
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
  },
};

export const withHeaderIcon: Story = {
  render,
  args: {
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
  },
};

export const withFooter: Story = {
  render,
  args: {
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
  },
};

export const withoutFooter: Story = {
  render,
  args: {
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
  },
};
