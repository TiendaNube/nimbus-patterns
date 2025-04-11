import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, Card, Text } from "@nimbus-ds/components";
import { DragDotsIcon } from "@nimbus-ds/icons";
import { Sortable } from "./Sortable";

interface Item {
  id: string;
  content: string;
}

const meta: Meta<typeof Sortable> = {
  title: "Components/Sortable",
  component: Sortable,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Sortable>;

const initialItems: Item[] = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
  { id: "4", content: "Item 4" },
  { id: "5", content: "Item 5" },
];

export const Vertical: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);

    return (
      <Sortable items={items} onReorder={setItems} orientation="vertical">
        {items.map((item) => (
          <Sortable.Item key={item.id} id={item.id} item={item}>
            <Box
              as="div"
              width="100%"
              marginY="2"
              cursor="grab"
              style={{ touchAction: "none" }}
            >
              <Card>
                <Card.Body>
                  <Text>{item.content}</Text>
                </Card.Body>
              </Card>
            </Box>
          </Sortable.Item>
        ))}
      </Sortable>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);

    return (
      <Sortable
        items={items}
        onReorder={setItems}
        orientation="horizontal"
        as="div"
        containerProps={{
          style: {
            display: "flex",
            gap: "1rem",
          },
        }}
      >
        {items.map((item) => (
          <Sortable.Item key={item.id} id={item.id} item={item}>
            <Box as="div" cursor="grab" style={{ touchAction: "none" }}>
              <Card>
                <Card.Body>
                  <Text>{item.content}</Text>
                </Card.Body>
              </Card>
            </Box>
          </Sortable.Item>
        ))}
      </Sortable>
    );
  },
};

export const WithHandle: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);

    return (
      <Sortable items={items} onReorder={setItems}>
        {items.map((item) => (
          <Sortable.Item key={item.id} id={item.id} item={item} handle>
            <Card>
              <Card.Body>
                <Box display="flex" alignItems="center" gap="2">
                  <Sortable.ItemHandle>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="grab"
                    >
                      <DragDotsIcon size="small" />
                    </Box>
                  </Sortable.ItemHandle>
                  <Text>{item.content}</Text>
                </Box>
              </Card.Body>
            </Card>
          </Sortable.Item>
        ))}
      </Sortable>
    );
  },
};

export const WithHandleRight: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);

    return (
      <Sortable items={items} onReorder={setItems}>
        {items.map((item) => (
          <Sortable.Item key={item.id} id={item.id} item={item} handle>
            <Card>
              <Card.Body>
                <Box display="flex" alignItems="center" gap="2">
                  <Text>{item.content}</Text>
                  <Sortable.ItemHandle>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="grab"
                    >
                      <DragDotsIcon size="small" />
                    </Box>
                  </Sortable.ItemHandle>
                </Box>
              </Card.Body>
            </Card>
          </Sortable.Item>
        ))}
      </Sortable>
    );
  },
};
