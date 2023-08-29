import { render, screen, fireEvent } from "@testing-library/react";
import UserProfileForm from "./";
import { useAuth } from "@/hooks/useAuth";
import { MockedFunction } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { BUTTON_UPDATE_USER_ATTRIBUTES } from "@/constants";

vi.mock("@/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));
vi.mock("react-hot-toast");

describe("UserProfileForm", () => {
    const mockUpdateUserAttributes = vi.fn();
    const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            updateUserAttributes: mockUpdateUserAttributes,
            forgotUserPasswordConfirm: vi.fn(),
            isLoading: false,
            setIsLoading: vi.fn(),
            error: null,
            setError: vi.fn(),
            resetError: vi.fn(),
            userAttributes: { email: "Email address", given_name: "Jane", family_name: "Doe" },
            isAuthenticated: false,
            signIn: vi.fn(),
            signOut: vi.fn(),
            signUp: vi.fn(),
            forgotUserPassword: vi.fn(),
            changeUserPassword: vi.fn(),
            confirmUser: vi.fn(),
            resendCode: vi.fn(),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders UserProfileForm correctly with pre-populated values", () => {
        render(<UserProfileForm />, { wrapper: BrowserRouter });

        expect(screen.getByRole("badge")).toBeInTheDocument();
        expect(screen.getByText("Email address")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Jane")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    });

    test("handles user profile updates", async () => {
        render(<UserProfileForm />, { wrapper: BrowserRouter });

        const firstNameInput = screen.getByDisplayValue("Jane");
        const lastNameInput = screen.getByDisplayValue("Doe");
        const updateButton = screen.getByText(BUTTON_UPDATE_USER_ATTRIBUTES);

        fireEvent.change(firstNameInput, { target: { value: "Janet" } });
        fireEvent.change(lastNameInput, { target: { value: "Dow" } });

        fireEvent.click(updateButton);

        expect(mockUpdateUserAttributes).toHaveBeenCalledWith({
            given_name: "Janet",
            family_name: "Dow",
        });
    });
});
