import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Icon, Link, Text, Tag } from "@nimbus-ds/components";
import {
  ChevronDownIcon,
  CreditCardIcon,
  BoxUnpackedIcon,
} from "@nimbus-ds/icons";

import { DataList } from "./DataList";
import { generateOrders, formatDate } from "./dataList.utils";

const meta: Meta<typeof DataList> = {
  title: "Patterns/DataList",
  component: DataList,
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
  render: (args) => (
    <DataList {...args}>
      {generateOrders(30).map((row) => (
        <DataList.Row key={row.id} gap="1">
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
type Story = StoryObj<typeof DataList>;

// const Template: ComponentStory<typeof DataList.Row> = (args) => {
//   return (
//     <DataList>

//     </DataList>
//   );
// };

// const NoDividersTemplate: ComponentStory<typeof DataList.Row> = (args) => {
//   const [rows] = useState<RowProps[]>(generateOrders(30));

//   return (
//     <DataList bottomDivider={false}>
//       {rows.map((row) => (
//         <DataList.Row {...args} key={row.id} gap="1">
//           <Box display="flex" justifyContent="space-between">
//             <Text fontWeight="medium" color="primary-interactive">
//               #{row.id}
//             </Text>
//             <Text>{formatDate(row.date)}</Text>
//           </Box>
//           <Box display="flex" justifyContent="space-between">
//             <Text>{row.clientName}</Text>
//             <Text>{row.total}</Text>
//           </Box>
//           <Link textDecoration="none">
//             {row.qty} products
//             <Icon color="currentColor" source={<ChevronDownIcon />} />
//           </Link>
//           <Box display="flex" flexWrap="wrap" gap="2" pt="2">
//             <Tag appearance="warning">
//               <Icon color="currentColor" source={<CreditCardIcon />} />
//               Awaiting payment
//             </Tag>
//             <Tag appearance="primary">
//               <Icon color="currentColor" source={<BoxUnpackedIcon />} />
//               Unfulfilled
//             </Tag>
//           </Box>
//         </DataList.Row>
//       ))}
//     </DataList>
//   );
// };

export const basic: Story = {
  args: {},
};

export const noDividers: Story = {
  args: {
    bottomDivider: false,
  },
};
