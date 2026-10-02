import { cn } from "@/lib/utils";
import styles from "./Tab.module.scss";
import type { TabProps } from "./types";
import useTab from "./useTab";

export default function Tab({
  children,
  variant,
  selected = false,
  size,
  id,
  value,
  slots,
  ...props
}: TabProps) {
  const { isSelected, handleClick, computedVariant, computedSize } = useTab({
    selected,
    value,
    variant,
    size,
  });
  const className = cn(
    props.className,
    styles.tab,
    isSelected && styles.selected,
    styles[`variant-${computedVariant}`],
    styles[`size-${computedSize}`],
  );
  return (
    <button
      role="tab"
      tabIndex={0}
      id={id}
      aria-selected={isSelected ? "true" : "false"}
      onClick={handleClick}
      {...props}
      className={className}
    >
      {children}
      {slots?.end && <span className={styles.endSlot}>{slots.end}</span>}
    </button>
  );
}
