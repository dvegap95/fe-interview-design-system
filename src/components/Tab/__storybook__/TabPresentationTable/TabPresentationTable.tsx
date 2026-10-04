import { cn } from "@/lib/utils";
import Tab from "../../Tab";
import type { TabProps } from "../../types";
import styles from "./TabPresentationTable.module.scss";

const STATES = ["default", "hover", "active", "focus"] as const;

const COLUMNS = [
  { columnId: "selected-pill", selected: true, variant: "pill" },
  { columnId: "default-pill", selected: false, variant: "pill" },
  { columnId: "selected-underline", selected: true, variant: "underline" },
  { columnId: "default-underline", selected: false, variant: "underline" },
] as const;

export default function TabPresentationTable(props: Partial<TabProps>) {
  return (
    <div
      className={cn(
        styles.tabPresentationTable,
        props.size && styles[`size-${props.size}`],
      )}
    >
      {STATES.map((state) =>
        COLUMNS.map(({ columnId, selected, variant }) => (
          <div key={`${columnId}-${state}`} className={styles.cell}>
            <Tab
              {...props}
              id={`${columnId}-${state}`}
              selected={selected}
              variant={variant}
            >
              Label
            </Tab>
          </div>
        )),
      )}
    </div>
  );
}
