import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { ChevronRightIcon, HomeIcon } from "@nimbus-ds/icons";
import { Tag, Badge, Icon, Box } from "@nimbus-ds/components";

import { MenuExpandContext } from "@common/contexts";
import { MenuButton, MenuButtonProps } from "./MenuButton";

export const Basic: React.FC<MenuButtonProps> = (props: MenuButtonProps) => (
  <MenuButton {...props} />
);
Basic.displayName = "MenuButton";

const meta: Meta<typeof Basic> = {
  title: "Patterns/MenuButton",
  component: Basic,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: (args) => {
    const [{ active }, updateArgs] = useArgs();
    const handleActive = () => updateArgs({ active: !active });
    return <Basic {...args} onClick={handleActive} active={active} />;
  },
};

export default meta;
type Story = StoryObj<typeof MenuButton>;

export const basic: Story = {
  args: {
    label: "Menu button",
    startIcon: HomeIcon,
  },
};

export const sampleAppMenuButton: Story = {
  args: {
    label: "Menu button",
    startIcon: HomeIcon,
  },
};

export const stressedAppMenuButton: Story = {
  args: {
    label:
      "This is a very stressed menu button with a very long text to showcase what happens when the text overflows the button",
    startIcon: HomeIcon,
    children: <Tag appearance="primary">Children tag</Tag>,
  },
};

export const accordionMenuButton: Story = {
  render: (args) => (
    <MenuButton.Accordion
      contentid="content-1"
      menuButton={{
        ...args,
        id: "control-1",
        "aria-controls": "content-1",
      }}
    >
      <MenuButton label="First item" />
      <MenuButton label="Second item" />
    </MenuButton.Accordion>
  ),
  args: {
    label: "Menu accordion",
    startIcon: HomeIcon,
  },
};

export const menuButtonWithTag: Story = {
  args: {
    label: "Button with tag children",
    startIcon: HomeIcon,
    children: <Tag appearance="primary">Children tag</Tag>,
  },
};

export const menuButtonWithBadge: Story = {
  args: {
    label: "Button with badge children",
    startIcon: HomeIcon,
    children: <Badge count="9999" appearance="primary" />,
  },
};

export const menuButtonWithRightIcon: Story = {
  args: {
    label: "Button with right icon children",
    startIcon: HomeIcon,
    children: <Icon source={<ChevronRightIcon />} />,
  },
};

export const menuButtonCollapsed: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState(false);
    return (
      <>
        Click the button to {expanded ? "collapse" : "expand"}
        <Box maxWidth="200px">
          <MenuButton
            {...args}
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          />
        </Box>
      </>
    );
  },
  args: {
    label: "Menu button",
    startIcon: HomeIcon,
  },
};

export const accordionMenuButtonCollapsed: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState(false);
    return (
      <>
        Click the accordion to {expanded ? "collapse" : "expand"}
        <Box maxWidth="200px">
          <MenuButton.Accordion
            contentid="content-1"
            menuButton={{
              ...args,
              id: "control-1",
              "aria-controls": "content-1",
            }}
            onClick={() => setExpanded(!expanded)}
            expanded={expanded}
          >
            <MenuButton label="First item" />
            <MenuButton label="Second item" />
          </MenuButton.Accordion>
        </Box>
      </>
    );
  },
  args: {
    label: "Button collapsed",
    startIcon: HomeIcon,
  },
};

export const accordionNavigationPattern: Story = {
  render: () => {
    const [activeRoute, setActiveRoute] = useState("");
    const [activeAccordionPopover, setActiveAccordionPopover] = useState<
      string | null
    >(null);

    return (
      <MenuExpandContext.Provider
        value={{
          expanded: false,
          showTooltipsWhenCollapsed: true,
          activeAccordionPopover,
          setActiveAccordionPopover,
        }}
      >
        <Box display="flex" flexDirection="column" gap="4">
          <Box>
            Current Route: <strong>{activeRoute}</strong> - Menu is collapsed
          </Box>
          <Box display="flex" gap="4">
            <Box maxWidth="200px">
              <MenuButton.Accordion
                contentid="products-content"
                active={activeRoute.startsWith("products")}
                menuButton={{
                  label: "Products",
                  startIcon: HomeIcon,
                  id: "products-control",
                  "aria-controls": "products-content",
                  onClick: () => {
                    setActiveRoute("products-list");
                  },
                }}
              >
                <MenuButton
                  label="Product List"
                  active={activeRoute === "products-list"}
                  onClick={() => setActiveRoute("products-list")}
                />
                <MenuButton
                  label="Inventory"
                  active={activeRoute === "products-inventory"}
                  onClick={() => setActiveRoute("products-inventory")}
                >
                  <Tag appearance="primary">100</Tag>
                </MenuButton>
                <MenuButton
                  label="Categories"
                  active={activeRoute === "products-categories"}
                  onClick={() => setActiveRoute("products-categories")}
                />
              </MenuButton.Accordion>
            </Box>
          </Box>
        </Box>
      </MenuExpandContext.Provider>
    );
  },
};
