import { ReactNode, HTMLAttributes } from "react";

export interface InteractiveListStructureProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Title of the list item element. Also used to generate the ID for the interactive element */
  title: string;
  /** Determines if the title is visible or not */
  showTitle?: boolean;
  /** Description of the list item element */
  description?: string;
  /** Custom content for the list item element */
  children?: ReactNode;
}
