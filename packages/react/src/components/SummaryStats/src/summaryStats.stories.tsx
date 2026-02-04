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
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue from all completed orders"
      >
        <Text>
          Sales details: Total revenue from all completed orders in the selected
          period.
        </Text>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders placed"
      >
        <Text>
          Orders details: Number of orders placed in the selected period.
        </Text>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
        infoTooltip="Unique customers"
      >
        <Text>Customers details: Unique customers who made a purchase.</Text>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="3.2%"
        trend="up"
        trendText="0.5%"
        description="Conversion Rate"
        infoTooltip="Visitors who completed a purchase"
      >
        <Text>
          Conversion details: Percentage of visitors who completed a purchase.
        </Text>
      </SummaryStats.Stat>
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
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue"
      >
        <Text>Sales: Total revenue from all completed orders.</Text>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders"
      >
        <Text>Orders: Number of orders placed in the period.</Text>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="89"
        trend="up"
        trendText="12%"
        description="Customers"
        infoTooltip="Unique customers"
      >
        <Text>Customers: Unique customers who made a purchase.</Text>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="3.2%"
        trend="neutral"
        trendText="0%"
        description="Conversion Rate"
        infoTooltip="Conversion percentage"
      >
        <Text>Conversion: Grid layout is ideal for dashboard summaries.</Text>
      </SummaryStats.Stat>
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
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue"
      >
        <Text>
          Sales details. Swipe horizontally to navigate between stats.
        </Text>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders"
      >
        <Text>Orders details. Tap on any stat to see its content.</Text>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
        infoTooltip="Unique customers"
      >
        <Text>Customers analytics and insights.</Text>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="3.2%"
        trend="up"
        trendText="0.5%"
        description="Conversion Rate"
        infoTooltip="Conversion percentage"
      >
        <Text>Conversion rate breakdown and trends.</Text>
      </SummaryStats.Stat>
    </SummaryStats>
  ),
};

/**
 * Expandable with Content per Stat - Each stat has its own expanded content.
 * This is the recommended API for expandable stats.
 */
export const ExpandableWithContentPerStat: Story = {
  render: (args) => (
    <SummaryStats {...args} expandable>
      <SummaryStats.Stat
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue from all completed orders"
      >
        <Box display="flex" flexDirection="column" gap="2">
          <Text fontWeight="bold">Sales Details</Text>
          <Text>
            Total revenue generated from all completed orders in the selected
            period. This includes all payment methods and excludes refunds.
          </Text>
        </Box>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders placed"
      >
        <Box display="flex" flexDirection="column" gap="2">
          <Text fontWeight="bold">Orders Details</Text>
          <Text>
            Total number of orders placed during the selected period. Down 8%
            compared to the previous period.
          </Text>
        </Box>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
        infoTooltip="Unique customers"
      >
        <Box display="flex" flexDirection="column" gap="2">
          <Text fontWeight="bold">Customers Details</Text>
          <Text>
            Number of unique customers who made a purchase. No change from the
            previous period.
          </Text>
        </Box>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="3.2%"
        trend="up"
        trendText="0.5%"
        description="Conversion Rate"
        infoTooltip="Visitors who completed a purchase"
      >
        <Box display="flex" flexDirection="column" gap="2">
          <Text fontWeight="bold">Conversion Rate Details</Text>
          <Text>
            Percentage of visitors who completed a purchase. Up 0.5% from the
            previous period, showing improved funnel performance.
          </Text>
        </Box>
      </SummaryStats.Stat>
    </SummaryStats>
  ),
};
