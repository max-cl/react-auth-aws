import { render, screen, fireEvent, waitFor, renderHook } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { MockedFunction } from "vitest";
import { BUTTON_FORGOT_PASSWORD, PLACEHOLDER_EMAIL } from "@/constants";
import ForgotPasswordForm from "./";

vi.mock("@/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));

describe("ForgotPasswordForm", () => {
    const mockForgotUserPassword = vi.fn();
    const mockSetIsLoading = vi.fn();
    const mockSetError = vi.fn();
    const mockResetError = vi.fn();
    const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            forgotUserPassword: mockForgotUserPassword,
            isLoading: false,
            setIsLoading: mockSetIsLoading,
            error: null,
            setError: mockSetError,
            resetError: mockResetError,
            userAttributes: { email: "test@example.com", given_name: "Name1", family_name: "LastName1" },
            // Required properties inferred from the error message:
            isAuthenticated: false,
            signIn: vi.fn(),
            signOut: vi.fn(),
            signUp: vi.fn(),
            updateUserAttributes: vi.fn(),
            forgotUserPasswordConfirm: vi.fn(),
            changeUserPassword: vi.fn(),
            confirmUser: vi.fn(),
            resendCode: vi.fn(),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders form fields and buttons", () => {
        render(
            <Router>
                <ForgotPasswordForm />
            </Router>
        );

        expect(screen.getByPlaceholderText(PLACEHOLDER_EMAIL)).toBeInTheDocument();
        expect(screen.getByText(BUTTON_FORGOT_PASSWORD)).toBeInTheDocument();
    });

    test("calls resetError when input is changed", () => {
        render(
            <Router>
                <ForgotPasswordForm />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_EMAIL), { target: { value: "name@mail.com" } });
        expect(mockResetError).toHaveBeenCalled();
    });

    test("submitting form calls forgotUserPassword from useAuth", async () => {
        const { result } = renderHook(useAuth);

        render(
            <Router>
                <ForgotPasswordForm />
            </Router>
        );

        const spyFn = vi.spyOn(result.current, "forgotUserPassword");

        fireEvent.submit(screen.getByText(BUTTON_FORGOT_PASSWORD));

        result.current.forgotUserPassword({ email: "name@mail.com" });

        await waitFor(() => {
            expect(spyFn).toHaveBeenCalledWith({
                email: expect.any(String),
            });
        });
    });

    test("handles validation errors properly", async () => {
        const { result } = renderHook(useAuth);
        const spyFn = vi.spyOn(result.current, "forgotUserPassword");
        const spyFnError = vi.spyOn(result.current, "setError");

        render(<ForgotPasswordForm />, { wrapper: Router });

        fireEvent.submit(screen.getByText(BUTTON_FORGOT_PASSWORD));

        result.current.forgotUserPassword({ email: "name" });
        result.current.setError(mockForgotUserPassword.mockRejectedValueOnce(new z.ZodError([])));

        await waitFor(() => {
            expect(spyFn).toHaveBeenCalled();
            expect(spyFnError).toHaveBeenCalled();
        });
    });
});
