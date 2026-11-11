/* eslint import/no-relative-packages: "off" */
import fs from "fs";
import os from "os";
import path from "path";
import React from "react";
import { execFileSync } from "child_process";
import { render, screen } from "@testing-library/react";
import { PackageBuilder } from "../../../core/scripts/src/packageBuilder/PackageBuilder";
import { DtsBundleGeneratorWebpackPlugin } from "../../../core/webpack/src/plugins/dtsBundleGeneratorPlugin";
import { MoveFilesIntoDistFolderPlugin } from "../../../core/webpack/src/plugins/MoveFilesIntoDistFolderPlugin";
import {
  resolveNimbusTheme,
  ThemeNimbusProvider,
} from "../../../../.storybook/theme/theme";
import tokensStoriesMeta from "../../../../.storybook/stories/tokens.stories";
import {
  hasNativeNorteUiThemes,
  isNorteUiFallbackTheme,
  toProviderTheme,
} from "../../../../.storybook/theme/themeVars";
import { verifyNoUnexpectedBaseComponentChanges } from "../../../../.scripts/check-base-invariance";
import { generateNextIndex } from "../../../../.scripts/generate-next-index";
import { checkNoRcDeps } from "../../../../.scripts/check-no-rc-deps";
import { compareNextSurface } from "../../../../.scripts/check-next-breaking";

describe("Next-Evolution Enablers (E0, E1, E2, E3, E8)", () => {
  describe("E0 — PackageBuilder multi-manifest parsing", () => {
    let tmpDir: string;

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nimbus-pkg-builder-"));
    });

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it("parses the releases block and ignores undecided entries across multiple manifests", () => {
      const manifest1 = path.join(tmpDir, "v1.yml");
      const manifest2 = path.join(tmpDir, "v2.yml");

      fs.writeFileSync(
        manifest1,
        [
          "releases:",
          '  "@nimbus-ds/patterns": minor',
          '  "@nimbus-ds/form-field": patch',
          "undecided:",
          "  - nimbus-patterns",
          '  - "@nimbus-ds/help-link"',
        ].join("\n"),
        "utf8"
      );

      fs.writeFileSync(
        manifest2,
        [
          "releases:",
          '  "@nimbus-ds/patterns": patch',
          '  "@nimbus-ds/callout-card": minor',
        ].join("\n"),
        "utf8"
      );

      const builder = new PackageBuilder();
      const singleResult = builder.getPackagesToBuild(manifest1);
      expect(singleResult).toEqual([
        "@nimbus-ds/patterns",
        "@nimbus-ds/form-field",
      ]);

      const multiResult = builder.getPackagesToBuildFromPaths([
        manifest1,
        manifest2,
      ]);
      expect(multiResult).toEqual([
        "@nimbus-ds/patterns",
        "@nimbus-ds/form-field",
        "@nimbus-ds/callout-card",
      ]);
    });
  });

  describe("E0 — DtsBundleGeneratorWebpackPlugin & MoveFilesIntoDistFolderPlugin error propagation", () => {
    let tmpDir: string;

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nimbus-dts-plugin-"));
    });

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it("rejects and pushes to compilation.errors when a DTS command fails or output is missing", async () => {
      const plugin = new DtsBundleGeneratorWebpackPlugin({
        entries: [
          "node -e 'process.exit(1)' -o ./dist/missing.d.ts ./src/index.ts",
        ],
        concurrency: 2,
      });

      let tappedCallback: ((compilation: any) => Promise<void>) | undefined;
      const fakeCompiler: any = {
        context: tmpDir,
        hooks: {
          afterEmit: {
            tapPromise: (
              _name: string,
              cb: (compilation: any) => Promise<void>
            ) => {
              tappedCallback = cb;
            },
          },
        },
      };

      plugin.apply(fakeCompiler);
      expect(tappedCallback).toBeDefined();

      const fakeCompilation = { errors: [] as Error[] };
      await expect(tappedCallback!(fakeCompilation)).rejects.toThrow();
      expect(fakeCompilation.errors.length).toBeGreaterThan(0);
    });

    it("pushes error to compilation.errors and rethrows when MoveFilesIntoDistFolderPlugin fails", async () => {
      const plugin = new MoveFilesIntoDistFolderPlugin({
        packageJsonPath: "non-existent-file-12345.json",
      });

      let tappedCallback: ((compilation: any) => Promise<void>) | undefined;
      const fakeCompiler: any = {
        context: tmpDir,
        options: {
          output: {
            path: path.join(tmpDir, "dist"),
          },
        },
        hooks: {
          afterEmit: {
            tapPromise: (
              _name: string,
              cb: (compilation: any) => Promise<void>
            ) => {
              tappedCallback = cb;
            },
          },
        },
      };

      plugin.apply(fakeCompiler);
      const fakeCompilation = { errors: [] as Error[] };
      await expect(tappedCallback!(fakeCompilation)).rejects.toThrow();
      expect(fakeCompilation.errors.length).toBe(1);
    });
  });

  describe("E2 — Storybook 6-Theme deterministic resolution (resolveNimbusTheme)", () => {
    it("resolves auto to base/dark for legacy stories and next-norteui/next-norteui-dark for /src/next/ stories", () => {
      expect(
        resolveNimbusTheme({
          toolbarTheme: "auto",
          isDarkMode: false,
          fileName:
            "packages/react/src/components/HelpLink/src/helpLink.stories.tsx",
        })
      ).toBe("base");

      expect(
        resolveNimbusTheme({
          toolbarTheme: "auto",
          isDarkMode: true,
          fileName:
            "packages/react/src/components/HelpLink/src/helpLink.stories.tsx",
        })
      ).toBe("dark");

      expect(
        resolveNimbusTheme({
          toolbarTheme: "auto",
          isDarkMode: false,
          fileName:
            "packages/react/src/next/DataTable/src/dataTable.stories.tsx",
        })
      ).toBe("next-norteui");

      expect(
        resolveNimbusTheme({
          toolbarTheme: "auto",
          isDarkMode: true,
          fileName:
            "packages/react/src/next/DataTable/src/dataTable.stories.tsx",
        })
      ).toBe("next-norteui-dark");
    });

    it("honors explicit theme selections (base, dark, next, next-dark, next-norteui, next-norteui-dark)", () => {
      expect(
        resolveNimbusTheme({ toolbarTheme: "base", isDarkMode: false })
      ).toBe("base");
      expect(
        resolveNimbusTheme({ toolbarTheme: "dark", isDarkMode: false })
      ).toBe("dark");
      expect(
        resolveNimbusTheme({ toolbarTheme: "next", isDarkMode: false })
      ).toBe("next");
      expect(
        resolveNimbusTheme({ toolbarTheme: "next-dark", isDarkMode: false })
      ).toBe("next-dark");
      expect(
        resolveNimbusTheme({ toolbarTheme: "next-norteui", isDarkMode: false })
      ).toBe("next-norteui");
      expect(
        resolveNimbusTheme({
          toolbarTheme: "next-norteui-dark",
          isDarkMode: false,
        })
      ).toBe("next-norteui-dark");
      expect(
        resolveNimbusTheme({
          toolbarTheme: "side-by-side",
          isDarkMode: false,
        })
      ).toBe("base");
      expect(
        resolveNimbusTheme({
          toolbarTheme: "side-by-side-dark",
          isDarkMode: true,
        })
      ).toBe("dark");
    });
  });

  describe("E2 — provider theme mapping (toProviderTheme / isNorteUiFallbackTheme)", () => {
    it("never silently maps Norte UI: either native or flagged as fallback", () => {
      const expected = hasNativeNorteUiThemes
        ? {
            light: "next-norteui",
            dark: "next-norteui-dark",
            fallback: false,
          }
        : { light: "next", dark: "next-dark", fallback: true };

      expect(toProviderTheme("next-norteui")).toBe(expected.light);
      expect(toProviderTheme("next-norteui-dark")).toBe(expected.dark);
      [
        "next-norteui",
        "next-norteui-dark",
        "side-by-side",
        "side-by-side-dark",
      ].forEach((t) => {
        expect(isNorteUiFallbackTheme(t)).toBe(expected.fallback);
      });
    });

    it("never flags non-Norte UI themes as fallback and leaves them unchanged", () => {
      ["base", "dark", "next", "next-dark", "auto", undefined].forEach((t) => {
        expect(isNorteUiFallbackTheme(t)).toBe(false);
      });
      expect(toProviderTheme("base")).toBe("base");
      expect(toProviderTheme("dark")).toBe("dark");
      expect(toProviderTheme("next")).toBe("next");
      expect(toProviderTheme("next-dark")).toBe("next-dark");
    });
  });

  describe("E2 — ThemeNimbusProvider rendering without native Norte UI themes", () => {
    const child = React.createElement(
      "span",
      { "data-testid": "story-child" },
      "child"
    );

    it("blocks the side-by-side comparison when Norte UI is not native", () => {
      const { container } = render(
        React.createElement(
          ThemeNimbusProvider as React.ComponentType<Record<string, unknown>>,
          { theme: "side-by-side" },
          child
        )
      );
      const blocked = !hasNativeNorteUiThemes;
      expect(screen.getAllByTestId("story-child")).toHaveLength(
        blocked ? 1 : 2
      );
      expect(
        container.querySelector('[data-nimbus-comparison-blocked="true"]') !==
          null
      ).toBe(blocked);
      expect(
        container.querySelector('[data-nimbus-norteui-unavailable="true"]') !==
          null
      ).toBe(blocked);
      expect(
        container.querySelector('[data-nimbus-theme="next-norteui"]') !== null
      ).toBe(!blocked);
    });

    it("reflects the real provider theme for next-norteui", () => {
      const { container } = render(
        React.createElement(
          ThemeNimbusProvider as React.ComponentType<Record<string, unknown>>,
          { theme: "next-norteui" },
          child
        )
      );
      const wrapper = container.querySelector("[data-nimbus-requested-theme]");
      expect(wrapper?.getAttribute("data-nimbus-requested-theme")).toBe(
        "next-norteui"
      );
      expect(wrapper?.getAttribute("data-nimbus-theme")).toBe(
        toProviderTheme("next-norteui")
      );
      expect(wrapper?.getAttribute("data-nimbus-provider-theme")).toBe(
        toProviderTheme("next-norteui")
      );
    });
  });

  describe("E2 — Token catalog probes isolation", () => {
    it("portals probes directly under document.body, outside the decorator theme, across theme switches", () => {
      const Catalog = tokensStoriesMeta.component as React.ComponentType<
        Record<string, unknown>
      >;
      const tree = (theme: "dark" | "next") =>
        React.createElement(
          ThemeNimbusProvider as React.ComponentType<Record<string, unknown>>,
          { theme },
          React.createElement(Catalog, {
            initialCategory: "semantic-colors",
          })
        );

      const { container, rerender } = render(tree("dark"));
      const assertIsolated = () => {
        const portals = screen.getAllByTestId("nimbus-tokens-probes-portal");
        expect(portals).toHaveLength(1);
        expect(portals[0].parentElement).toBe(document.body);
        expect(container.contains(portals[0])).toBe(false);
        expect(portals[0].closest("[data-nimbus-theme]")).toBeNull();
        const baseProbe = portals[0].querySelector("[data-nimbus-base-probe]");
        expect(baseProbe).not.toBeNull();
        expect(baseProbe?.closest("[data-nimbus-theme]")).toBeNull();
        // Static base value of neutral.background stays white regardless of the decorator.
        expect(container.textContent?.toUpperCase()).toContain("#FFFFFF");
      };

      assertIsolated();
      rerender(tree("next"));
      assertIsolated();
    });
  });

  describe("E3 — generateNextIndex barrel generator", () => {
    let tmpDir: string;

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nimbus-next-index-"));
    });

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it("writes export {}; when 0 /next components exist", () => {
      const result = generateNextIndex(tmpDir);
      expect(result.components).toEqual([]);
      expect(result.content).toBe(
        "// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY.\nexport {};\n"
      );
    });

    it("sorts /next components ASCII-alphabetically and detects duplicate exports", () => {
      const nextDir = path.join(tmpDir, "packages/react/src/next");
      const compB = path.join(nextDir, "Page/src");
      const compA = path.join(nextDir, "AppShell/src");
      fs.mkdirSync(compB, { recursive: true });
      fs.mkdirSync(compA, { recursive: true });

      fs.writeFileSync(
        path.join(compB, "index.ts"),
        "export const Page = () => null;\n",
        "utf8"
      );
      fs.writeFileSync(
        path.join(compA, "index.ts"),
        "export const AppShell = () => null;\n",
        "utf8"
      );

      const result = generateNextIndex(tmpDir);
      expect(result.components).toEqual(["AppShell", "Page"]);
      expect(result.content).toContain(
        'export * from "./AppShell/src";\nexport * from "./Page/src";'
      );

      // Introduce duplicate identifier collision
      fs.writeFileSync(
        path.join(compB, "index.ts"),
        "export const AppShell = () => null;\n",
        "utf8"
      );
      expect(() => generateNextIndex(tmpDir)).toThrow(
        /Duplicate export "AppShell"/
      );
    });
  });

  describe("E8 — checkNoRcDeps and compareNextSurface", () => {
    let tmpDir: string;

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nimbus-rc-check-"));
    });

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it("flags -rc. and file: dependencies on @nimbus-ds/*", () => {
      fs.writeFileSync(
        path.join(tmpDir, "package.json"),
        JSON.stringify({
          dependencies: {
            "@nimbus-ds/components": "5.57.0-rc.1",
            "@nimbus-ds/styles": "file:../nimbus-design-system/packages/styles",
          },
        }),
        "utf8"
      );

      const violations = checkNoRcDeps(tmpDir);
      expect(violations).toHaveLength(2);
      expect(violations[0].packageName).toBe("@nimbus-ds/components");
      expect(violations[1].packageName).toBe("@nimbus-ds/styles");
    });

    it("flags prereleases without a dot after the tag (-rc, -beta)", () => {
      fs.writeFileSync(
        path.join(tmpDir, "package.json"),
        JSON.stringify({
          dependencies: {
            "@nimbus-ds/components": "9.62.0-rc",
            "@nimbus-ds/styles": "5.57.0-beta",
            "@nimbus-ds/icons": "^1.0.0",
          },
        }),
        "utf8"
      );

      const violations = checkNoRcDeps(tmpDir);
      expect(violations.map((v) => v.packageName)).toEqual([
        "@nimbus-ds/components",
        "@nimbus-ds/styles",
      ]);
    });

    it("flags -rc / -beta prereleases without a dot inside yarn.lock", () => {
      fs.writeFileSync(
        path.join(tmpDir, "package.json"),
        JSON.stringify({ name: "root" }),
        "utf8"
      );
      fs.writeFileSync(
        path.join(tmpDir, "yarn.lock"),
        [
          '"@nimbus-ds/components@npm:^9.0.0":',
          "  version: 9.62.0-rc",
          '  resolution: "@nimbus-ds/components@npm:9.62.0-rc"',
          '"@nimbus-ds/styles@npm:^5.0.0":',
          "  version: 5.57.0-beta",
          '  resolution: "@nimbus-ds/styles@npm:5.57.0-beta"',
          '"@nimbus-ds/icons@npm:^1.0.0":',
          "  version: 1.0.0",
          '  resolution: "@nimbus-ds/icons@npm:1.0.0"',
          "",
        ].join("\n"),
        "utf8"
      );
      const violations = checkNoRcDeps(tmpDir);
      expect(violations.map((v) => v.packageName)).toEqual([
        "@nimbus-ds/components",
        "@nimbus-ds/styles",
      ]);
      expect(violations.every((v) => v.file.startsWith("yarn.lock:"))).toBe(
        true
      );
    });

    it("keeps the legacy allowance for @nimbus-ds/webpack", () => {
      fs.writeFileSync(
        path.join(tmpDir, "package.json"),
        JSON.stringify({
          devDependencies: { "@nimbus-ds/webpack": "1.0.0-rc.3" },
        }),
        "utf8"
      );
      expect(checkNoRcDeps(tmpDir)).toHaveLength(0);
    });

    it("detects removed exports in compareNextSurface", () => {
      const diff = compareNextSurface(
        ["DataTable", "DataTableProps", "Page"],
        ["DataTable", "Page", "AppShell"]
      );
      expect(diff.removedExports).toEqual(["DataTableProps"]);
      expect(diff.addedExports).toEqual(["AppShell"]);
    });
  });

  describe("E8 — verifyNoUnexpectedBaseComponentChanges with uncommitted changes", () => {
    let repoDir: string;
    const git = (...args: string[]) =>
      execFileSync("git", args, { cwd: repoDir, stdio: "pipe" });

    beforeEach(() => {
      repoDir = fs.mkdtempSync(path.join(os.tmpdir(), "nimbus-invariance-"));
      git("init", "-q");
      git("config", "user.email", "test@example.com");
      git("config", "user.name", "Test");
      git("config", "commit.gpgsign", "false");
      fs.mkdirSync(path.join(repoDir, "packages/react/src/components/A"), {
        recursive: true,
      });
      fs.mkdirSync(path.join(repoDir, "packages/react/src/next/B"), {
        recursive: true,
      });
      fs.writeFileSync(
        path.join(repoDir, "packages/react/src/components/A/a.ts"),
        "export const a = 1;\n"
      );
      fs.writeFileSync(
        path.join(repoDir, "packages/react/src/next/B/b.ts"),
        "export const b = 1;\n"
      );
      git("add", "-A");
      git("commit", "-q", "-m", "init");
    });

    afterEach(() => {
      fs.rmSync(repoDir, { recursive: true, force: true });
    });

    it("passes with a clean working tree", () => {
      expect(verifyNoUnexpectedBaseComponentChanges(repoDir, "HEAD")).toEqual(
        []
      );
    });

    it("throws for uncommitted edits in both components/ and next/", () => {
      fs.writeFileSync(
        path.join(repoDir, "packages/react/src/components/A/a.ts"),
        "export const a = 2;\n"
      );
      fs.writeFileSync(
        path.join(repoDir, "packages/react/src/next/B/b.ts"),
        "export const b = 2;\n"
      );
      expect(() =>
        verifyNoUnexpectedBaseComponentChanges(repoDir, "HEAD")
      ).toThrow(/Base invariance violation/);
    });

    it("throws for a staged base change reverted only in the working tree (MM) plus untracked next/", () => {
      const baseFile = path.join(
        repoDir,
        "packages/react/src/components/A/a.ts"
      );
      fs.writeFileSync(baseFile, "export const a = 99;\n");
      git("add", "packages/react/src/components/A/a.ts");
      fs.writeFileSync(baseFile, "export const a = 1;\n");
      fs.writeFileSync(
        path.join(repoDir, "packages/react/src/next/B/new.ts"),
        "export const n = 1;\n"
      );
      expect(() =>
        verifyNoUnexpectedBaseComponentChanges(repoDir, "HEAD")
      ).toThrow(/components\/A\/a\.ts/);
    });

    it("throws for an uncommitted components/ edit with a new untracked next/ file", () => {
      fs.writeFileSync(
        path.join(repoDir, "packages/react/src/components/A/a.ts"),
        "export const a = 3;\n"
      );
      fs.writeFileSync(
        path.join(repoDir, "packages/react/src/next/B/new.ts"),
        "export const n = 1;\n"
      );
      expect(() =>
        verifyNoUnexpectedBaseComponentChanges(repoDir, "HEAD")
      ).toThrow(/components\/A\/a\.ts/);
    });
  });
});
