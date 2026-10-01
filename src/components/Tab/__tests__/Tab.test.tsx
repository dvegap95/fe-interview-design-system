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
    it('should render with variant pill', () => {
        render(<Tab variant="pill">Tab Text</Tab>);
        const tab = screen.getByRole('tab');
        expect(tab).toBeInTheDocument();
        expect(tab).toHaveTextContent('Tab Text');
        expect(tab).toHaveClass(styles.pill);
    });
});