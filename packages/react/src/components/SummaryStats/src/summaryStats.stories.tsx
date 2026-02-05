import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@nimbus-ds/components";

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
        description="Conversion"
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
        description="Conversion"
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
        description="Conversion"
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
        description="Conversion"
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
    <SummaryStats {...args}>
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
        description="Conversion"
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
    <SummaryStats {...args} expandable>
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
        description="Conversion"
        infoTooltip="Conversion percentage"
      >
        <Text>Conversion rate breakdown and trends.</Text>
      </SummaryStats.Stat>
    </SummaryStats>
  ),
};
