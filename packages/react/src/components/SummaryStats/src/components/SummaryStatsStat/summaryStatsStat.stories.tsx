import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

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
  args: {
    value: "$12,450.00",
    description: "Total Sales",
    trend: "up",
    trendText: "15%",
    infoTooltip:
      "Total revenue from all completed orders in the selected period",
  },
};
