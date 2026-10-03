import { cn } from "@/lib/utils";
import styles from "./TabPanel.module.scss";
import type { TabPanelProps } from "./types";
import useTabPanel from "./useTabPanel";

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
