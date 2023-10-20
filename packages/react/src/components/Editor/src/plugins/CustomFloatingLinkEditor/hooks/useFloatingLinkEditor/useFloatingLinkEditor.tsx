import { useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import { $isAutoLinkNode, $isLinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { getSelectedNode } from "../../../../hooks";

export const useFloatingLinkEditor = () => {
  const [editor] = useLexicalComposerContext();
  const [isLink, setIsLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const handlePopover = () => setShowPopover((prevState) => !prevState);

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const linkParent = $findMatchingParent(node, $isLinkNode);
      const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode);

      // We don't want this menu to open for auto links.
      if (linkParent !== null && autoLinkParent === null) {
        setIsLink(true);
        setLinkUrl(linkParent.__url);
      } else {
        setIsLink(false);
      }
    }
  };

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateToolbar();
          });
        }),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateToolbar();
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        ),
        editor.registerCommand(
          CLICK_COMMAND,
          (payload) => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const node = getSelectedNode(selection);
              const linkNode = $findMatchingParent(node, $isLinkNode);
              if (
                $isLinkNode(linkNode) &&
                (payload.metaKey || payload.ctrlKey)
              ) {
                setIsLink(false);
                window.open(linkNode.getURL(), "_blank");
                return true;
              }
              if ($isLinkNode(linkNode)) {
                setShowPopover(true);
              }
            }
            return false;
          },
          COMMAND_PRIORITY_LOW
        )
      ),
    [editor]
  );

  return { isLink, linkUrl, showPopover, handlePopover };
};
