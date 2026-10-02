import Tab from "@/components/Tab/Tab";
import TabList from "../TabList";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('TabList', () => {
    it('should render', () => {
        render(<TabList>
            <Tab>Tab1</Tab>
            <Tab>Tab2</Tab>
        </TabList>);
        expect(screen.getByRole('tab', { name: 'Tab1' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Tab2' })).toBeInTheDocument();
    });

    describe('uncontrolled', () => {
        it('should render with default active tab', () => {
            render(<TabList defaultActiveTab="tab2">
                <Tab value="tab1">Tab1</Tab>
                <Tab value="tab2">Tab2</Tab>
                <Tab value="tab3">Tab3</Tab>
                <Tab value="tab4">Tab4</Tab>
            </TabList>)
            expect(screen.getByRole('tab', { name: 'Tab2' })).toBeSelected();
        })

        it('should handle tab selection uncontrolled', async() => {
            render(<TabList defaultActiveTab="tab2">
                <Tab value="tab1">Tab1</Tab>
                <Tab value="tab2">Tab2</Tab>
                <Tab value="tab3">Tab3</Tab>
                <Tab value="tab4">Tab4</Tab> 
            </TabList>)
            await userEvent.click(screen.getByRole('tab', { name: 'Tab3' }));
            
            expect(screen.getByRole('tab', { name: 'Tab3' })).toBeSelected();
            expect(screen.getByRole('tab', { name: 'Tab2' })).not.toBeSelected();
        })
    });
});
