# Product Data List

A flexible and reusable component for displaying product data in a list format, with optional sorting capabilities.

## Installation

```sh
yarn add @nimbus-ds/product-data-list
```

## Usage

### Basic Product List

```jsx
import { ProductDataList } from '@nimbus-ds/product-data-list';

function App() {
  return (
    <ProductDataList 
      title="Featured Products"
      description="Our top selling items"
    >
      <div>Product Item 1</div>
      <div>Product Item 2</div>
      <div>Product Item 3</div>
    </ProductDataList>
  );
}
```

### Sortable Product List

```jsx
import { ProductDataListSortable } from '@nimbus-ds/product-data-list';

function App() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const handleReorder = (newItems) => {
    setItems(newItems);
  };

  return (
    <ProductDataListSortable 
      title="Manage Products"
      description="Drag to reorder products"
      items={items}
      onReorder={handleReorder}
    >
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </ProductDataListSortable>
  );
}
```

## Props

### ProductDataList

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Content to be rendered inside the list |
| title | string | Optional title for the list section |
| description | string | Optional description for the list section |

### ProductDataListSortable

Extends all props from ProductDataList and Sortable component, except for 'children'.

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Content to be rendered inside the sortable list |
| items | T[] | Array of items to be sorted |
| onReorder | (items: T[]) => void | Callback function called when items are reordered |
| title | string | Optional title for the list section |
| description | string | Optional description for the list section |

## License

MIT © [Your Organization] 