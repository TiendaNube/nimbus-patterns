import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@nimbus-ds/components";

import { SummaryStats } from "../../SummaryStats";
import { SummaryStatsStat } from "./SummaryStatsStat";

const meta: Meta<typeof SummaryStatsStat> = {
  title: "Patterns/SummaryStats/Stat",
  component: SummaryStatsStat,
  decorators: [
    (Story) => (
      <SummaryStats>
        <Story />
      </SummaryStats>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The main value to display",
      table: { category: "Data" },
    },
    description: {
      control: "text",
      description: "Brief label identifying the metric",
      table: { category: "Data" },
    },
    trend: {
      control: "select",
      options: ["up", "down", "neutral"],
      description: "Trend direction (up, down, or neutral)",
      table: { category: "Appearance" },
    },
    trendText: {
      control: "text",
      description: "Text describing the trend (e.g. percentage)",
      table: { category: "Data" },
    },
    infoTooltip: {
      control: "text",
      description: "Tooltip content for the info icon",
      table: { category: "Appearance" },
    },
    children: {
      control: { disable: true },
      table: { category: "Expandable" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SummaryStatsStat>;

export const Basic: Story = {
  args: {
    value: "$12,450.00",
    description: "Total Sales",
  },
};

export const WithTrendUp: Story = {
  args: {
    value: "$12,450.00",
    description: "Total Sales",
    trend: "up",
    trendText: "15%",
  },
};

export const WithTrendDown: Story = {
  args: {
    value: "156",
    description: "Orders",
    trend: "down",
    trendText: "8%",
  },
};

export const WithTrendNeutral: Story = {
  args: {
    value: "89",
    description: "Customers",
    trend: "neutral",
    trendText: "0%",
  },
};

export const WithInfoTooltip: Story = {
  args: {
    value: "$12,450.00",
    description: "Total Sales",
    trend: "up",
    trendText: "15%",
    infoTooltip:
      "Total revenue from all completed orders in the selected period",
  },
};

export const Complete: Story = {
  render: () => (
    <SummaryStats layout="horizontal" expandable>
      <SummaryStats.Stat
        value="$12,450.00"
        description="Total Sales"
        trend="up"
        trendText="15%"
        infoTooltip="Total revenue from all completed orders in the selected period"
      >
        <Box padding="2" backgroundColor="neutral-surface">
          <Text fontSize="caption" color="neutral-textLow">
            Expandable content: chart or details for this stat.
          </Text>
        </Box>
      </SummaryStats.Stat>
      <SummaryStats.Stat
        value="156"
        description="Orders"
        trend="down"
        trendText="8%"
      />
    </SummaryStats>
  ),
};
