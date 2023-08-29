import { render, screen } from "@testing-library/react";
import FullName from "./";

describe("FullName", () => {
    test("renders full name when both firstName and lastName are provided", () => {
        render(<FullName firstName="John" lastName="Doe" />);

        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    test("does not render when either firstName or lastName is missing", () => {
        render(<FullName firstName="John" />);
        expect(screen.queryByText("User: John")).not.toBeInTheDocument();

        render(<FullName lastName="Doe" />);
        expect(screen.queryByText("User: Doe")).not.toBeInTheDocument();
    });

    test("does not render when both firstName and lastName are missing", () => {
        const { container } = render(<FullName />);
        expect(container.firstChild).toBeNull();
    });
});
