import { link, text, list, title } from "@nimbus-ds/styles";
import { EditorThemeClasses } from "lexical";

const joinClassNames = (classNames: string[]) => classNames.join(" ");

export const theme = {
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
      listitem: "nimbus-editor__nestedListItem",
    },
    ul: list.classnames.container,
    ol: list.classnames.container,
  },
  text: {
    italic: "nimbus-editor__textItalic",
    bold: joinClassNames([
      text.sprinkle({
        fontWeight: "bold" as "$bold",
      })?.className ?? "",
    ]),
  },
} satisfies EditorThemeClasses;
