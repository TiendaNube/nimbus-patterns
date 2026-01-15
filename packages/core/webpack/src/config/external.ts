/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 * @see https://webpack.js.org/configuration/externals/
 */
export const externalLibs = {
  "@floating-ui/react": "@floating-ui/react",
  "@nimbus-ds/styles": "@nimbus-ds/styles",
  "@nimbus-ds/components": "@nimbus-ds/components",
  "@nimbus-ds/icons": "@nimbus-ds/icons",
  react: "react",
  "react-dom": "react-dom",
  "react-day-picker": "react-day-picker",
  "date-fns": "date-fns",
  "@lexical/react": "@lexical/react",
  lexical: "lexical",
  "@dnd-kit/core": "@dnd-kit/core",
  "@dnd-kit/sortable": "@dnd-kit/sortable",
  "@dnd-kit/utilities": "@dnd-kit/utilities",
};

export const externalPackages = {
  "@nimbus-ds/tokens": "@nimbus-ds/tokens",
};

export const externalItems = { ...externalLibs, ...externalPackages };
