import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@nimbus-ds/components";

import { SummaryStatsCarousel } from "./SummaryStatsCarousel";
import { SummaryStatsStat } from "../SummaryStatsStat";

const meta: Meta<typeof SummaryStatsCarousel> = {
  title: "Patterns/SummaryStats/SummaryStatsCarousel",
  component: SummaryStatsCarousel,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <Box maxWidth="375px" margin="auto">
        <Story />
      </Box>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SummaryStatsCarousel>;

export const ThreeItems: Story = {
  render: () => (
    <Box
      borderStyle="solid"
      borderWidth="1"
      borderColor="neutral-surfaceHighlight"
      borderRadius="2"
      overflow="hidden"
    >
      <SummaryStatsCarousel>
        <SummaryStatsStat
          value="$12,450.00"
          trend="up"
          trendText="15%"
          description="Total Sales"
        />
        <SummaryStatsStat
          value="156"
          trend="down"
          trendText="8%"
          description="Orders"
        />
        <SummaryStatsStat
          value="89"
          trend="neutral"
          trendText="0%"
          description="Customers"
        />
      </SummaryStatsCarousel>
    </Box>
  ),
};

export const FourItems: Story = {
  render: () => (
    <Box
      borderStyle="solid"
      borderWidth="1"
      borderColor="neutral-surfaceHighlight"
      borderRadius="2"
      overflow="hidden"
    >
      <SummaryStatsCarousel>
        <SummaryStatsStat
          value="$12,450.00"
          trend="up"
          trendText="15%"
          description="Total Sales"
        />
        <SummaryStatsStat
          value="156"
          trend="down"
          trendText="8%"
          description="Orders"
        />
        <SummaryStatsStat
          value="89"
          trend="neutral"
          trendText="0%"
          description="Customers"
        />
        <SummaryStatsStat
          value="3.2%"
          trend="up"
          trendText="0.5%"
          description="Conversion Rate"
        />
      </SummaryStatsCarousel>
    </Box>
  ),
};

export const SixItems: Story = {
  render: () => (
    <Box
      borderStyle="solid"
      borderWidth="1"
      borderColor="neutral-surfaceHighlight"
      borderRadius="2"
      overflow="hidden"
    >
      <SummaryStatsCarousel>
        <SummaryStatsStat
          value="$0.00"
          trend="up"
          trendText="0%"
          description="Description"
          infoTooltip="Metric explanation"
        />
        <SummaryStatsStat
          value="$0.00"
          trend="up"
          trendText="0%"
          description="Description"
          infoTooltip="Metric explanation"
        />
        <SummaryStatsStat
          value="$0.00"
          trend="up"
          trendText="0%"
          description="Description"
          infoTooltip="Metric explanation"
        />
        <SummaryStatsStat
          value="$0.00"
          trend="up"
          trendText="0%"
          description="Description"
          infoTooltip="Metric explanation"
        />
        <SummaryStatsStat
          value="$0.00"
          trend="up"
          trendText="0%"
          description="Description"
          infoTooltip="Metric explanation"
        />
        <SummaryStatsStat
          value="$0.00"
          trend="up"
          trendText="0%"
          description="Description"
          infoTooltip="Metric explanation"
        />
      </SummaryStatsCarousel>
    </Box>
  ),
};

export const WithExpandableContent: Story = {
  render: () => (
    <Box
      borderStyle="solid"
      borderWidth="1"
      borderColor="neutral-surfaceHighlight"
      borderRadius="2"
      overflow="hidden"
    >
      <SummaryStatsCarousel>
        <SummaryStatsStat
          id="sales"
          value="$12,450.00"
          trend="up"
          trendText="15%"
          description="Total Sales"
          infoTooltip="Total revenue"
        />
        <SummaryStatsStat
          id="orders"
          value="156"
          trend="down"
          trendText="8%"
          description="Orders"
          infoTooltip="Number of orders"
        />
        <SummaryStatsStat
          id="customers"
          value="89"
          trend="neutral"
          trendText="0%"
          description="Customers"
          infoTooltip="Unique customers"
        />
      </SummaryStatsCarousel>
      <Box
        padding="4"
        margin="4"
        borderStyle="dashed"
        borderWidth="1"
        borderColor="neutral-surfaceHighlight"
        borderRadius="2"
      >
        <Text>Replace me with your content</Text>
      </Box>
    </Box>
  ),
};
