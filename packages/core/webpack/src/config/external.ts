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
};

export const externalPackages = {
  "@nimbus-ds/tokens": "@nimbus-ds/tokens",
};

export const externalItems = { ...externalLibs, ...externalPackages };
