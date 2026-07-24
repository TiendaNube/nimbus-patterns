import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Box, Button, Text, Title } from "@nimbus-ds/components";

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
    (Story, context) => {
      // Only in Storybook's Docs page (viewMode "docs"), not in Canvas
      // (viewMode "story", each story's own dedicated full-height iframe,
      // where the sheet already renders correctly with no wrapper at all):
      // Docs stacks every story inline inside ONE shared iframe, each
      // wrapped in Storybook's own per-story zoom/scale wrapper, which
      // applies a `transform` — making it, not the viewport, the actual CSS
      // containing block for `position: fixed` here. BottomSheet portals
      // into the nearest Nimbus <ThemeProvider>'s own wrapper (see
      // BottomSheet.tsx's own `portalTarget` comment), rendered by this
      // file's global `ThemeNimbusProvider` decorator OUTSIDE this one, so
      // the portaled panel ends up a SIBLING of the div below, not a
      // descendant of it — its job isn't to become the panel's containing
      // block itself, only to give the flow something to size against: the
      // panel's `position: fixed` contributes no flow height on its own, so
      // without this, the ancestor chain up through that zoom wrapper
      // collapses to just the trigger Button's own height and clips the
      // sheet to an empty sliver via that wrapper's own overflow: hidden
      // (also reproduced by Sidebar/SideModal's own Docs page — an existing,
      // unaddressed instance of the same Storybook limitation elsewhere in
      // this repo).
      if (context.viewMode !== "docs") return <Story />;
      return (
        // Sized to fit even the tallest "full" snap (see FULL_TOP_GAP_RATIO)
        // without clipping. flexEnd anchors the trigger Button to this box's
        // own bottom edge — the same edge the panel itself anchors to once
        // open — so the Button stays right where the sheet appears instead
        // of at the top of an 860px box, out of view once the sheet's own
        // scroll-lock (see useScrollLock) blocks scrolling the rest of this
        // Docs page into sight. Scoped to Docs only: Canvas's own per-story
        // page has nothing else to scroll to anyway, so forcing this same
        // height/flex there would just push the Button down for no reason.
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
      );
    },
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
