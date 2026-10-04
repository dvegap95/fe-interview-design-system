import { SizeProvider, useResolvedSize } from "@/context/sizeContext";
import { useResolvedTabVariant } from "@/context/tabVariantContext";
import cn from "@/utils/cn";
import styles from "./Tab.module.scss";
import type { TabProps } from "./types";
import useTab from "./useTab";

/** Single tab control for use inside `Tabs` / `ManagedTabs`. */
export default function Tab({
  children,
  size: sizeProp,
  variant: variantProp,
  selected = false,
  id,
  value,
  slots,
  ...props
}: TabProps) {
  const { isSelected, handleClick, tabIndex } = useTab({
    selected,
    value,
  });
  const variant = useResolvedTabVariant(variantProp);
  const size = useResolvedSize(sizeProp);
  return (
    <button
      role="tab"
      id={id}
      aria-selected={isSelected ? "true" : "false"}
      onClick={handleClick}
      {...props}
      tabIndex={tabIndex}
      className={cn(styles.tab, props.className)}
      data-variant={variant}
      data-size={size}
    >
      <SizeProvider size={size}>
        {children}
        {slots?.end && <span className={styles.endSlot}>{slots.end}</span>}
      </SizeProvider>
    </button>
  );
}
