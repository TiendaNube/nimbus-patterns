/* eslint import/no-relative-packages: "off" */
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";

import { HelpLink } from "../components/HelpLink/src";
import { EmptyMessage } from "../components/EmptyMessage/src";
import { CalloutCard } from "../components/CalloutCard/src";
import { Layout } from "../components/Layout/src";
import { Page } from "../components/Page/src";
import { NavTabs } from "../components/NavTabs/src";
import { DataList } from "../components/DataList/src";
import { SummaryStats } from "../components/SummaryStats/src";
import { ThumbnailWithAction } from "../components/ThumbnailWithAction/src";

beforeAll(() => {
  global.ResizeObserver =
    global.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
});

const normalizeDynamicIds = (html: string): string =>
  html.replace(/«r[0-9a-zA-Z]+»|:r[0-9a-zA-Z]+:/g, ":r_id:");

const renderUnderTheme = (
  theme: Theme | "next-norteui" | "next-norteui-dark",
  node: React.ReactElement
): string => {
  const { container, unmount } = render(
    <ThemeProvider theme={theme as Theme}>{node}</ThemeProvider>
  );
  const providerRoot = container.firstElementChild as HTMLElement | null;
  const innerHtml = providerRoot ? providerRoot.innerHTML : container.innerHTML;
  unmount();
  return normalizeDynamicIds(innerHtml);
};

describe("Base Theme Invariance (E1)", () => {
  const patternFixtures: Array<{ name: string; element: React.ReactElement }> =
    [
      {
        name: "HelpLink",
        element: <HelpLink>Learn more about Nimbus</HelpLink>,
      },
      {
        name: "EmptyMessage",
        element: (
          <EmptyMessage
            title="No orders yet"
            text="Your store orders will appear here."
          />
        ),
      },
      {
        name: "CalloutCard",
        element: (
          <CalloutCard
            title="Configure shipping"
            subtitle="Set up delivery options for your customers"
            appearance="primary"
            icon={() => <svg data-testid="callout-icon" />}
          />
        ),
      },
      {
        name: "Layout",
        element: (
          <Layout columns="2 - asymmetric">
            <Layout.Section>Main section</Layout.Section>
            <Layout.Section>Side section</Layout.Section>
          </Layout>
        ),
      },
      {
        name: "Page",
        element: (
          <Page maxWidth="1200px">
            <Page.Header title="Products" subtitle="Manage catalog" />
            <Page.Body>Page body content</Page.Body>
          </Page>
        ),
      },
      {
        name: "NavTabs",
        element: (
          <NavTabs>
            <div>Home</div>
            <div>Orders</div>
          </NavTabs>
        ),
      },
      {
        name: "DataList",
        element: (
          <DataList>
            <DataList.Row>
              <div>Row 1</div>
            </DataList.Row>
          </DataList>
        ),
      },
      {
        name: "SummaryStats",
        element: (
          <SummaryStats>
            <SummaryStats.Item
              value="$1,200"
              description="Revenue"
              trend="up"
              trendText="12%"
            />
            <SummaryStats.Item
              value="48"
              description="Orders"
              trend="neutral"
              trendText="0%"
            />
          </SummaryStats>
        ),
      },
      {
        name: "ThumbnailWithAction",
        element: (
          <ThumbnailWithAction
            thumbnail={{
              src: "https://example.com/image.png",
              alt: "Product image",
            }}
          >
            <div>Action</div>
          </ThumbnailWithAction>
        ),
      },
    ];

  it.each(patternFixtures)(
    "renders identical DOM structure and attributes under base and dark themes for $name",
    ({ element }) => {
      const baseHtml = renderUnderTheme("base", element);
      const darkHtml = renderUnderTheme("dark", element);

      expect(baseHtml).toBeTruthy();
      expect(darkHtml).toEqual(baseHtml);
    }
  );

  it("supports all 6 themes (base, dark, next, next-dark, next-norteui, next-norteui-dark) in ThemeProvider without mutating child pattern markup", () => {
    const sample = <HelpLink>Theme check</HelpLink>;
    const themes: Array<Theme | "next-norteui" | "next-norteui-dark"> = [
      "base",
      "dark",
      "next",
      "next-dark",
      "next-norteui",
      "next-norteui-dark",
    ];
    const snapshots = themes.map((t) => renderUnderTheme(t, sample));

    expect(snapshots[1]).toEqual(snapshots[0]);
    expect(snapshots[2]).toEqual(snapshots[0]);
    expect(snapshots[3]).toEqual(snapshots[0]);
    expect(snapshots[4]).toEqual(snapshots[0]);
    expect(snapshots[5]).toEqual(snapshots[0]);
  });
});
