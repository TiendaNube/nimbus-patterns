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
      name: "Value",
      control: "text",
      description:
        "The main numeric or formatted value shown in the stat (e.g. currency, count).",
      table: { category: "Data" },
    },
    description: {
      name: "Label",
      control: "text",
      description:
        "Brief label identifying the metric (e.g. Total Sales, Orders).",
      table: { category: "Data" },
    },
    trend: {
      name: "Trend",
      control: "select",
      options: ["up", "down", "neutral"],
      description:
        "Direction of the trend indicator. Use with trendText to show change: up (positive), down (negative), or neutral. Controls icon and color in the UI.",
      table: { category: "Appearance" },
    },
    trendText: {
      name: "Trend text",
      control: "text",
      description:
        'Text shown next to the trend icon (e.g. "15%", "-8%", "0%"). Displayed when trend is set.',
      table: { category: "Data" },
    },
    infoTooltip: {
      name: "Info tooltip",
      control: "text",
      description:
        "If set, shows an info icon; hovering displays this tooltip content.",
      table: { category: "Appearance" },
    },
    children: {
      name: "Expandable content",
      control: { disable: true },
      description:
        "Optional content rendered when the stat is expanded (requires SummaryStats expandable mode).",
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
  args: {
    value: "156",
    description: "Orders",
    trend: "down",
    trendText: "8%",
    infoTooltip:
      "Total orders in the selected period. Click to expand for details.",
    children: (
      <Box padding="2" backgroundColor="neutral-surface">
        <Text fontSize="caption" color="neutral-textLow">
          Expandable content: chart or details for this stat.
        </Text>
      </Box>
    ),
  },
  decorators: [
    (StoryFn) => (
      <SummaryStats layout="horizontal" expandable>
        <StoryFn />
      </SummaryStats>
    ),
  ],
};
