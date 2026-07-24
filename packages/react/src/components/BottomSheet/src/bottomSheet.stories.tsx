import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import {
  Box,
  Button,
  Input,
  Modal,
  Popover,
  Text,
  Title,
} from "@nimbus-ds/components";

import { BottomSheet } from "./BottomSheet";
import { BottomSheetProps } from "./bottomSheet.types";

const meta: Meta<typeof BottomSheet> = {
  title: "Patterns/BottomSheet",
  component: BottomSheet,
  argTypes: {
    children: { control: { disable: true } },
    onRemove: { control: { disable: true } },
    root: { control: { disable: true } },
    open: {
      control: "boolean",
      description: "Controls the sheet visibility",
      table: { type: { summary: "boolean" } },
    },
    snapPoints: {
      control: "object",
      description: "Ordered list of heights the sheet can snap to",
      table: { type: { summary: 'Array<"NN%" | "full">' } },
    },
    defaultSnap: {
      control: "number",
      description: "Index within snapPoints used as the initial snap point",
      table: { type: { summary: "number" } },
    },
    closeOnOutsidePress: {
      control: "boolean",
      description:
        "Controls whether pressing outside should close the sheet (also accepts a predicate function, not editable via this control)",
      table: { type: { summary: "boolean | (event) => boolean" } },
    },
    needRemoveScroll: {
      control: "boolean",
      description:
        "Determines if background scroll is locked while the sheet is open",
      table: { type: { summary: "boolean" } },
    },
    ignoreAttributeName: {
      control: "text",
      description: "Attribute name to ignore when checking for outside presses",
      table: { type: { summary: "string" } },
    },
    zIndex: {
      control: "number",
      description: "Explicit z-index for the sheet layer",
      table: { type: { summary: "number" } },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      // BottomSheet portals into the nearest Nimbus <ThemeProvider>'s own
      // wrapper (see BottomSheet.tsx's own `portalTarget` comment) — that
      // wrapper is rendered by this file's global `ThemeNimbusProvider`
      // decorator (.storybook/preview.tsx), OUTSIDE this decorator, so the
      // portaled panel ends up a SIBLING of this div, not a descendant of
      // it. This div's job isn't to become the panel's containing block
      // itself; its explicit height is what matters — the panel's
      // `position: fixed` doesn't contribute any flow height on its own, so
      // without something else in the flow forcing height, the whole
      // ancestor chain up through Storybook's own per-story preview wrapper
      // (which happens to apply a `transform`, making it — not the
      // viewport — the actual CSS containing block for `position: fixed`
      // inside Storybook's Docs page, unlike Canvas's dedicated full-height
      // iframe) collapses to just the trigger Button's own height and clips
      // the sheet as an empty sliver via that wrapper's own overflow:hidden.
      // Sized to fit even the tallest "full" snap (see
      // FULL_TOP_GAP_RATIO) without clipping. flexEnd anchors the trigger
      // Button to this box's own bottom edge — the same edge the panel
      // itself anchors to once open (both end up flush against the same
      // inflated containing block) — so the Button stays right where the
      // sheet appears instead of at the top of an 860px box, out of view
      // once the sheet's own scroll-lock (see useScrollLock) blocks
      // scrolling the rest of this Docs page into sight.
      <div
        style={{
          position: "relative",
          height: "860px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

const placeholderBody = (
  <Box
    borderStyle="dashed"
    borderWidth="1"
    borderColor="neutral-interactive"
    minHeight="120px"
    boxSizing="border-box"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Text textAlign="center" fontSize="base">
      Replace me with your content
    </Text>
  </Box>
);

const render = (args: BottomSheetProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <BottomSheet {...args} open={open} onRemove={() => setOpen(false)} />
    </>
  );
};

export const basic: Story = {
  render,
  args: {
    snapPoints: ["60%", "90%", "full"],
    defaultSnap: 0,
    children: (
      <>
        <BottomSheet.Header>
          <Title as="h3">Bottom sheet</Title>
        </BottomSheet.Header>
        <BottomSheet.Body>{placeholderBody}</BottomSheet.Body>
      </>
    ),
  },
};

export const withFooter: Story = {
  render,
  args: {
    snapPoints: ["60%", "90%", "full"],
    children: (
      <>
        <BottomSheet.Header>
          <Title as="h3">Install app</Title>
        </BottomSheet.Header>
        <BottomSheet.Body>{placeholderBody}</BottomSheet.Body>
        <BottomSheet.Footer>
          <Button>Cancel</Button>
          <Button appearance="primary">Confirm</Button>
        </BottomSheet.Footer>
      </>
    ),
  },
};

export const withoutTitle: Story = {
  render,
  args: {
    snapPoints: ["50%", "full"],
    children: <BottomSheet.Body>{placeholderBody}</BottomSheet.Body>,
  },
};

export const startingFullScreen: Story = {
  render,
  args: {
    snapPoints: ["60%", "full"],
    defaultSnap: 1,
    children: (
      <>
        <BottomSheet.Header>
          <Title as="h3">Starts at &quot;full&quot; snap</Title>
        </BottomSheet.Header>
        <BottomSheet.Body>{placeholderBody}</BottomSheet.Body>
      </>
    ),
  },
};

export const withInternalPopover: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [popoverVisible, setPopoverVisible] = useState(false);
    // BottomSheet unmounts its children when it closes, but state owned
    // outside it (like this popoverVisible) survives that unmount — reset it
    // alongside the sheet so reopening doesn't come back with the popover
    // already open.
    const handleClose = () => {
      setOpen(false);
      setPopoverVisible(false);
    };
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <BottomSheet {...args} open={open} onRemove={handleClose}>
          <BottomSheet.Header>
            <Title as="h3">Popover stays open above the sheet</Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <Box display="inline-flex">
              <Popover
                content={
                  <Box padding="2">
                    <Text>
                      This popover renders above the sheet and does not close
                      it.
                    </Text>
                  </Box>
                }
                visible={popoverVisible}
                onVisibility={setPopoverVisible}
              >
                {/* Popover already toggles itself via its own click interaction
                  (enabledClick defaults to true) and reports the change via
                  onVisibility — no need to also toggle state in onClick here. */}
                <Button>Toggle popover</Button>
              </Popover>
            </Box>
          </BottomSheet.Body>
        </BottomSheet>
      </>
    );
  },
  args: {
    snapPoints: ["60%", "90%", "full"],
  },
};

export const withInternalModal: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    // See withInternalPopover: reset the modal's own state alongside the
    // sheet's, since it's owned outside the sheet and survives the sheet's
    // unmount on close.
    const handleClose = () => {
      setOpen(false);
      setModalOpen(false);
    };
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <BottomSheet {...args} open={open} onRemove={handleClose}>
          <BottomSheet.Header>
            <Title as="h3">Modal stays open above the sheet</Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            <Modal open={modalOpen} onDismiss={() => setModalOpen(false)}>
              <Modal.Header title="Confirm action" />
              <Modal.Body>
                <Text>
                  This modal renders above the sheet and does not close it.
                </Text>
              </Modal.Body>
            </Modal>
          </BottomSheet.Body>
        </BottomSheet>
      </>
    );
  },
  args: {
    snapPoints: ["60%", "90%", "full"],
  },
};

export const withKeyboardInput: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <BottomSheet {...args} open={open} onRemove={() => setOpen(false)}>
          <BottomSheet.Header>
            <Title as="h3">Focus the input on a mobile device</Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <Input placeholder="Type something..." />
          </BottomSheet.Body>
        </BottomSheet>
      </>
    );
  },
  args: {
    snapPoints: ["60%", "90%"],
  },
};

export const twoSheetsCoexisting: Story = {
  render: () => {
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setFirstOpen(true)}>Open first sheet</Button>
        <BottomSheet
          open={firstOpen}
          onRemove={() => setFirstOpen(false)}
          snapPoints={["70%", "full"]}
        >
          <BottomSheet.Header>
            <Title as="h3">First sheet</Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <Button onClick={() => setSecondOpen(true)}>
              Open second sheet
            </Button>
          </BottomSheet.Body>
        </BottomSheet>
        <BottomSheet
          open={secondOpen}
          onRemove={() => setSecondOpen(false)}
          snapPoints={["50%"]}
        >
          <BottomSheet.Header>
            <Title as="h3">Second sheet</Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <Text>
              Opening this sheet did not close the first one; it renders above
              it.
            </Text>
          </BottomSheet.Body>
        </BottomSheet>
      </>
    );
  },
};

export const controlledByArgs: Story = {
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleClose = () => updateArgs({ open: !open });
    return (
      <>
        <Button onClick={handleClose}>Open</Button>
        <BottomSheet {...args} open={open} onRemove={handleClose} />
      </>
    );
  },
  args: {
    snapPoints: ["60%", "90%", "full"],
    children: (
      <>
        <BottomSheet.Header>
          <Title as="h3">Controlled via Storybook args</Title>
        </BottomSheet.Header>
        <BottomSheet.Body>{placeholderBody}</BottomSheet.Body>
      </>
    ),
  },
};
