import { render, screen } from "@testing-library/react";
import Badge from ".";

describe("Badge", () => {
    test("renders badge with provided text", () => {
        render(<Badge badgeText="Example Badge" />);
        expect(screen.getByText("Example Badge")).toBeInTheDocument();
    });
});
