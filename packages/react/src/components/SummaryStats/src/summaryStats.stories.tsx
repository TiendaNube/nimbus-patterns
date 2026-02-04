import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@nimbus-ds/components";

import { SummaryStats } from "./SummaryStats";

const meta: Meta<typeof SummaryStats> = {
  title: "Patterns/SummaryStats",
  component: SummaryStats,
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SummaryStats>;

export const Basic: Story = {
  render: (args) => (
    <SummaryStats {...args}>
      <SummaryStats.Stat
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
      />
      <SummaryStats.Stat
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
      />
      <SummaryStats.Stat
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
      />
      <SummaryStats.Stat
        value="3.2%"
        trend="up"
        trendText="0.5%"
        description="Conversion Rate"
      />
    </SummaryStats>
  ),
};

export const WithInfoTooltip: Story = {
  args: {
    layout: "horizontal",
  },

  render: (args) => (
    <SummaryStats {...args}>
      <SummaryStats.Stat
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue from all completed orders in the selected period"
      />
      <SummaryStats.Stat
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders placed in the selected period"
      />
      <SummaryStats.Stat
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
        infoTooltip="Unique customers who made a purchase"
      />
      <SummaryStats.Stat
        value="3.2%"
        trend="up"
        trendText="0.5%"
        description="Conversion Rate"
        infoTooltip="Percentage of visitors who completed a purchase"
      />
    </SummaryStats>
  ),
};

export const Expandable: Story = {
  render: (args) => (
    <SummaryStats {...args} expandable>
      <SummaryStats.Stat
        id="sales"
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue from all completed orders"
      />
      <SummaryStats.Stat
        id="orders"
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders placed"
      />
      <SummaryStats.Stat
        id="customers"
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
        infoTooltip="Unique customers"
      />
      <SummaryStats.Stat
        id="conversion"
        value="3.2%"
        trend="up"
        trendText="0.5%"
        description="Conversion Rate"
        infoTooltip="Visitors who completed a purchase"
      />
      <SummaryStats.Content>
        <Box padding="4">
          <Text>
            Click on any stat above to see this content. This area can contain
            charts, tables, or any additional details related to the selected
            metric.
          </Text>
        </Box>
      </SummaryStats.Content>
    </SummaryStats>
  ),
};

export const SixStats: Story = {
  render: (args) => (
    <SummaryStats {...args}>
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
    </SummaryStats>
  ),
};

export const ExpandableWithDefaultSelected: Story = {
  render: (args) => (
    <SummaryStats {...args} expandable defaultSelectedId="orders">
      <SummaryStats.Stat
        id="sales"
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
      />
      <SummaryStats.Stat
        id="orders"
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
      />
      <SummaryStats.Stat
        id="customers"
        value="89"
        trend="up"
        trendText="12%"
        description="Customers"
      />
      <SummaryStats.Content>
        <Box padding="4">
          <Text fontWeight="bold">Orders Details</Text>
          <Text>
            This content is shown by default because defaultSelectedId is set to
            orders.
          </Text>
        </Box>
      </SummaryStats.Content>
    </SummaryStats>
  ),
};

export const WithDownTrends: Story = {
  render: (args) => (
    <SummaryStats {...args}>
      <SummaryStats.Stat
        value="$8,200.00"
        trend="down"
        trendText="12%"
        description="Total Sales"
        infoTooltip="Decreased compared to last month"
      />
      <SummaryStats.Stat
        value="98"
        trend="down"
        trendText="25%"
        description="Orders"
        infoTooltip="Fewer orders this period"
      />
      <SummaryStats.Stat
        value="45"
        trend="down"
        trendText="5%"
        description="Customers"
        infoTooltip="Slight decrease in customers"
      />
      <SummaryStats.Stat
        value="1.8%"
        trend="down"
        trendText="0.8%"
        description="Conversion Rate"
        infoTooltip="Lower conversion this month"
      />
    </SummaryStats>
  ),
};

export const LayoutHorizontal: Story = {
  render: (args) => (
    <SummaryStats {...args} layout="horizontal">
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
    </SummaryStats>
  ),
};

export const LayoutGridFourItems: Story = {
  render: (args) => (
    <SummaryStats {...args} layout="grid">
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
    </SummaryStats>
  ),
};

export const LayoutGridTwoItems: Story = {
  render: (args) => (
    <SummaryStats {...args} layout="grid">
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
    </SummaryStats>
  ),
};

export const LayoutGridExpandable: Story = {
  render: (args) => (
    <SummaryStats {...args} layout="grid" expandable>
      <SummaryStats.Stat
        id="sales"
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue"
      />
      <SummaryStats.Stat
        id="orders"
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders"
      />
      <SummaryStats.Stat
        id="customers"
        value="89"
        trend="up"
        trendText="12%"
        description="Customers"
        infoTooltip="Unique customers"
      />
      <SummaryStats.Stat
        id="conversion"
        value="3.2%"
        trend="neutral"
        trendText="0%"
        description="Conversion Rate"
        infoTooltip="Conversion percentage"
      />
      <SummaryStats.Content>
        <Box padding="4">
          <Text>
            Click on any stat above to see detailed information. This grid
            layout is ideal for dashboard summaries.
          </Text>
        </Box>
      </SummaryStats.Content>
    </SummaryStats>
  ),
};

/**
 * Mobile Carousel Layout - Shows a horizontal carousel on mobile when more than 3 items.
 * Resize the viewport to mobile to see the carousel behavior.
 */
export const MobileCarousel: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => (
    <SummaryStats {...args} mobileLayout="carousel">
      <SummaryStats.Stat
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue"
      />
      <SummaryStats.Stat
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders"
      />
      <SummaryStats.Stat
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
        infoTooltip="Unique customers"
      />
      <SummaryStats.Stat
        value="3.2%"
        trend="up"
        trendText="0.5%"
        description="Conversion Rate"
        infoTooltip="Conversion percentage"
      />
    </SummaryStats>
  ),
};

/**
 * Mobile Carousel with 6 items - Demonstrates carousel with more items.
 * Swipe horizontally to see all items.
 */
export const MobileCarouselSixItems: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => (
    <SummaryStats {...args} mobileLayout="carousel">
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Stat
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
    </SummaryStats>
  ),
};

/**
 * Mobile Stack Layout - Disables carousel and stacks items vertically on mobile.
 */
export const MobileStack: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => (
    <SummaryStats {...args} mobileLayout="stack">
      <SummaryStats.Stat
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue"
      />
      <SummaryStats.Stat
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders"
      />
      <SummaryStats.Stat
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
        infoTooltip="Unique customers"
      />
      <SummaryStats.Stat
        value="3.2%"
        trend="up"
        trendText="0.5%"
        description="Conversion Rate"
        infoTooltip="Conversion percentage"
      />
    </SummaryStats>
  ),
};

/**
 * Mobile Carousel with Expandable content.
 */
export const MobileCarouselExpandable: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => (
    <SummaryStats {...args} mobileLayout="carousel" expandable>
      <SummaryStats.Stat
        id="sales"
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue"
      />
      <SummaryStats.Stat
        id="orders"
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders"
      />
      <SummaryStats.Stat
        id="customers"
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
        infoTooltip="Unique customers"
      />
      <SummaryStats.Stat
        id="conversion"
        value="3.2%"
        trend="up"
        trendText="0.5%"
        description="Conversion Rate"
        infoTooltip="Conversion percentage"
      />
      <SummaryStats.Content>
        <Box padding="4">
          <Text>
            Tap on any stat above to see this content. Swipe horizontally to
            navigate between stats.
          </Text>
        </Box>
      </SummaryStats.Content>
    </SummaryStats>
  ),
};
