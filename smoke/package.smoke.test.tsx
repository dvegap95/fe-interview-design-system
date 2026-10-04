import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType, ReactNode } from "react";
import { describe, expect, it } from "vitest";

const distEntry = resolve(import.meta.dirname, "../dist/index.js");
const activeTabContextEntry = resolve(import.meta.dirname, "../dist/context/activeTabContext.js");
const hasDist = existsSync(distEntry) && existsSync(activeTabContextEntry);

type DistModule = {
  Tabs: ComponentType<{
    children?: ReactNode;
  }>;
  Tab: ComponentType<{
    value?: string;
    children?: ReactNode;
  }>;
  TabPanel: ComponentType<{
    value: string;
    children?: ReactNode;
  }>;
};

type ActiveTabContextModule = {
  ActiveTabContextProvider: ComponentType<{
    defaultActiveTab?: string;
    children?: ReactNode;
  }>;
};

describe.skipIf(!hasDist)("built package smoke", () => {
  it("switches the selected tab and visible panel", async () => {
    const { Tabs, Tab, TabPanel } = (await import(
      /* @vite-ignore */
      pathToFileURL(distEntry).href
    )) as DistModule;
    const { ActiveTabContextProvider } = (await import(
      /* @vite-ignore */
      pathToFileURL(activeTabContextEntry).href
    )) as ActiveTabContextModule;

    render(
      <ActiveTabContextProvider defaultActiveTab="tab1">
        <Tabs>
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
        </Tabs>
        <TabPanel value="tab1">Panel1</TabPanel>
        <TabPanel value="tab2">Panel2</TabPanel>
      </ActiveTabContextProvider>,
    );

    const tab1 = screen.getByRole("tab", {
      name: "Tab1",
    });
    const tab2 = screen.getByRole("tab", {
      name: "Tab2",
    });
    const panel1 = screen.getByText("Panel1").closest("[role='tabpanel']");
    const panel2 = screen.getByText("Panel2").closest("[role='tabpanel']");

    expect(tab1).toBeSelected();
    expect(tab2).not.toBeSelected();
    expect(panel1).toBeVisible();
    expect(panel2).not.toBeVisible();

    await userEvent.click(tab2);

    expect(tab1).not.toBeSelected();
    expect(tab2).toBeSelected();
    expect(panel1).not.toBeVisible();
    expect(panel2).toBeVisible();
  });
});
