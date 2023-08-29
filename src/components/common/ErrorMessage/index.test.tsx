import { render, screen } from "@testing-library/react";
import ErrorMessage from "./";

describe("ErrorMessage", () => {
    test("renders error message when provided", () => {
        render(<ErrorMessage message="Something went wrong" />);
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    test("does not render any element when message is null", () => {
        const { container } = render(<ErrorMessage message={null} />);
        expect(container.firstChild).toBeNull();
    });
});
