# Product Data List

A flexible and reusable component for displaying product data in a list format, with optional sorting capabilities.

## Installation

```sh
yarn add @nimbus-ds/product-data-list
```

## Usage

### Basic Product List

```jsx
import { ProductDataList } from "@nimbus-ds/product-data-list";

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
import { ProductDataListSortable } from "@nimbus-ds/product-data-list";

function App() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

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

| Prop        | Type      | Description                               |
| ----------- | --------- | ----------------------------------------- |
| children    | ReactNode | Content to be rendered inside the list    |
| title       | string    | Optional title for the list section       |
| description | string    | Optional description for the list section |

### ProductDataListItem

| Prop        | Type          | Description                                           |
| ----------- | ------------- | ----------------------------------------------------- |
| id          | string        | The id of the product                                 |
| title       | string        | The title of the product                              |
| imageUrl    | string        | Optional image URL of the product                     |
| imageAlt    | string        | Optional alternative text for the product image       |
| isDraggable | boolean       | Whether the item is draggable                         |
| onRemove    | () => void    | Optional callback fired when remove button is clicked |
| withDivider | boolean       | Whether the item has a divider                        |
| children    | ReactNode     | Optional additional content to be rendered            |
| tagIcon     | ComponentType | Optional icon component for the tag                   |
| tagText     | string        | Optional text content for the tag                     |

**Note:** The tag will only be displayed when both `tagIcon` and `tagText` are provided. The tag appears below the product title and can be used alongside `children` if needed.

### ProductDataListSortable

Extends all props from ProductDataList and Sortable component, except for 'children'.

| Prop        | Type                 | Description                                       |
| ----------- | -------------------- | ------------------------------------------------- |
| children    | ReactNode            | Content to be rendered inside the sortable list   |
| items       | T[]                  | Array of items to be sorted                       |
| onReorder   | (items: T[]) => void | Callback function called when items are reordered |
| title       | string               | Optional title for the list section               |
| description | string               | Optional description for the list section         |

## Examples

### Product List Item with Tag

```jsx
import { ProductDataList } from "@nimbus-ds/product-data-list";
import { RedoIcon } from "@nimbus-ds/icons";

function App() {
  return (
    <ProductDataList title="Products">
      <ProductDataList.Section>
        <ProductDataList.Products
          items={products}
          renderItem={(product) => (
            <ProductDataList.Item
              id={product.id}
              title={product.title}
              imageUrl={product.imageUrl}
              tagIcon={RedoIcon}
              tagText="In subscription"
            />
          )}
        />
      </ProductDataList.Section>
    </ProductDataList>
  );
}
```

### Product List Item with Tag and Children

```jsx
import { ProductDataList, Text } from "@nimbus-ds/product-data-list";
import { RedoIcon } from "@nimbus-ds/icons";

function App() {
  return (
    <ProductDataList.Item
      id="1"
      title="Product Name"
      tagIcon={RedoIcon}
      tagText="In subscription"
    >
      <Text color="neutral-textLow">Additional product information</Text>
    </ProductDataList.Item>
  );
}
```

## License

MIT © [Your Organization]
