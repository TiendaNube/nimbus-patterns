import { ReactNode, HTMLAttributes } from "react";

export interface InteractiveListStructureProperties {
  /**
   * Title of the list item element. Also used to generate the ID for the interactive element.
   */
  title: string;
  /**
   * Determines if the title is visible or not.
   */
  showTitle?: boolean;
  /**
   * Description of the list item element.
   */
  description?: string;
  /**
   * Custom content for the list item element.
   */
  children?: ReactNode;
}

export type InteractiveListStructureProps = InteractiveListStructureProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
