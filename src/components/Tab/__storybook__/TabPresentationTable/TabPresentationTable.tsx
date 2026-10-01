import Tab from "../../Tab";
import { TabProps } from "../../types";
import styles from './TabPresentationTable.module.scss';

type TabPresentationColumnProps = Partial<TabProps> & {
    columnId: string;
    columnName: string;
}


function TabPresentationColumn(props: TabPresentationColumnProps) {
    return (
        <div className={styles.tabPresentationColumn}>
            <div className={styles.headerName}>{props.columnName}</div>
            <Tab {...props} id={`${props.columnId}-default`}>
                Label
            </Tab>
            <Tab {...props} id={`${props.columnId}-hover`}>Label</Tab>
            <Tab {...props} id={`${props.columnId}-active`}>Label</Tab>
            <Tab {...props} id={`${props.columnId}-focus`}>Label</Tab>
        </div>
    )
}

export default function TabPresentationTable(props: Partial<TabProps>) {
    return (
        <div className={styles.tabPresentationTable}>
            <div className={styles.tabPresentationColumn}>
                <div> </div>
                <div>Default</div>
                <div>Hover</div>
                <div>Active</div>
                <div>Focus</div>
            </div>
            <TabPresentationColumn columnId="selected-pill" columnName="Pill Selected" {...props} selected={true} variant="pill" />
            <TabPresentationColumn columnId="default-pill" columnName="Pill" {...props} selected={false} variant="pill" />
            <TabPresentationColumn columnId="selected-outline" columnName="Outline Selected" {...props} selected={true} variant="outline" />
            <TabPresentationColumn columnId="default-outline" columnName="Outline" {...props} selected={false} variant="outline" />
        </div>
    )
}