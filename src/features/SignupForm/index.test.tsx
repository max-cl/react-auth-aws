import { render, screen, fireEvent } from "@testing-library/react";
import SignupForm from "./";
import { useAuth } from "@/hooks/useAuth";
import { MockedFunction } from "vitest";
import {
    BUTTON_SIGNUP,
    PLACEHOLDER_EMAIL,
    PLACEHOLDER_FIRSTNAME,
    PLACEHOLDER_LASTNAME,
    PLACEHOLDER_PASSWORD,
    PLACEHOLDER_REPASSWORD,
} from "@/constants";

// Mocking the required modules
vi.mock("@/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));
vi.mock("react-hot-toast");

describe("SignupForm", () => {
    const mockSignUp = vi.fn();
    const mockSetIsLoginForm = vi.fn();
    const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            signUp: mockSignUp,
            forgotUserPasswordConfirm: vi.fn(),
            isLoading: false,
            setIsLoading: vi.fn(),
            error: null,
            setError: vi.fn(),
            resetError: vi.fn(),
            userAttributes: { email: "test@example.com", given_name: "Name1", family_name: "LastName1" },
            isAuthenticated: false,
            signIn: vi.fn(),
            signOut: vi.fn(),
            updateUserAttributes: vi.fn(),
            forgotUserPassword: vi.fn(),
            changeUserPassword: vi.fn(),
            confirmUser: vi.fn(),
            resendCode: vi.fn(),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders signup form correctly", () => {
        render(<SignupForm setIsLoginForm={mockSetIsLoginForm} />);

        expect(screen.getByPlaceholderText(PLACEHOLDER_FIRSTNAME)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(PLACEHOLDER_LASTNAME)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(PLACEHOLDER_EMAIL)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(PLACEHOLDER_PASSWORD)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(PLACEHOLDER_REPASSWORD)).toBeInTheDocument();
    });

    test("handles signup action", async () => {
        render(<SignupForm setIsLoginForm={mockSetIsLoginForm} />);

        const firstNameInput = screen.getByPlaceholderText(PLACEHOLDER_FIRSTNAME);
        const lastNameInput = screen.getByPlaceholderText(PLACEHOLDER_LASTNAME);
        const emailInput = screen.getByPlaceholderText(PLACEHOLDER_EMAIL);
        const passwordInput = screen.getByPlaceholderText(PLACEHOLDER_PASSWORD);
        const confirmPasswordInput = screen.getByPlaceholderText(PLACEHOLDER_REPASSWORD);
        const signupButton = screen.getByText(BUTTON_SIGNUP);

        // Simulating user input
        fireEvent.change(firstNameInput, { target: { value: "John" } });
        fireEvent.change(lastNameInput, { target: { value: "Doe" } });
        fireEvent.change(emailInput, { target: { value: "john@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "P@ssword123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "P@ssword123" } });

        fireEvent.click(signupButton);

        expect(mockSignUp).toHaveBeenCalledWith({
            given_name: "John",
            family_name: "Doe",
            email: "john@example.com",
            password: "P@ssword123",
        });
    });
});
