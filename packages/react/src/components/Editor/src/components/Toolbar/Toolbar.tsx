import React, { useEffect, useReducer, useState, useCallback } from "react";
// import { $findMatchingParent, $isRootOrShadowRoot } from "lexical/LexicalUtils";
import {
  $getSelection,
  $isRangeSelection,
  RangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
} from "lexical";
import { $isLinkNode } from "@lexical/link";
import { $isHeadingNode } from "@lexical/rich-text";
import { mergeRegister, $getNearestNodeOfType } from "@lexical/utils";
import { $isListNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
  Heading,
  FormatList,
  FormatText,
  History,
  Link,
  ClearFormatting,
} from "../../actions";
import { ToolbarContext, initialContext } from "../../contexts";
import { ToolbarDivider } from "../ToolbarDivider";

import { getSelectedNode, reducer } from "./toolbar.definitions";
import { ToolbarActionKind } from "./toolbar.types";

const Toolbar: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialContext.state);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

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
        type: ToolbarActionKind.IS_BOLD,
        payload: (selection as RangeSelection)?.hasFormat?.("bold"),
      });
      dispatch({
        type: ToolbarActionKind.IS_ITALIC,
        payload: (selection as RangeSelection)?.hasFormat?.("italic"),
      });

      const node = getSelectedNode(selection);
      const parent = node.getParent();

      dispatch({
        type: ToolbarActionKind.IS_LINK,
        payload: !!($isLinkNode(parent) || $isLinkNode(node)) ?? false,
      });

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          dispatch({
            type: ToolbarActionKind.BLOCK_TYPE,
            payload: type,
          });
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();

          dispatch({
            type: ToolbarActionKind.BLOCK_TYPE,
            payload: type,
          });
        }
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          dispatch({
            type: ToolbarActionKind.CAN_UNDO,
            payload,
          });
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          dispatch({
            type: ToolbarActionKind.CAN_REDO,
            payload,
          });
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [updateToolbar, activeEditor, editor]);

  const context = {
    state,
  };

  return (
    <div className="toolbar">
      <ToolbarContext.Provider value={context}>
        <History />
        <ToolbarDivider />
        <Heading />
        <ToolbarDivider />
        <FormatList />
        <ToolbarDivider />
        <FormatText />
        <Link />
        <ToolbarDivider />
        <ClearFormatting />
      </ToolbarContext.Provider>
    </div>
  );
};

export { Toolbar };
