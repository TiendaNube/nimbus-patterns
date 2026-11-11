import fs from "fs";
import { execSync } from "child_process";

/* eslint no-console: "off", class-methods-use-this: "off" */

interface YarnVersionManifest {
  releases?: Record<string, string>;
}

const loadYamlManifest = (content: string): YarnVersionManifest | null => {
  try {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const yaml = require("js-yaml") as {
      load: (str: string) => unknown;
    };
    return (yaml.load(content) as YarnVersionManifest) ?? null;
  } catch {
    return null;
  }
};

export class PackageBuilder {
  getPackagesToBuild(path: string): string[] {
    const content = this.getContentVersions(path);
    return this.processVersions(content);
  }

  getPackagesToBuildFromPaths(paths: string[]): string[] {
    const packages = new Set<string>();
    paths.forEach((filePath) => {
      const pkgs = this.getPackagesToBuild(filePath);
      pkgs.forEach((pkg) => packages.add(pkg));
    });
    return Array.from(packages);
  }

  processVersions(content: string): string[] {
    const parsed = loadYamlManifest(content);
    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.releases &&
      typeof parsed.releases === "object" &&
      !Array.isArray(parsed.releases)
    ) {
      return Object.keys(parsed.releases);
    }

    const releasesBlockMatch = content.match(
      /^releases:\s*\n((?: {2}[^\n]+\n?)*)/m
    );
    const targetBlock = releasesBlockMatch ? releasesBlockMatch[1] : content;
    const regex = /^ {2}"?([^":\n]+)"?:/gm;
    return Array.from(targetBlock.matchAll(regex), (match) =>
      match[1].replace(/"/g, "").trim()
    );
  }

  getCommandBuildNPM(
    packages: string[],
    removePackages: string[] = []
  ): string {
    const uniquePackages = Array.from(new Set(packages));
    const filteredPackages = uniquePackages.filter(
      (pack) => !removePackages.includes(pack)
    );
    const removeFilters = removePackages
      .map((pack) => `--filter=!${pack}`)
      .join(" ");

    return filteredPackages.reduce((prev, curr) => {
      const next = `${prev} --filter=${curr}...`;
      return next;
    }, `turbo run build ${removeFilters}`.trim());
  }

  execCommand(command: string): void {
    console.log(`\x1b[32m 🏃‍♂️ Running building packages...  \x1b[0m`);
    execSync(command, { stdio: "inherit" });
  }

  async triggerBuildGithubAction(url: string, body: unknown): Promise<void> {
    try {
      if (!process.env.GITHUB_TOKEN) {
        throw new Error(
          "You need to set an environment variable called GITHUB_TOKEN with your personal git token"
        );
      }
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify(body),
      });
      console.log(`\x1b[32m 🏃‍♂️ Running building github action...  \x1b[0m`);
    } catch (error: any) {
      throw new Error(
        `An error occurred while executing an action: ${error.message}`
      );
    }
  }

  getContentVersions(path: string): string {
    try {
      return fs.readFileSync(path, "utf8");
    } catch {
      throw new Error(
        "The versions file was not found so it was not possible to perform the build..."
      );
    }
  }
}
