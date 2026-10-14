import React, { useState } from "react";
import { Box, Button, Text } from "@nimbus-ds/components";
import { Page } from "@nimbus-ds/patterns";

export const PlaygroundCheck = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <Page>
      <Page.Header
        title="Playground check"
        subtitle="Verify a focused preview with Nimbus components and Patterns."
      />
      <Page.Body>
        <Box display="flex" flexDirection="column" gap="4" padding="4">
          <Text>Add an item, then reset the counter.</Text>
          <div role="status" aria-live="polite">
            <Text>Count: {count}</Text>
          </div>
          <Box display="flex" gap="2">
            <Button appearance="primary" onClick={() => setCount(count + 1)}>
              Add item
            </Button>
            <Button onClick={() => setCount(initialCount)}>Reset</Button>
          </Box>
        </Box>
      </Page.Body>
    </Page>
  );
};
