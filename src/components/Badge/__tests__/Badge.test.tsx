import { render, screen } from "@testing-library/react";
import Badge from "../Badge";

describe('Badge', () => {
    it('should render', () => {
        render(<Badge>Badge Text</Badge>);
        expect(screen.getByText('Badge Text')).toBeInTheDocument();
    });
});
