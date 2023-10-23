import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { $getSelection, $isRangeSelection, RangeSelection } from "lexical";
import { $isLinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getNearestNodeOfType } from "@lexical/utils";

import { GAP, getSelectedNode, reducer } from "./useToolbar.definitions";
import { EditorActionKind, initialEditorContext } from "../../contexts";

export const useToolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [state, dispatch] = useReducer(reducer, initialEditorContext.state);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calcButtonWidths = useCallback(
    (buttonRefs: React.MutableRefObject<HTMLDivElement[]>) => {
      const buttonWidths = buttonRefs.current.map(
        (ref: HTMLDivElement) => ref?.getBoundingClientRect().width
      );
      return buttonWidths;
    },
    []
  );

  const calcVisibleButtons = useCallback(
    (buttonWidths: number[], availableWidth: number) => {
      const visibleButtons = buttonWidths.reduce(
        (prev, curr) => {
          if (prev.totalWidthButtons + curr <= availableWidth) {
            prev.maxVisibleButtons += 1; // eslint-disable-line no-param-reassign
            prev.totalWidthButtons += Math.ceil(curr + GAP); // eslint-disable-line no-param-reassign
          }
          return prev;
        },
        { totalWidthButtons: 0, maxVisibleButtons: 0 }
      );
      return visibleButtons.maxVisibleButtons;
    },
    []
  );

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      dispatch({
        type: EditorActionKind.IS_BOLD,
        payload: (selection as RangeSelection)?.hasFormat?.("bold"),
      });

      dispatch({
        type: EditorActionKind.IS_ITALIC,
        payload: (selection as RangeSelection)?.hasFormat?.("italic"),
      });

      const node = getSelectedNode(selection);
      const parent = node.getParent();

      dispatch({
        type: EditorActionKind.IS_LINK,
        payload: !!($isLinkNode(parent) || $isLinkNode(node)) ?? false,
      });

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          dispatch({
            type: EditorActionKind.BLOCK_TYPE,
            payload: type,
          });
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();

          dispatch({
            type: EditorActionKind.BLOCK_TYPE,
            payload: type,
          });
        }
      }
    }
  }, [editor]);

  const context = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return {
    windowWidth,
    calcButtonWidths,
    calcVisibleButtons,
    updateToolbar,
    context,
  };
};
