import { link, text, list, title, editor } from "@nimbus-ds/styles";
import { EditorThemeClasses } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";

import {
  Bold,
  ClearFormatting,
  UnorderedList,
  OrderedList,
  Header,
  History,
  Italic,
  Link,
  Video,
} from "./actions";
import { Module } from "./editor.types";
import { Divider } from "./components";

const joinClassNames = (classNames: string[]) => classNames.join(" ");

export const defaultTheme: EditorThemeClasses = {
  heading: {
    h3: joinClassNames([
      title.classnames.base,
      title.classnames.appearance.h3,
      title.sprinkle({
        fontSize: "6",
        lineHeight: "6",
        color: "primary-textHigh",
      }),
    ]),
    h4: joinClassNames([
      title.classnames.base,
      title.classnames.appearance.h4,
      title.sprinkle({
        fontSize: "5",
        lineHeight: "5",
        color: "primary-textHigh",
      }),
    ]),
  },
  paragraph: joinClassNames([
    text.classnames.base,
    text.sprinkle({ color: "neutral-textLow" as "$neutral-textLow" })
      ?.className ?? "",
  ]),
  link: joinClassNames([
    link.classnames.appearance.primary,
    link.classnames.base,
    link.sprinkle({ textDecoration: "none" }),
  ]),
  list: {
    listitem: list.classnames.container__item,
    nested: {
      listitem: editor.classnames.nested_list__item,
    },
    ul: list.classnames.container,
    ol: list.classnames.container,
  },
  text: {
    italic: editor.classnames.text__italic,
    bold: joinClassNames([
      text.sprinkle({
        fontWeight: "bold" as "$bold",
      })?.className ?? "",
    ]),
  },
};

export const aliasModules = {
  bold: Bold,
  clearFormating: ClearFormatting,
  orderedList: OrderedList,
  unorderedList: UnorderedList,
  header: Header,
  history: History,
  italic: Italic,
  link: Link,
  video: Video,
  divider: Divider,
};

export const defaultModules: Module[] = [
  "history",
  "divider",
  "header",
  "divider",
  "orderedList",
  "unorderedList",
  "divider",
  "bold",
  "italic",
  "link",
  "video",
  "divider",
  "clearFormating",
];

export const helpTextAppearance = {
  danger: "danger-textLow",
  warning: "warning-textLow",
  success: "success-textLow",
  none: "neutral-textLow",
} as {
  [key: string]:
    | "danger-textLow"
    | "warning-textLow"
    | "success-textLow"
    | "neutral-textLow";
};

export const editorAppearance = {
  danger: "danger",
  warning: "warning",
  success: "success",
  none: "neutral",
} as {
  [key: string]: "danger" | "warning" | "success" | "neutral";
};

export const nodes = [HeadingNode, ListNode, ListItemNode, LinkNode];
