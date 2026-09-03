import type {
  StorybookIndex,
  StorybookIndexEntry,
} from "./storybook-preview-links";
import {
  COMMENT_MARKER,
  buildCommentBody,
  previewUrl,
  resolveStoryTargets,
} from "./storybook-preview-links";

const BASE_URL = "https://preview.example.com/patterns/pull/42/index.html";

const index: StorybookIndex = {
  entries: {
    "pattern-input--docs": {
      id: "pattern-input--docs",
      title: "Patterns/Input",
      name: "Docs",
      importPath: "./packages/react/src/components/Input/src/input.stories.tsx",
      type: "docs",
    },
    "pattern-input--basic": {
      id: "pattern-input--basic",
      title: "Patterns/Input",
      name: "Basic",
      importPath: "./packages/react/src/components/Input/src/input.stories.tsx",
      type: "story",
    },
    "pattern-input-input-password--docs": {
      id: "pattern-input-input-password--docs",
      title: "Patterns/Input/Input.Password",
      name: "Docs",
      importPath:
        "./packages/react/src/components/Input/src/components/InputPassword/inputPassword.stories.tsx",
      type: "docs",
    },
    "pattern-progressbar--basic": {
      id: "pattern-progressbar--basic",
      title: "Patterns/ProgressBar",
      name: "Basic",
      importPath:
        "./packages/react/src/components/ProgressBar/src/progressBar.stories.tsx",
      type: "story",
    },
    "pattern-timepicker--docs": {
      id: "pattern-timepicker--docs",
      title: "Patterns/TimePicker",
      name: "Docs",
      importPath:
        "./packages/react/src/components/TimePicker/src/timePicker.stories.tsx",
      type: "docs",
    },
  },
};

const storyEntry = (
  id: string,
  name: string,
  importPath: string,
  title: string
): StorybookIndexEntry => ({ id, name, importPath, title, type: "story" });

/** Two docs-less files: one with a baseline story, one without. */
const manyStoriesIndex: StorybookIndex = {
  entries: {
    // Emitted before Default on purpose.
    "pattern-slider--custom": storyEntry(
      "pattern-slider--custom",
      "Custom",
      "./packages/react/src/components/Slider/src/slider.stories.tsx",
      "Patterns/Slider"
    ),
    "pattern-slider--default": storyEntry(
      "pattern-slider--default",
      "Default",
      "./packages/react/src/components/Slider/src/slider.stories.tsx",
      "Patterns/Slider"
    ),
    "pattern-divider--horizontal": storyEntry(
      "pattern-divider--horizontal",
      "Horizontal",
      "./packages/react/src/components/Divider/src/divider.stories.tsx",
      "Patterns/Divider"
    ),
    "pattern-divider--vertical": storyEntry(
      "pattern-divider--vertical",
      "Vertical",
      "./packages/react/src/components/Divider/src/divider.stories.tsx",
      "Patterns/Divider"
    ),
  },
};

describe("resolveStoryTargets", () => {
  it("links the docs page of the component that owns the changed file", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/components/Input/src/input.tsx"],
      index
    );

    expect(targets).toEqual([
      {
        title: "Patterns/Input",
        docsId: "pattern-input--docs",
        storyId: "pattern-input--basic",
      },
    ]);
  });

  it("prefers the closest stories file when a sub-component changes", () => {
    const targets = resolveStoryTargets(
      [
        "packages/react/src/components/Input/src/components/InputPassword/inputPassword.tsx",
      ],
      index
    );

    expect(targets.map(({ title }) => title)).toEqual([
      "Patterns/Input/Input.Password",
    ]);
  });

  it("falls back to the entry point for files outside any stories directory", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/components/Input/package.json"],
      index
    );

    expect(targets.map(({ title }) => title)).toEqual(["Patterns/Input"]);
  });

  it("resolves a stories file that changed on its own", () => {
    const targets = resolveStoryTargets(
      [
        "packages/react/src/components/Input/src/components/InputPassword/inputPassword.stories.tsx",
      ],
      index
    );

    expect(targets.map(({ title }) => title)).toEqual([
      "Patterns/Input/Input.Password",
    ]);
  });

  it("reports each touched component once", () => {
    const targets = resolveStoryTargets(
      [
        "packages/react/src/components/Input/src/input.tsx",
        "packages/react/src/components/Input/src/input.types.ts",
        "packages/react/src/components/Input/CHANGELOG.md",
      ],
      index
    );

    expect(targets.map(({ title }) => title)).toEqual(["Patterns/Input"]);
  });

  it("skips files that belong to no component", () => {
    const targets = resolveStoryTargets(
      ["packages/core/webpack/webpack.common.ts", ".github/workflows/ci.yml"],
      index
    );

    expect(targets).toEqual([]);
  });

  it("skips generated documentation files", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/components/Input/src/input.docs.json"],
      index
    );

    expect(targets).toEqual([]);
  });

  it("ignores malformed index entries instead of throwing", () => {
    // A truncated index.json can carry entries without an importPath.
    const broken = {
      id: "broken",
      title: "Broken",
      name: "Broken",
      type: "docs",
    } as unknown as StorybookIndexEntry;

    const malformed: StorybookIndex = {
      entries: { broken, ...index.entries },
    };

    const targets = resolveStoryTargets(
      ["packages/react/src/components/Input/src/input.tsx"],
      malformed
    );

    expect(targets.map(({ title }) => title)).toEqual(["Patterns/Input"]);
  });

  it("ignores an index entry whose importPath is not a string", () => {
    const numeric = {
      id: "numeric",
      title: "Numeric",
      name: "Numeric",
      importPath: 1,
      type: "docs",
    } as unknown as StorybookIndexEntry;

    const malformed: StorybookIndex = {
      entries: { numeric, ...index.entries },
    };

    const targets = resolveStoryTargets(
      ["packages/react/src/components/Input/src/input.tsx"],
      malformed
    );

    expect(targets.map(({ title }) => title)).toEqual(["Patterns/Input"]);
  });

  it("ignores an index entry whose title is not a string", () => {
    const untitled = {
      id: "untitled",
      title: 7,
      name: "Untitled",
      importPath: "./packages/react/src/components/Badge/src/badge.stories.tsx",
      type: "docs",
    } as unknown as StorybookIndexEntry;

    const malformed: StorybookIndex = {
      entries: { untitled, ...index.entries },
    };

    const targets = resolveStoryTargets(
      [
        "packages/react/src/components/Badge/src/badge.tsx",
        "packages/react/src/components/Input/src/input.tsx",
      ],
      malformed
    );

    expect(targets.map(({ title }) => title)).toEqual(["Patterns/Input"]);
  });

  it("skips components whose stories are absent from the index", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/components/Badge/src/badge.tsx"],
      index
    );

    expect(targets).toEqual([]);
  });
});

describe("previewUrl", () => {
  it("points at the docs page when the component has one", () => {
    const [target] = resolveStoryTargets(
      ["packages/react/src/components/Input/src/input.tsx"],
      index
    );

    expect(previewUrl(BASE_URL, target)).toBe(
      `${BASE_URL}?path=/docs/pattern-input--docs`
    );
  });

  it("points at a story when the component has no docs page", () => {
    const [target] = resolveStoryTargets(
      ["packages/react/src/components/ProgressBar/src/progressBar.tsx"],
      index
    );

    expect(previewUrl(BASE_URL, target)).toBe(
      `${BASE_URL}?path=/story/pattern-progressbar--basic`
    );
  });

  // The real case is ProgressBar: eleven stories, no docs page. Slider stands in
  // for it with Custom emitted before Default, and Divider covers a file where
  // no story carries a baseline name at all.
  it("picks the baseline story of a docs-less component, not the index order", () => {
    const [target] = resolveStoryTargets(
      ["packages/react/src/components/Slider/src/slider.tsx"],
      manyStoriesIndex
    );

    expect(previewUrl(BASE_URL, target)).toBe(
      `${BASE_URL}?path=/story/pattern-slider--default`
    );
  });

  it("keeps the index order when no story carries a baseline name", () => {
    const [target] = resolveStoryTargets(
      ["packages/react/src/components/Divider/src/divider.tsx"],
      manyStoriesIndex
    );

    expect(previewUrl(BASE_URL, target)).toBe(
      `${BASE_URL}?path=/story/pattern-divider--horizontal`
    );
  });
});

describe("buildCommentBody", () => {
  it("lists a link per touched component", () => {
    const targets = resolveStoryTargets(
      [
        "packages/react/src/components/Input/src/input.tsx",
        "packages/react/src/components/Input/src/components/InputPassword/inputPassword.tsx",
      ],
      index
    );

    const body = buildCommentBody(BASE_URL, targets);

    expect(body).toContain(
      `- 🔗 [Patterns/Input](${BASE_URL}?path=/docs/pattern-input--docs)`
    );
    expect(body).toContain(
      `- 🔗 [Patterns/Input/Input.Password](${BASE_URL}?path=/docs/pattern-input-input-password--docs)`
    );
  });

  it("always keeps a link to the preview root", () => {
    const body = buildCommentBody(BASE_URL, []);

    expect(body).toContain(`🔗 [View Storybook](${BASE_URL})`);
  });

  it("carries the marker the workflow uses to update its own comment", () => {
    const body = buildCommentBody(BASE_URL, []);

    expect(body.startsWith(COMMENT_MARKER)).toBe(true);
  });

  it("omits the decision block when the workflow states no decision", () => {
    const body = buildCommentBody(BASE_URL, []);

    expect(body).not.toContain("<details>");
  });

  it("folds the decision away behind a summary", () => {
    const body = buildCommentBody(BASE_URL, [], {
      trigger: "build-inputs",
      matched: ["packages/react/src/components/Input/src/input.tsx"],
    });

    expect(body).toContain(
      "<summary>Why this preview exists, and why these links</summary>"
    );
  });

  it("lists the files that triggered the build as evidence", () => {
    const body = buildCommentBody(BASE_URL, [], {
      trigger: "build-inputs",
      matched: ["yarn.lock", "packages/react/src/components/DataTable/src/dataTable.tsx"],
    });

    expect(body).toContain("- `yarn.lock`");
    expect(body).toContain(
      "- `packages/react/src/components/DataTable/src/dataTable.tsx`"
    );
  });

  it("truncates the evidence when a pull request matched many files", () => {
    const matched = Array.from(
      { length: 14 },
      (_, position) =>
        `packages/react/src/components/Component${position}/src/a.tsx`
    );

    const body = buildCommentBody(BASE_URL, [], {
      trigger: "build-inputs",
      matched,
    });

    expect(body).toContain("- …and 4 more");
  });

  it("names the label as the reason when it forced the build", () => {
    const body = buildCommentBody(BASE_URL, [], {
      trigger: "label",
      matched: [],
    });

    expect(body).toContain("`storybook-preview` label forces a preview");
  });

  it("says so when the build happened because the diff was unreadable", () => {
    const body = buildCommentBody(BASE_URL, [], {
      trigger: "unavailable-diff",
      matched: [],
    });

    expect(body).toContain("could not be read");
  });

  it("explains the absence of per-component links", () => {
    const body = buildCommentBody(BASE_URL, [], {
      trigger: "build-inputs",
      matched: ["yarn.lock"],
    });

    expect(body).toContain("**No link per component**");
  });

  it("explains where the per-component links come from", () => {
    const targets = resolveStoryTargets(
      ["packages/react/src/components/Input/src/input.tsx"],
      index
    );

    const body = buildCommentBody(BASE_URL, targets, {
      trigger: "build-inputs",
      matched: ["packages/react/src/components/Input/src/input.tsx"],
    });

    expect(body).toContain("**The links above**");
  });

  it("summarises the tail when too many components changed", () => {
    const targets = Array.from({ length: 11 }, (_, position) => ({
      title: `Patterns/Component${position}`,
      docsId: `pattern-component${position}--docs`,
      storyId: null,
    }));

    const body = buildCommentBody(BASE_URL, targets);

    expect(body).toContain("- …and 3 more");
  });
});
