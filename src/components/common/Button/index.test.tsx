import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./";

describe("Button", () => {
    test("renders button with provided text", () => {
        render(<Button isLoading={false} btnText="Click me" />);
        expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    test("renders loading state when isLoading is true", () => {
        render(<Button isLoading={true} btnText="Click me" />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("sets button type to submit by default", () => {
        render(<Button isLoading={false} btnText="Click me" />);
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    test("sets button type to button when specified", () => {
        render(<Button isLoading={false} btnText="Click me" type="button" />);
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    test("button should be disabled when isLoading is true", () => {
        render(<Button isLoading={true} btnText="Click me" />);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    test("button should trigger onClick when clicked", async () => {
        const mockOnClick = vi.fn();
        render(<Button isLoading={false} btnText="Click me" onClick={mockOnClick} />);
        fireEvent.click(screen.getByRole("button"));
        expect(mockOnClick).toHaveBeenCalled();
    });
});
