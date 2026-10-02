import Tab from "../Tab";
import { render, screen } from "@testing-library/react";
import styles from '../Tab.module.scss';

describe('Tab', () => {
    it('should render', () => {
        render(<Tab>Tab Text</Tab>);
        const tab = screen.getByRole('tab');
        expect(tab).toBeInTheDocument();
        expect(tab).toHaveTextContent('Tab Text');
    });
    it.each(['pill', 'outline'])('should render with variant %s', (variant) => {
        render(<Tab variant={variant as 'pill' | 'outline'}>Tab Text</Tab>);
        const tab = screen.getByRole('tab');
        expect(tab).toHaveClass(styles[variant]);
    });
    it('should default to pill md not selected', () => {
        render(<Tab>Tab Text</Tab>);
        const tab = screen.getByRole('tab');
        expect(tab).toHaveClass(styles.pill);
        expect(tab).not.toBeSelected();
    });
    it('should be selected and render with selected styles if selected is true', () => {
        render(<Tab selected>Tab Text</Tab>);
        const tab = screen.getByRole('tab');
        expect(tab).toHaveClass(styles.selected);
        expect(tab).toBeSelected();
    });
});