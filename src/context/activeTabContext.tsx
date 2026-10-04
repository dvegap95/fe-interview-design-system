import { createContext, useContext, useMemo, useState } from "react";

export type ActiveTabContextType = {
  activeTab?: string;
  setActiveTab?: (activeTab: string) => void;
};

export type ActiveTabContextProviderProps = {
  children: React.ReactNode;
  /** Controlled active tab value. */
  activeTab?: string;
  /** Called when selection should change. */
  onActiveTabChange?: (activeTab: string) => void;
  /** Initial active tab for uncontrolled usage. */
  defaultActiveTab?: string;
};

export const ActiveTabContext = createContext<ActiveTabContextType | null>(null);

/** Reads active-tab state; returns `null` outside a provider. */
export function useActiveTabContext() {
  return useContext(ActiveTabContext);
}

/** Provides controlled or uncontrolled active-tab state for `Tab` / `TabPanel`. */
export function ActiveTabContextProvider(props: ActiveTabContextProviderProps) {
  const [activeTab, setActiveTab] = useState(props.defaultActiveTab ?? "");
  const contextValue = useMemo(
    () => ({
      activeTab: props.activeTab ?? activeTab ?? "",
      setActiveTab: props.onActiveTabChange ?? setActiveTab,
    }),
    [
      props.activeTab,
      props.onActiveTabChange,
      activeTab,
    ],
  );
  return (
    <ActiveTabContext.Provider value={contextValue}>{props.children}</ActiveTabContext.Provider>
  );
}
