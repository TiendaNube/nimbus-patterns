import fs from "fs";
import path from "path";
import { generateNextIndex } from "./generate-next-index";

/* eslint no-console: "off" */

const rootDir = path.resolve(__dirname, "..");
const nextSrcDir = path.join(rootDir, "packages/react/src/next");

generateNextIndex(rootDir);

console.log(
  [
    "",
    "👀 [watch:admin] Watching Nimbus Patterns for live Admin iteration:",
    "   • Pattern .tsx edits (packages/react/src/**) → instant Vite HMR in Admin (no build needed)",
    "   • /next pattern directories                  → auto-updates packages/react/src/next/index.ts",
    "",
  ].join("\n")
);

let debounceTimer: NodeJS.Timeout | null = null;

const flushNextIndex = (): void => {
  debounceTimer = null;
  try {
    const result = generateNextIndex(rootDir);
    console.log(
      `✅ [watch:admin] Updated packages/react/src/next/index.ts (${result.components.length} next pattern(s))`
    );
  } catch (err) {
    console.error(
      "❌ [watch:admin] Failed to update /next index:",
      (err as Error).message
    );
  }
};

if (fs.existsSync(nextSrcDir)) {
  fs.watch(nextSrcDir, { recursive: true }, (_event, filename) => {
    if (!filename || filename === "index.ts") return;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(flushNextIndex, 200);
  });
}
