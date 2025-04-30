import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, Card, Text } from "@nimbus-ds/components";
import { DragDotsIcon } from "@nimbus-ds/icons";
import { Sortable } from "./Sortable";

const meta: Meta<typeof Sortable> = {
  title: "Patterns/Sortable",
  component: Sortable,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Sortable>;

const initialItems = [
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
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          padding="2"
          overflow="hidden"
        >
          {items.map((item) => (
            <Sortable.Item key={item.id} id={item.id}>
              <Box as="div" width="100%" marginY="2" cursor="grab">
                <Card>
                  <Card.Body>
                    <Text>{item.content}</Text>
                  </Card.Body>
                </Card>
              </Box>
            </Sortable.Item>
          ))}
        </Box>
      </Sortable>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);

    return (
      <Sortable items={items} onReorder={setItems} orientation="horizontal">
        <Box display="flex" gap="4" overflow="hidden" padding="2">
          {items.map((item) => (
            <Sortable.Item key={item.id} id={item.id}>
              <Box as="div" cursor="grab">
                <Card>
                  <Card.Body>
                    <Text>{item.content}</Text>
                  </Card.Body>
                </Card>
              </Box>
            </Sortable.Item>
          ))}
        </Box>
      </Sortable>
    );
  },
};

export const WithHandle: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);

    return (
      <Sortable items={items} onReorder={setItems}>
        <Box
          display="flex"
          flexDirection="column"
          gap="2"
          overflow="hidden"
          padding="2"
        >
          {items.map((item) => (
            <Sortable.Item key={item.id} id={item.id} handle>
              <Card>
                <Card.Body>
                  <Box display="flex" alignItems="center" gap="2">
                    <Sortable.ItemHandle>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
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
        </Box>
      </Sortable>
    );
  },
};

export const CustomRenderItem: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);

    return (
      <Sortable items={items} onReorder={setItems}>
        <Box
          display="flex"
          flexDirection="column"
          gap="2"
          overflow="hidden"
          padding="2"
        >
          {items.map((item) => (
            <Sortable.Item
              key={item.id}
              id={item.id}
              renderItem={({
                isDragging,
                attributes,
                listeners,
                setNodeRef,
                style,
              }) => (
                // We need to use a native div because Nimbus components don't support 'style' prop
                <div
                  ref={setNodeRef}
                  style={style}
                  {...attributes}
                  {...listeners}
                >
                  <Box cursor="grab">
                    <Card>
                      <Card.Body>
                        <Box display="flex" alignItems="center" gap="2">
                          <Text>{item.content}</Text>
                          <Text
                            color={
                              isDragging
                                ? "danger-interactive"
                                : "neutral-interactive"
                            }
                          >
                            Drag me!
                          </Text>
                        </Box>
                      </Card.Body>
                    </Card>
                  </Box>
                </div>
              )}
            />
          ))}
        </Box>
      </Sortable>
    );
  },
};

export const VerticalScroll: Story = {
  render: () => {
    const [items, setItems] = useState([
      ...initialItems,
      { id: "6", content: "Item 6" },
      { id: "7", content: "Item 7" },
      { id: "8", content: "Item 8" },
      { id: "9", content: "Item 9" },
      { id: "10", content: "Item 10" },
    ]);
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
      <Box width="400px">
        <Sortable
          items={items}
          onReorder={setItems}
          orientation="vertical"
          onDragStart={(event) => setActiveId(event.active.id as string)}
          onDragEnd={() => setActiveId(null)}
          renderOverlay={(item) => (
            <Box width="400px">
              <Card>
                <Card.Body>
                  <Text>{item.content}</Text>
                </Card.Body>
              </Card>
            </Box>
          )}
        >
          <Box
            display="flex"
            flexDirection="column"
            height="300px"
            overflow="auto"
            padding="4"
          >
            {items.map((item) => (
              <Sortable.Item key={item.id} id={item.id}>
                {item.id === activeId ? (
                  <Box
                    borderTopWidth="1"
                    borderBottomWidth="none"
                    borderColor="primary-interactive"
                    borderStyle="solid"
                    marginY="2"
                  />
                ) : (
                  <Box marginY="2" cursor="grab">
                    <Card>
                      <Card.Body>
                        <Text>{item.content}</Text>
                      </Card.Body>
                    </Card>
                  </Box>
                )}
              </Sortable.Item>
            ))}
          </Box>
        </Sortable>
      </Box>
    );
  },
};
