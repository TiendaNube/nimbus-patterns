import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Text } from "@nimbus-ds/components";

import { SummaryStats } from "../../SummaryStats";
import { SummaryStatsContent } from "./SummaryStatsContent";

const meta: Meta<typeof SummaryStatsContent> = {
  title: "Patterns/SummaryStats/Content",
  component: SummaryStatsContent,
  decorators: [
    (Story) => (
      <SummaryStats expandable defaultSelectedId="stat-1">
        <SummaryStats.Stat
          id="stat-1"
          value="$12,450.00"
          description="Total Sales"
          trend="up"
          trendText="15%"
        />
        <SummaryStats.Stat
          id="stat-2"
          value="156"
          description="Orders"
          trend="down"
          trendText="8%"
        />
        <Story />
      </SummaryStats>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SummaryStatsContent>;

export const Basic: Story = {
  render: () => (
    <SummaryStatsContent>
      <Box padding="4">
        <Text>
          This is the expandable content area. It can contain charts, tables, or
          any additional information related to the selected stat.
        </Text>
      </Box>
    </SummaryStatsContent>
  ),
};

export const WithChart: Story = {
  render: () => (
    <SummaryStatsContent>
      <Box
        padding="4"
        display="flex"
        flexDirection="column"
        gap="2"
        alignItems="center"
        justifyContent="center"
        minHeight="200px"
      >
        <Text fontWeight="bold">Sales Chart</Text>
        <Text color="neutral-textLow">
          Replace this with your actual chart component
        </Text>
      </Box>
    </SummaryStatsContent>
  ),
};
