# @nimbus-ds/sortable

A compound component for creating sortable lists with drag and drop functionality.

## Installation

```bash
yarn add @nimbus-ds/sortable
```

## Dependencies

This component uses [@dnd-kit](https://dndkit.com/) for drag and drop functionality. Make sure you have the following dependencies installed:

```json
{
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^7.0.2",
  "@dnd-kit/utilities": "^3.2.2"
}
```

## Usage

```tsx
import { Sortable } from '@nimbus-ds/sortable';

interface Item {
  id: string;
  content: string;
}

const items: Item[] = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' },
];

function MyComponent() {
  const [sortedItems, setSortedItems] = useState(items);

  return (
    <Sortable items={sortedItems} onReorder={setSortedItems}>
      <div className="my-sortable-container">
        {sortedItems.map((item) => (
          <Sortable.Item key={item.id} id={item.id}>
            {item.content}
          </Sortable.Item>
        ))}
      </div>
    </Sortable>
  );
}
```

## Props

### Sortable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `T[]` | - | The items to be sorted |
| onReorder | `(items: T[]) => void` | - | Callback fired when items are reordered |
| orientation | `'vertical' \| 'horizontal'` | `'vertical'` | The orientation of the sortable list |
| sensorOptions | `PointerSensorOptions` | - | Custom sensor options for drag detection |
| onDragStart | `(event: DragStartEvent) => void` | - | Callback fired when drag starts |
| onDragOver | `(event: DragOverEvent) => void` | - | Callback fired during drag |
| onDragEnd | `(event: DragEndEvent) => void` | - | Callback fired when drag ends |
| disabled | `boolean` | `false` | Whether to disable sorting functionality |
| children | `ReactNode` | - | The children components |
| overlaySettings | `DragOverlayProps` | `DEFAULT_OVERLAY_SETTINGS` | Configuration for the drag overlay appearance and behavior |
| renderOverlay | `(item: T) => ReactNode` | - | Render function for the dragged item overlay |

### Sortable.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | `UniqueIdentifier` | - | The unique identifier for the item |
| disabled | `boolean` | `false` | Whether the item is disabled from being dragged |
| handle | `boolean` | `false` | Whether to use a drag handle |
| children | `ReactNode` | - | The children components |
| renderItem | `(props: { isDragging: boolean, attributes: any, listeners: any, setNodeRef: any, style: any }) => ReactNode` | - | Custom render function for the item |

### Sortable.ItemHandle

A handle component that can be used to drag a sortable item when the `handle` prop is set to `true` on the `Sortable.Item`.

## Accessibility

The component follows WCAG 2.1 guidelines and implements proper ARIA attributes:

- Uses proper drag and drop ARIA attributes
- Supports keyboard navigation through the KeyboardSensor
- Maintains focus management during drag operations
- Works with screen readers

## Examples

### Basic Usage

```tsx
<Sortable items={items} onReorder={setItems}>
  <div className="my-sortable-container">
    {items.map((item) => (
      <Sortable.Item key={item.id} id={item.id}>
        {item.content}
      </Sortable.Item>
    ))}
  </div>
</Sortable>
```

### With Drag Handle

```tsx
<Sortable items={items} onReorder={setItems}>
  <div className="my-sortable-container">
    {items.map((item) => (
      <Sortable.Item key={item.id} id={item.id} handle>
        <div>
          <Sortable.ItemHandle>
            <DragIcon />
          </Sortable.ItemHandle>
          {item.content}
        </div>
      </Sortable.Item>
    ))}
  </div>
</Sortable>
```

### Custom Drag Overlay

```tsx
<Sortable
  items={items}
  onReorder={setItems}
  overlaySettings={{
    dropAnimation: {
      duration: 200,
      easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
    }
  }}
  renderOverlay={(item) => (
    <div className="custom-overlay">{item.content}</div>
  )}
>
  <div className="my-sortable-container">
    {items.map((item) => (
      <Sortable.Item key={item.id} id={item.id}>
        {item.content}
      </Sortable.Item>
    ))}
  </div>
</Sortable>
```

### Custom Sensor Options

```tsx
<Sortable
  items={items}
  onReorder={setItems}
  sensorOptions={{
    activationConstraint: {
      distance: 20, // Allow movements up to 20px
      delay: 150,  // Wait 150ms before canceling
      tolerance: 5 // Tolerate 5px of movement
    }
  }}
>
  {/* ... */}
</Sortable>
```

## Performance

The component is optimized for performance:
- Uses `useMemo` for memoization of styles and context values
- Efficiently handles drag and drop operations
- Minimal re-renders through proper state management
- Uses `@dnd-kit` for optimized drag and drop functionality 