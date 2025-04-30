import { ReactNode } from "react";

/**
 * Properties specific to the ProductDataListItem component
 */
export interface ProductDataListItemProperties {
  /**
   * The id of the product
   */
  id: string;
  /**
   * The title of the product
   */
  title: string;
  /**
   * The image URL of the product
   */
  imageUrl?: string;
  /**
   * Alternative text for the product image
   */
  imageAlt?: string;
  /**
   * Whether the item is draggable
   */
  isDraggable?: boolean;
  /**
   * Callback fired when remove button is clicked
   */
  onRemove?: () => void;
  /**
   * Whether the item has a divider
   */
  withDivider?: boolean;
  /**
   * Additional content to be rendered
   */
  children?: ReactNode;
}

/**
 * Props that can be passed to the ProductDataListItem component
 */
export type ProductDataListItemProps = ProductDataListItemProperties;
