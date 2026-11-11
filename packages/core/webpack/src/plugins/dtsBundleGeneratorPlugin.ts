import { exec } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { Compiler, WebpackError } from "webpack";

const rootDir = path.resolve(__dirname, "../../../../..");

const defaultEntries = [
  `node ${rootDir}/node_modules/.bin/dts-bundle-generator --no-check -o ./dist/index.d.ts ./src/index.ts`,
];

export interface DtsBundleGeneratorPluginConfig {
  entries: string[];
  concurrency?: number;
}

const execCommandAsync = (
  command: string,
  cwd: string
): Promise<{ stdout: string; stderr: string }> =>
  new Promise((resolve, reject) => {
    exec(
      command,
      { cwd, maxBuffer: 10 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          const enrichedError = new Error(
            `DTS command failed (exit code ${error.code ?? "unknown"}): ${command}\n${stderr || stdout || error.message}`
          );
          (enrichedError as any).cause = error;
          reject(enrichedError);
          return;
        }
        resolve({ stdout, stderr });
      }
    );
  });

export class DtsBundleGeneratorWebpackPlugin {
  private entries: string[];

  private concurrency: number;

  constructor(config: DtsBundleGeneratorPluginConfig = { entries: defaultEntries }) {
    this.entries = config.entries ?? defaultEntries;
    this.concurrency = Math.max(1, config.concurrency ?? 4);
  }

  apply(compiler: Compiler): void {
    compiler.hooks.afterEmit.tapPromise(
      "DtsBundleGeneratorPlugin",
      async (compilation) => {
        const cwd = compiler.context || process.cwd();
        const queue = [...this.entries];

        if (queue.length === 0) {
          return;
        }

        const runSingleCommand = async (command: string): Promise<void> => {
          const outMatch = command.match(/(?:^|\s)-o\s+([^\s]+)/);
          const expectedOutPath = outMatch
            ? path.resolve(cwd, outMatch[1])
            : null;

          if (expectedOutPath) {
            await fs.mkdir(path.dirname(expectedOutPath), { recursive: true });
          }

          await execCommandAsync(command, cwd);

          if (expectedOutPath) {
            let stat;
            try {
              stat = await fs.stat(expectedOutPath);
            } catch {
              throw new Error(
                `DTS output file was not created: ${expectedOutPath} (command: ${command})`
              );
            }
            if (!stat.isFile() || stat.size === 0) {
              throw new Error(
                `DTS output file is empty or invalid: ${expectedOutPath} (command: ${command})`
              );
            }
          }
        };

        try {
          let cursor = 0;
          const workerCount = Math.min(this.concurrency, queue.length);
          const workers = Array.from({ length: workerCount }, async () => {
            while (cursor < queue.length) {
              const currentIndex = cursor;
              cursor += 1;
              // eslint-disable-next-line no-await-in-loop
              await runSingleCommand(queue[currentIndex]);
            }
          });

          await Promise.all(workers);
        } catch (error: any) {
          const webpackError =
            error instanceof WebpackError
              ? error
              : new WebpackError(
                  `DtsBundleGeneratorPlugin: ${
                    error?.message || String(error)
                  }`
                );
          compilation.errors.push(webpackError);
          throw error;
        }
      }
    );
  }
}

export const dtsBundleGeneratorPlugin = (
  configuration: DtsBundleGeneratorPluginConfig = { entries: defaultEntries }
): DtsBundleGeneratorWebpackPlugin =>
  new DtsBundleGeneratorWebpackPlugin(configuration);
