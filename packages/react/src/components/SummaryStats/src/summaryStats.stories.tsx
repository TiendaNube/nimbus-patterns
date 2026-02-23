import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/components";

import { SummaryStats } from "./SummaryStats";

const ChartMockup: React.FC<{
  color: "neutral-textLow" | "success-interactive" | "danger-interactive";
}> = ({ color = "neutral-textLow" }) => (
  <Box display="flex" alignItems="flex-end" gap="1" height="300px">
    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height) => (
      <Box width="100%" height={`${height}%`} backgroundColor={color} />
    ))}
  </Box>
);

const meta: Meta<typeof SummaryStats> = {
  title: "Patterns/SummaryStats",
  component: SummaryStats,
  argTypes: {
    children: {
      control: { disable: true },
    },
    layout: {
      control: { type: "inline-radio" },
      options: ["horizontal", "grid"],
    },
    expandable: {
      control: { type: "boolean" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SummaryStats>;

export const Basic: Story = {
  render: (args) => (
    <SummaryStats {...args}>
      <SummaryStats.Item
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
      />
      <SummaryStats.Item
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
      />
      <SummaryStats.Item
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
      />
      <SummaryStats.Item
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
      <SummaryStats.Item
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue from all completed orders in the selected period"
      />
      <SummaryStats.Item
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders placed in the selected period"
      />
      <SummaryStats.Item
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
        infoTooltip="Unique customers who made a purchase"
      />
      <SummaryStats.Item
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
      <SummaryStats.Item
        value="$12,450.00"
        trend="up"
        trendText="15%"
        description="Total Sales"
        infoTooltip="Total revenue from all completed orders"
      >
        <ChartMockup color="success-interactive" />
      </SummaryStats.Item>
      <SummaryStats.Item
        value="156"
        trend="down"
        trendText="8%"
        description="Orders"
        infoTooltip="Number of orders placed"
      >
        <ChartMockup color="danger-interactive" />
      </SummaryStats.Item>
      <SummaryStats.Item
        value="89"
        trend="neutral"
        trendText="0%"
        description="Customers"
        infoTooltip="Unique customers"
      >
        <ChartMockup color="neutral-textLow" />
      </SummaryStats.Item>
      <SummaryStats.Item
        value="3.2%"
        trend="up"
        trendText="0.5%"
        description="Conversion"
        infoTooltip="Visitors who completed a purchase"
      >
        <ChartMockup color="success-interactive" />
      </SummaryStats.Item>
    </SummaryStats>
  ),
};

export const SixStats: Story = {
  render: (args) => (
    <SummaryStats {...args}>
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
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
      <SummaryStats.Item
        value="$8,200.00"
        trend="down"
        trendText="12%"
        description="Total Sales"
        infoTooltip="Decreased compared to last month"
      />
      <SummaryStats.Item
        value="98"
        trend="down"
        trendText="25%"
        description="Orders"
        infoTooltip="Fewer orders this period"
      />
      <SummaryStats.Item
        value="45"
        trend="down"
        trendText="5%"
        description="Customers"
        infoTooltip="Slight decrease in customers"
      />
      <SummaryStats.Item
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
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
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
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
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
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
      <SummaryStats.Item
        value="$0.00"
        trend="up"
        trendText="0%"
        description="Description"
        infoTooltip="Metric explanation"
      />
    </SummaryStats>
  ),
};
