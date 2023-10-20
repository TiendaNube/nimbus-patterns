import React, { useState, useEffect } from "react";
import { Box, IconButton, Link } from "@nimbus-ds/components";
import { FormField } from "@nimbus-ds/formfield";
import { PencilIcon, TrashIcon, CloseIcon, CheckIcon } from "@nimbus-ds/icons";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { PopoverEditLinkProps } from "./popoverEditLink.types";

const PopoverEditLink: React.FC<PopoverEditLinkProps> = ({
  linkUrl,
  handlePopover,
}) => {
  const [editor] = useLexicalComposerContext();

  const [text, setText] = useState(linkUrl);
  const [editLink, setEditLink] = useState(false);

  useEffect(() => {
    if (!text && linkUrl) {
      setText(linkUrl);
    }
  }, [linkUrl, text]);

  return (
    <Box backgroundColor="neutral-background" p="4" borderRadius="2">
      <Box>
        {!editLink && (
          <Box display="flex" gap="2">
            <Link as="a" href={linkUrl} target="_blank" appearance="primary">
              {linkUrl}
            </Link>
            <Box display="flex" gap="1">
              <IconButton
                source={<PencilIcon size={15} />}
                size="1.5rem"
                onClick={() => setEditLink(true)}
              />
              <IconButton
                source={<TrashIcon size={15} />}
                size="1.5rem"
                onClick={() => {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                  handlePopover();
                }}
              />
            </Box>
          </Box>
        )}
        {editLink && (
          <Box display="flex" flexDirection="column" gap="2">
            <FormField.Input
              label="URL"
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                setText(value);
              }}
            />
            <Box display="flex" gap="1" justifyContent="flex-end">
              <IconButton
                source={<CloseIcon size={12} />}
                size="1.4rem"
                onClick={() => {
                  setEditLink(false);
                  setText(linkUrl);
                }}
              />
              <IconButton
                source={<CheckIcon size={12} />}
                size="1.4rem"
                disabled={!text.length}
                onClick={() => {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, text);
                  handlePopover();
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export { PopoverEditLink };
