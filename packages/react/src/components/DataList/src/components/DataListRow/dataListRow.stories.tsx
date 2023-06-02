import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Icon, Link, Text, Tag } from "@nimbus-ds/components";
import {
  ChevronDownIcon,
  CreditCardIcon,
  BoxUnpackedIcon,
} from "@nimbus-ds/icons";

import { DataList } from "../../DataList";
import { generateOrders, formatDate } from "../../dataList.utils";

const meta: Meta<typeof DataList.Row> = {
  title: "Patterns/DataList/DataList.Row",
  component: DataList.Row,
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
  render: (args) => (
    <DataList>
      {generateOrders(30).map((row) => (
        <DataList.Row {...args} key={row.id} gap="1">
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="medium" color="primary-interactive">
              #{row.id}
            </Text>
            <Text>{formatDate(row.date)}</Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text>{row.clientName}</Text>
            <Text>{row.total}</Text>
          </Box>
          <Link textDecoration="none">
            {row.qty} products
            <Icon color="currentColor" source={<ChevronDownIcon />} />
          </Link>
          <Box display="flex" flexWrap="wrap" gap="2" pt="2">
            <Tag appearance="warning">
              <Icon color="currentColor" source={<CreditCardIcon />} />
              Awaiting payment
            </Tag>
            <Tag appearance="primary">
              <Icon color="currentColor" source={<BoxUnpackedIcon />} />
              Unfulfilled
            </Tag>
          </Box>
        </DataList.Row>
      ))}
    </DataList>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataList.Row>;

export const base: Story = {
  args: {},
};
