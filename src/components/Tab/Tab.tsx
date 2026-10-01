import { TabProps } from "./types";
import { useTab } from "./useTab";
import { cn } from "@/lib/utils";

import styles from './Tab.module.scss';

export default function Tab(
    { children, variant = 'pill', selected = false }: TabProps
) {
    const { isSelected } = useTab({ variant, selected });
    const className = cn(styles.tab, styles[variant], isSelected && styles.selected);
    return <div role="tab" className={className} tabIndex={0}>{children}</div>;
};