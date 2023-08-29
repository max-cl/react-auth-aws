import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./";

describe("Form", () => {
    test("renders children inside the form", () => {
        render(
            <Form onSubmit={async () => {}}>
                <div data-testid="child-div">Child Content</div>
            </Form>
        );

        expect(screen.getByTestId("child-div")).toBeInTheDocument();
    });

    test("triggers onSubmit when form is submitted", async () => {
        const mockOnSubmit = vi.fn();
        render(
            <Form onSubmit={mockOnSubmit}>
                <button type="submit">Submit</button>
            </Form>
        );

        fireEvent.submit(screen.getByText("Submit"));
        expect(mockOnSubmit).toHaveBeenCalled();
    });

    test("applies custom CSS class if provided", () => {
        render(
            <Form onSubmit={async () => {}} cssCustom="custom-css-class">
                <button type="submit">Submit</button>
            </Form>
        );

        expect(screen.getByRole("form")).toHaveClass("custom-css-class");
    });
});
