import { createContext, useContext, useMemo, useState } from "react";

export type ActiveTabContextType = {
  activeTab?: string;
  setActiveTab?: (activeTab: string) => void;
};

export type ActiveTabContextProviderProps = {
  children: React.ReactNode;
  activeTab?: string;
  onActiveTabChange?: (activeTab: string) => void;
  defaultActiveTab?: string;
};

export const ActiveTabContext = createContext<ActiveTabContextType | null>(null);

export function useActiveTabContext() {
  return useContext(ActiveTabContext);
}

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
