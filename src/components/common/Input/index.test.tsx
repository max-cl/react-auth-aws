import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./";

describe("Input", () => {
    test("renders input with provided placeholder", () => {
        render(<Input placeholder="Enter your name" name="username" onChange={() => {}} />);
        expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    });

    test("sets input type to text by default", () => {
        render(<Input placeholder="Enter your name" name="username" onChange={() => {}} />);
        expect(screen.getByPlaceholderText("Enter your name")).toHaveAttribute("type", "text");
    });

    test("sets input type to password when specified", () => {
        render(<Input placeholder="Enter your password" type="password" name="password" onChange={() => {}} />);
        expect(screen.getByPlaceholderText("Enter your password")).toHaveAttribute("type", "password");
    });

    test("input should be disabled when isDisabled is true", () => {
        render(<Input placeholder="Enter your name" name="username" isDisabled={true} onChange={() => {}} />);
        expect(screen.getByPlaceholderText("Enter your name")).toBeDisabled();
    });

    test("triggers onChange when value changes", () => {
        const mockOnChange = vi.fn();
        render(<Input placeholder="Enter your name" name="username" onChange={mockOnChange} />);

        fireEvent.change(screen.getByPlaceholderText("Enter your name"), { target: { value: "New Value" } });
        expect(mockOnChange).toHaveBeenCalled();
    });

    test("sets default value when provided", () => {
        render(<Input placeholder="Enter your name" name="username" onChange={() => {}} defaultValue="Default Name" />);

        expect(screen.getByPlaceholderText("Enter your name")).toHaveValue("Default Name");
    });
});
