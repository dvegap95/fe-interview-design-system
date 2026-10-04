import cn from "@/utils/cn";
import styles from "./TabPanel.module.scss";
import type { TabPanelProps } from "./types";
import useTabPanel from "./useTabPanel";

/** Panel shown when `value` matches the active tab; render under `ActiveTabContextProvider`. */
export default function TabPanel({ children, value, ...props }: TabPanelProps) {
  const { isSelected } = useTabPanel({
    value,
  });
  const className = cn(props.className, styles.tabPanel);
  return (
    <section
      role="tabpanel"
      hidden={!isSelected}
      {...props}
      className={className}
    >
      {children}
    </section>
  );
}
