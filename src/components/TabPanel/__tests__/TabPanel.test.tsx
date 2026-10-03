import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tab from "@/components/Tab";
import { Tabs } from "@/components/Tabs";
import { ActiveTabContextProvider } from "@/context/activeTabContext";
import { MISSING_CONTEXT_ERROR } from "../constants";
import TabPanel from "../TabPanel";

describe("TabPanel", () => {
  it("should throw when rendered outside ActiveTabContextProvider", () => {
    expect(() => render(<TabPanel value="tab1">TabPanel Content</TabPanel>)).toThrow(
      MISSING_CONTEXT_ERROR,
    );
  });

  it("should show the panel matching the active tab", () => {
    render(
      <ActiveTabContextProvider defaultActiveTab="tab2">
        <Tabs>
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
        </Tabs>
        <TabPanel value="tab1">Panel1</TabPanel>
        <TabPanel value="tab2">Panel2</TabPanel>
      </ActiveTabContextProvider>,
    );

    expect(screen.getByText("Panel1").closest("[role='tabpanel']")).not.toBeVisible();
    expect(screen.getByText("Panel2").closest("[role='tabpanel']")).toBeVisible();
  });

  it("should switch visible panel when active tab changes", async () => {
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

    expect(screen.getByText("Panel1").closest("[role='tabpanel']")).toBeVisible();
    expect(screen.getByText("Panel2").closest("[role='tabpanel']")).not.toBeVisible();

    await userEvent.click(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    );

    expect(screen.getByText("Panel1").closest("[role='tabpanel']")).not.toBeVisible();
    expect(screen.getByText("Panel2").closest("[role='tabpanel']")).toBeVisible();
  });
});
