import fs from "fs";
import path from "path";
import React from "react";
import { render } from "@testing-library/react";
import { parse } from "acorn";
import { minify } from "terser";
import ts from "typescript";

import { PlanDisplayCard } from "./PlanDisplayCard";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

/**
 * Regression guard for the production-only crash seen in consumers that minify
 * `@nimbus-ds/patterns` again with SWC (`next build` + `swcMinify: true`):
 *
 *   TypeError: Cannot read properties of undefined (reading 'createElement')
 *
 * The published bundle is already minified, and that pass turned the module-level
 * `getSurfaceTreatment(hasRibbon, hasLegacyHighlight)` helper into an inline IIFE inside the
 * component: `((e,t)=>…)(c, Boolean(…))`. SWC then inlines that IIFE by declaring its
 * parameters as `var`s in the component, and in the consumer's bundle one of those names
 * collided with the React import (`ed.default.createElement` hit the `var`, not the import).
 *
 * That collision depends on the consumer's name mangling and cannot be reproduced from
 * inside this repo, so these tests pin the trigger instead: the component must compile and
 * minify (same as the package build) with no immediately-invoked function in its body, and
 * the minified component must still render exactly like the source one.
 */

const SOURCE_FILE = path.join(__dirname, "PlanDisplayCard.tsx");

const minifyComponentSource = async (): Promise<string> => {
  const { outputText } = ts.transpileModule(
    fs.readFileSync(SOURCE_FILE, "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ESNext,
        jsx: ts.JsxEmit.React,
        esModuleInterop: true,
      },
    }
  );
  // webpack wraps every module in a function; terser only inlines helpers that live inside a
  // function scope (not at the top level), so the same wrapper is needed to match the dist.
  const wrapped = `out.run=function(module,exports,require){${outputText}\n};`;
  const result = await minify(wrapped, { compress: true, mangle: true });

  return result.code as string;
};

interface AstNode {
  type: string;
  callee?: AstNode;
  [key: string]: unknown;
}

const collectImmediatelyInvokedFunctions = (code: string): string[] => {
  const found: string[] = [];
  const visit = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (!node || typeof node !== "object") return;

    const astNode = node as AstNode;
    if (
      astNode.type === "CallExpression" &&
      astNode.callee &&
      (astNode.callee.type === "ArrowFunctionExpression" ||
        astNode.callee.type === "FunctionExpression")
    ) {
      found.push(code.slice(Number(astNode.start), Number(astNode.end)));
    }
    Object.values(astNode).forEach(visit);
  };

  visit(parse(code, { ecmaVersion: "latest", sourceType: "script" }));

  return found;
};

const loadMinifiedCard = (code: string): React.FC<PlanDisplayCardProps> => {
  const module = { exports: {} as Record<string, unknown> };
  const requireStub = (id: string) => {
    if (id === "react") return React;
    if (id === "@nimbus-ds/components") {
      return jest.requireActual("@nimbus-ds/components");
    }
    throw new Error(`Unexpected require("${id}") in minified PlanDisplayCard`);
  };

  const loaded: {
    run?: (
      mod: unknown,
      exp: unknown,
      req: (id: string) => unknown
    ) => void;
  } = {};
  // eslint-disable-next-line no-new-func
  new Function("out", code)(loaded);
  loaded.run?.(module, module.exports, requireStub);

  return module.exports.PlanDisplayCard as React.FC<PlanDisplayCardProps>;
};

const VARIANTS: Array<[string, Omit<PlanDisplayCardProps, "children">]> = [
  ["default", {}],
  ["highlighted (legacy)", { highlighted: true }],
  ["ribbon", { ribbonLabel: "Más escogido" }],
  ["gradient", { gradient: true }],
  [
    "ribbon over highlighted",
    { highlighted: true, ribbonLabel: "Más escogido" },
  ],
  ["gradient over highlighted", { highlighted: true, gradient: true }],
  ["ribbon over gradient", { gradient: true, ribbonLabel: "Más escogido" }],
  [
    "ribbon over gradient and highlighted",
    { highlighted: true, gradient: true, ribbonLabel: "Más escogido" },
  ],
];

const renderMarkup = (
  Card: React.FC<PlanDisplayCardProps>,
  props: Omit<PlanDisplayCardProps, "children">
) => {
  const { container, unmount } = render(
    <Card {...props}>
      <span>Body content</span>
    </Card>
  );
  const html = container.innerHTML;
  unmount();

  return html;
};

describe("GIVEN <PlanDisplayCard /> after minification", () => {
  let minifiedCode: string;
  let MinifiedCard: React.FC<PlanDisplayCardProps>;

  beforeAll(async () => {
    minifiedCode = await minifyComponentSource();
    MinifiedCard = loadMinifiedCard(minifiedCode);
  });

  describe("WHEN the component is compiled and minified like the package build does", () => {
    it("SHOULD NOT contain an immediately-invoked function that a consumer minifier would inline into the component", () => {
      expect(collectImmediatelyInvokedFunctions(minifiedCode)).toEqual([]);
    });
  });

  describe("WHEN the minified component is rendered", () => {
    it.each(VARIANTS)(
      "SHOULD render the %s card without throwing and identical to the source component",
      (_name, props) => {
        expect(renderMarkup(MinifiedCard, props)).toBe(
          renderMarkup(PlanDisplayCard, props)
        );
      }
    );

    it("SHOULD keep each treatment distinguishable, so the comparison above is not vacuous", () => {
      const markup = (props: Omit<PlanDisplayCardProps, "children">) =>
        renderMarkup(MinifiedCard, props);
      const gradient = "linear-gradient(194.55deg";

      expect(markup({})).not.toBe(markup({ highlighted: true }));
      expect(markup({})).not.toBe(markup({ ribbonLabel: "Más escogido" }));
      expect(markup({})).toContain("Body content");
      expect(markup({})).not.toContain(gradient);
      expect(markup({ gradient: true })).toContain(gradient);
      // Precedence: ribbon > gradient, and ribbon/gradient > deprecated highlighted.
      expect(
        markup({ gradient: true, ribbonLabel: "Más escogido" })
      ).not.toContain(gradient);
      expect(markup({ highlighted: true, gradient: true })).toBe(
        markup({ gradient: true })
      );
      expect(markup({ highlighted: true, ribbonLabel: "Más escogido" })).toBe(
        markup({ ribbonLabel: "Más escogido" })
      );
    });
  });
});
