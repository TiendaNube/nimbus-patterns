import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Box, Icon, Link, Text, Tag } from "@nimbus-ds/components";
import {
  ChevronDownIcon,
  CreditCardIcon,
  BoxUnpackedIcon,
} from "@nimbus-ds/icons";

import { DataList } from "./DataList";

import { RowProps, generateOrders, formatDate } from "./dataList.utils";

export default {
  title: "Patterns/DataList",
  component: DataList.Row,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "DataList.Row": DataList.Row,
  },
  argTypes: {
    children: { control: { disable: true } },
  },
} as ComponentMeta<typeof DataList.Row>;

const Template: ComponentStory<typeof DataList.Row> = (args) => {
  const [rows] = useState<RowProps[]>(generateOrders(30));

  return (
    <DataList>
      {rows.map((row) => (
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
  );
};

const NoDividersTemplate: ComponentStory<typeof DataList.Row> = (args) => {
  const [rows] = useState<RowProps[]>(generateOrders(30));

  return (
    <DataList bottomDivider={false}>
      {rows.map((row) => (
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
  );
}

export const base = Template.bind({});
base.args = {};

export const noDividers = NoDividersTemplate.bind({});
noDividers.args = {
  topDivider: false
};
