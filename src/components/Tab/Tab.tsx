import { TabProps } from "./types";
import useTab from "./useTab";
import { cn } from "@/lib/utils";

import styles from './Tab.module.scss';

export default function Tab(
    { children, variant = 'pill', selected = false, size = 'md', id, ...props }: TabProps
) {
    const { isSelected } = useTab({ variant, selected });
    const className = cn(props.className, styles.tab, styles[variant], isSelected && styles.selected, styles[`size-${size}`]);
    return <div role="tab" className={className} tabIndex={0} id={id}>{children}</div>;
};