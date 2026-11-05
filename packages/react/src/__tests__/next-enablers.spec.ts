/* eslint import/no-relative-packages: "off" */
import fs from "fs";
import os from "os";
import path from "path";
import { PackageBuilder } from "../../../core/scripts/src/packageBuilder/PackageBuilder";
import { DtsBundleGeneratorWebpackPlugin } from "../../../core/webpack/src/plugins/dtsBundleGeneratorPlugin";
import { MoveFilesIntoDistFolderPlugin } from "../../../core/webpack/src/plugins/MoveFilesIntoDistFolderPlugin";
import { resolveNimbusTheme } from "../../../../.storybook/theme/theme";
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

    it("detects removed exports in compareNextSurface", () => {
      const diff = compareNextSurface(
        ["DataTable", "DataTableProps", "Page"],
        ["DataTable", "Page", "AppShell"]
      );
      expect(diff.removedExports).toEqual(["DataTableProps"]);
      expect(diff.addedExports).toEqual(["AppShell"]);
    });
  });
});
