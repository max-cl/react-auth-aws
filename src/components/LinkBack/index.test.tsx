import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LinkBack from "./";
import { Mock } from "vitest";

// Mock the useAuth hook
vi.mock("@/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));

describe("LinkBack", () => {
    const mockResetError = vi.fn();

    beforeEach(() => {
        (useAuth as Mock).mockReturnValue({
            resetError: mockResetError,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders link with provided text and to prop", () => {
        render(
            <BrowserRouter>
                <LinkBack to="/home" linkText="Go Home" />
            </BrowserRouter>
        );

        const link = screen.getByText("Go Home");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/home");
    });

    test("calls resetError from useAuth when link is clicked", () => {
        render(
            <BrowserRouter>
                <LinkBack to="/home" linkText="Go Home" />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("Go Home"));
        expect(mockResetError).toHaveBeenCalled();
    });
});
