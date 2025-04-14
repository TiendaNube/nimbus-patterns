import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, Card, Text, Checkbox, List } from "@nimbus-ds/components";
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
        <Box display="flex" flexDirection="column" width="100%">
          {items.map((item) => (
            <Sortable.Item key={item.id} id={item.id}>
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
        <Box display="flex" gap="4">
          {items.map((item) => (
            <Sortable.Item key={item.id} id={item.id}>
              <Box as="div" cursor="grab" style={{ touchAction: "none" }}>
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
        <Box display="flex" flexDirection="column" gap="2">
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
        </Box>
      </Sortable>
    );
  },
};

export const WithHandleRight: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);

    return (
      <Sortable items={items} onReorder={setItems}>
        <Box display="flex" flexDirection="column" gap="2">
          {items.map((item) => (
            <Sortable.Item key={item.id} id={item.id} handle>
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
        </Box>
      </Sortable>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);
    const [isDisabled, setIsDisabled] = useState(true);

    return (
      <Box display="flex" flexDirection="column" gap="4" width="400px">
        <Box display="flex" alignItems="center" gap="2">
          <Checkbox
            name="enable-sorting"
            checked={!isDisabled}
            onChange={(e) => setIsDisabled(!e.target.checked)}
          />
          <Text>Enable sorting</Text>
        </Box>
        <Text>
          {isDisabled
            ? "Sorting is disabled. Items cannot be dragged."
            : "Sorting is enabled. Try dragging items to reorder them."}
        </Text>
        <Sortable items={items} onReorder={setItems} disabled={isDisabled}>
          <Box display="flex" flexDirection="column" gap="2">
            {items.map((item) => (
              <Sortable.Item key={item.id} id={item.id}>
                <Box
                  as="div"
                  width="100%"
                  cursor={isDisabled ? "not-allowed" : "grab"}
                  style={{ touchAction: "none" }}
                >
                  <Card>
                    <Card.Body>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text>{item.content}</Text>
                        {isDisabled && (
                          <Text color="neutral-textSupport">
                            (Sorting disabled)
                          </Text>
                        )}
                      </Box>
                    </Card.Body>
                  </Card>
                </Box>
              </Sortable.Item>
            ))}
          </Box>
        </Sortable>
      </Box>
    );
  },
};

export const CustomRenderItem: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);

    return (
      <Sortable items={items} onReorder={setItems}>
        <Box display="flex" flexDirection="column" gap="2">
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
                                : "neutral-textPrimary"
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

export const WithCustomSensors: Story = {
  render: () => {
    const [items, setItems] = useState(initialItems);

    return (
      <Box display="flex" flexDirection="column" gap="4" width="400px">
        <Text>This list has more relaxed drag settings:</Text>
        <List as="ul">
          <List.Item>
            Can start dragging with larger movements (up to 20px)
          </List.Item>
          <List.Item>Waits 150ms before canceling a potential drag</List.Item>
          <List.Item>Tolerates movements up to 5px without canceling</List.Item>
        </List>
        <Text color="neutral-textSupport">
          Try making small movements - notice how the dragging is smoother and
          more forgiving
        </Text>
        <Sortable
          items={items}
          onReorder={setItems}
          sensorOptions={{
            activationConstraint: {
              distance: 20, // Maximum distance allowed before drag activates
              delay: 150, // Time to wait before canceling a potential drag
              tolerance: 5, // Movement tolerance before canceling
            },
          }}
        >
          <Box display="flex" flexDirection="column" gap="2">
            {items.map((item) => (
              <Sortable.Item key={item.id} id={item.id}>
                <Box
                  as="div"
                  width="100%"
                  cursor="grab"
                  style={{ touchAction: "none" }}
                >
                  <Card>
                    <Card.Body>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text>{item.content}</Text>
                        <Text color="neutral-textSupport">
                          (Smoother dragging)
                        </Text>
                      </Box>
                    </Card.Body>
                  </Card>
                </Box>
              </Sortable.Item>
            ))}
          </Box>
        </Sortable>
      </Box>
    );
  },
};
