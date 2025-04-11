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
import { Sortable, SortableItem } from '@nimbus-ds/sortable';

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
    <Sortable
      items={sortedItems}
      onReorder={setSortedItems}
      orientation="vertical"
    >
      {sortedItems.map((item) => (
        <SortableItem key={item.id} id={item.id} item={item}>
          <div>{item.content}</div>
        </SortableItem>
      ))}
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
| idKey | `keyof T` | `'id'` | The unique key in your items to be used as identifier |
| orientation | `'vertical' \| 'horizontal'` | `'vertical'` | The orientation of the sortable list |
| sensorOptions | `UseSensorOptions` | - | Custom sensor options for drag detection |
| onDragStart | `(event: DragStartEvent) => void` | - | Callback fired when drag starts |
| onDragOver | `(event: DragOverEvent) => void` | - | Callback fired during drag |
| onDragEnd | `(event: DragEndEvent) => void` | - | Callback fired when drag ends |
| disabled | `boolean` | `false` | Whether to disable sorting functionality |
| as | `keyof JSX.IntrinsicElements \| React.ComponentType` | `'div'` | Container component or element type |
| containerProps | `React.HTMLAttributes<HTMLElement>` | `{}` | Additional props for the container element |

### SortableItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| item | `T` | - | The item data |
| id | `UniqueIdentifier` | - | The unique identifier for the item |
| disabled | `boolean` | `false` | Whether the item is disabled from being dragged |
| handle | `boolean` | `false` | Whether to use a drag handle |
| itemProps | `React.HTMLAttributes<HTMLElement>` | `{}` | Additional props for the item element |
| children | `ReactNode \| ((props: { isDragging: boolean }) => ReactNode)` | - | The children components or render function |

## Accessibility

The component follows WCAG 2.1 guidelines and implements proper ARIA attributes:

- Uses `aria-grabbed` to indicate drag state
- Supports keyboard navigation
- Maintains focus management during drag operations
- Works with screen readers

## Examples

### Vertical List

```tsx
<Sortable items={items} onReorder={setItems} orientation="vertical">
  {items.map((item) => (
    <SortableItem key={item.id} id={item.id} item={item}>
      <div>{item.content}</div>
    </SortableItem>
  ))}
</Sortable>
```

### Horizontal List

```tsx
<Sortable
  items={items}
  onReorder={setItems}
  orientation="horizontal"
  containerProps={{
    style: { display: 'flex', gap: '1rem' }
  }}
>
  {items.map((item) => (
    <SortableItem key={item.id} id={item.id} item={item}>
      <div>{item.content}</div>
    </SortableItem>
  ))}
</Sortable>
```

### With Drag Handle

```tsx
<Sortable items={items} onReorder={setItems}>
  {items.map((item) => (
    <SortableItem key={item.id} id={item.id} item={item} handle>
      <div>
        <span data-handle-selector>⋮⋮</span>
        {item.content}
      </div>
    </SortableItem>
  ))}
</Sortable>
```

## Performance

The component is optimized for performance:
- Uses proper memoization to prevent unnecessary re-renders
- Efficiently handles large lists
- Implements virtualization when needed through the container component
- Minimal bundle size impact through proper tree-shaking 