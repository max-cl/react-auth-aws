import { render, screen, fireEvent, waitFor, renderHook } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import LoginForm from "./";
import { MockedFunction } from "vitest";
import { BUTTON_LOGIN, PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD } from "@/constants";

vi.mock("@/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));

describe("LoginForm", () => {
    const mockSignIn = vi.fn();
    const mockSetIsLoading = vi.fn();
    const mockSetError = vi.fn();
    const mockResetError = vi.fn();
    const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            signIn: mockSignIn,
            isLoading: false,
            setIsLoading: mockSetIsLoading,
            error: null,
            setError: mockSetError,
            resetError: mockResetError,
            userAttributes: { email: "test@example.com", given_name: "Name1", family_name: "LastName1" },
            isAuthenticated: false,
            signOut: vi.fn(),
            signUp: vi.fn(),
            confirmUser: vi.fn(),
            resendCode: vi.fn(),
            updateUserAttributes: vi.fn(),
            forgotUserPasswordConfirm: vi.fn(),
            forgotUserPassword: vi.fn(),
            changeUserPassword: vi.fn(),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders form fields and buttons", () => {
        render(<LoginForm />, { wrapper: Router });

        expect(screen.getByPlaceholderText(PLACEHOLDER_EMAIL)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(PLACEHOLDER_PASSWORD)).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    test("calls resetError when inputs are changed", () => {
        render(<LoginForm />, { wrapper: Router });

        fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_EMAIL), { target: { value: "test@example.com" } });
        expect(mockResetError).toHaveBeenCalled();

        fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_PASSWORD), { target: { value: "password" } });
        expect(mockResetError).toHaveBeenCalledTimes(2);
    });

    test("submitting form calls signIn from useAuth", async () => {
        const { result } = renderHook(useAuth);

        render(<LoginForm />, { wrapper: Router });

        const spyFn = vi.spyOn(result.current, "signIn");

        fireEvent.submit(screen.getByText(BUTTON_LOGIN));

        result.current.signIn({ email: "name@mail.com", password: "@asD123123" });

        await waitFor(() => {
            expect(spyFn).toHaveBeenCalledWith({
                email: expect.any(String),
                password: expect.any(String),
            });
        });
    });

    test("handles validation errors properly", async () => {
        mockSignIn.mockRejectedValueOnce(new z.ZodError([]));

        render(<LoginForm />, { wrapper: Router });

        fireEvent.submit(screen.getByText(BUTTON_LOGIN));

        await waitFor(() => {
            expect(mockSetError).toHaveBeenCalled();
        });
    });
});
