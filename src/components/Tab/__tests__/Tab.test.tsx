import Tab from "../Tab";
import { render, screen } from "@testing-library/react";

describe('Tab', () => {
    it('should render', () => {
        render(<Tab>Tab Text</Tab>);
        const tab = screen.getByRole('tab');
        expect(tab).toBeInTheDocument();
        expect(tab).toHaveTextContent('Tab Text');
    });
});