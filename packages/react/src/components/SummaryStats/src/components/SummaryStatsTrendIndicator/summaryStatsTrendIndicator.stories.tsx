import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@nimbus-ds/components";

import { SummaryStatsTrendIndicator } from "./SummaryStatsTrendIndicator";

const meta: Meta<typeof SummaryStatsTrendIndicator> = {
  title: "Patterns/SummaryStats/SummaryStatsTrendIndicator",
  component: SummaryStatsTrendIndicator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SummaryStatsTrendIndicator>;

export const TrendUp: Story = {
  args: {
    trend: "up",
    text: "8%",
  },
};

export const TrendDown: Story = {
  args: {
    trend: "down",
    text: "8%",
  },
};

export const TrendNeutral: Story = {
  args: {
    trend: "neutral",
    text: "0%",
  },
};

export const AllTrends: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="2">
      <Box display="flex" alignItems="center" gap="2">
        <SummaryStatsTrendIndicator trend="up" text="8%" />
        <Text>Trend Up</Text>
      </Box>
      <Box display="flex" alignItems="center" gap="2">
        <SummaryStatsTrendIndicator trend="down" text="8%" />
        <Text>Trend Down</Text>
      </Box>
      <Box display="flex" alignItems="center" gap="2">
        <SummaryStatsTrendIndicator trend="neutral" text="0%" />
        <Text>Trend Neutral</Text>
      </Box>
    </Box>
  ),
};

export const WithoutText: Story = {
  render: () => (
    <Box display="flex" gap="4">
      <SummaryStatsTrendIndicator trend="up" />
      <SummaryStatsTrendIndicator trend="down" />
      <SummaryStatsTrendIndicator trend="neutral" />
    </Box>
  ),
};
