import { HTMLAttributes } from "react";

export interface EmptyAppContentTextElementProperties {
  title: string;
  content: string;
  bottomDivider?: boolean;
}

export type EmptyAppContentTextElementProps =
  EmptyAppContentTextElementProperties &
    Omit<HTMLAttributes<HTMLElement>, "color">;
