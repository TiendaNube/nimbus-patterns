import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["./setupTests.ts"],
  coveragePathIgnorePatterns: ["dist"],
  moduleNameMapper: {
    "@common(.*)$": "<rootDir>/packages/react/src/common$1",
    // components
    "@nimbus-ds/app-shell":
      "<rootDir>/packages/react/src/components/AppShell/src",
    "@nimbus-ds/callout-card":
      "<rootDir>/packages/react/src/components/CalloutCard/src",
    "@nimbus-ds/data-list":
      "<rootDir>/packages/react/src/components/DataList/src",
    "@nimbus-ds/data-table":
      "<rootDir>/packages/react/src/components/DataTable/src",
    "@nimbus-ds/empty-message":
      "<rootDir>/packages/react/src/components/EmptyMessage/src",
    "@nimbus-ds/formfield":
      "<rootDir>/packages/react/src/components/FormField/src",
    "@nimbus-ds/help-link":
      "<rootDir>/packages/react/src/components/HelpLink/src",
    "@nimbus-ds/interactive-list":
      "<rootDir>/packages/react/src/components/InteractiveList/src",
    "@nimbus-ds/layout": "<rootDir>/packages/react/src/components/Layout/src",
    "@nimbus-ds/menu": "<rootDir>/packages/react/src/components/Menu/src",
    "@nimbus-ds/menubutton":
      "<rootDir>/packages/react/src/components/MenuButton/src",
    "@nimbus-ds/nav-tabs":
      "<rootDir>/packages/react/src/components/NavTabs/src",
    "@nimbus-ds/page": "<rootDir>/packages/react/src/components/Page/src",
    "@nimbus-ds/productupdates":
      "<rootDir>/packages/react/src/components/ProductUpdates/src",
    "@nimbus-ds/sidemodal":
      "<rootDir>/packages/react/src/components/SideModal/src",
    "@nimbus-ds/thumbnail-with-action":
      "<rootDir>/packages/react/src/components/ThumbnailWithAction/src",
    "@nimbus-ds/calendar":
      "<rootDir>/packages/react/src/components/Calendar/src",
    "@nimbus-ds/empty-app":
      "<rootDir>/packages/react/src/components/EmptyApp/src",
    "@nimbus-ds/initial-screen":
      "<rootDir>/packages/react/src/components/InitialScreen/src",
    "@nimbus-ds/plan-display":
      "<rootDir>/packages/react/src/components/PlanDisplay/src",
    "@nimbus-ds/sortable":
      "<rootDir>/packages/react/src/components/Sortable/src",
    "@nimbus-ds/product-data-list":
      "<rootDir>/packages/react/src/components/ProductDataList/src",
    "@nimbus-ds/chat-input":
      "<rootDir>/packages/react/src/components/ChatInput/src",
    "@nimbus-ds/summary-stats":
      "<rootDir>/packages/react/src/components/SummaryStats/src",
  },
};

export default config;
