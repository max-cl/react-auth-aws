import { render, screen, fireEvent, waitFor, renderHook } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { MockedFunction } from "vitest";
import {
    BUTTON_FORGOT_PASSWORD_CONFIRM,
    PLACEHOLDER_CONFIRMATION_CODE,
    PLACEHOLDER_NEW_PASSWORD,
    PLACEHOLDER_NEW_REPASSWORD,
} from "@/constants";
import ForgotPasswordSubmitForm from "./";

vi.mock("@/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));

describe("ForgotPasswordSubmitForm", () => {
    const mockForgotUserPasswordConfirm = vi.fn();
    const mockSetIsLoading = vi.fn();
    const mockSetError = vi.fn();
    const mockResetError = vi.fn();
    const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            forgotUserPasswordConfirm: mockForgotUserPasswordConfirm,
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
            forgotUserPassword: vi.fn(),
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
                <ForgotPasswordSubmitForm />
            </Router>
        );

        expect(screen.getByPlaceholderText(PLACEHOLDER_NEW_PASSWORD)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(PLACEHOLDER_NEW_REPASSWORD)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(PLACEHOLDER_CONFIRMATION_CODE)).toBeInTheDocument();
        expect(screen.getByText(BUTTON_FORGOT_PASSWORD_CONFIRM)).toBeInTheDocument();
    });

    test("calls resetError when input is changed", () => {
        render(
            <Router>
                <ForgotPasswordSubmitForm />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_NEW_PASSWORD), { target: { value: "123@Asdf" } });
        fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_NEW_REPASSWORD), { target: { value: "123@Asdh" } });
        fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_CONFIRMATION_CODE), { target: { value: "123456" } });
        expect(mockResetError).toHaveBeenCalled();
    });

    test("submitting form calls forgotUserPasswordConfirm from useAuth", async () => {
        const { result } = renderHook(useAuth);

        render(
            <Router>
                <ForgotPasswordSubmitForm />
            </Router>
        );

        const spyFn = vi.spyOn(result.current, "forgotUserPasswordConfirm");

        fireEvent.submit(screen.getByText(BUTTON_FORGOT_PASSWORD_CONFIRM));

        result.current.forgotUserPasswordConfirm({ email: "name@mail.com", code: "123456", password: "123@Asdh" });

        await waitFor(() => {
            expect(spyFn).toHaveBeenCalledWith({
                email: expect.any(String),
                code: expect.any(String),
                password: expect.any(String),
            });
        });
    });

    test("handles validation errors properly", async () => {
        const { result } = renderHook(useAuth);
        const spyFn = vi.spyOn(result.current, "forgotUserPasswordConfirm");
        const spyFnError = vi.spyOn(result.current, "setError");

        render(<ForgotPasswordSubmitForm />, { wrapper: Router });

        fireEvent.submit(screen.getByText(BUTTON_FORGOT_PASSWORD_CONFIRM));

        result.current.forgotUserPasswordConfirm({ email: "name@mail.com", code: "123456", password: "123@Asdh" });
        result.current.setError(mockForgotUserPasswordConfirm.mockRejectedValueOnce(new z.ZodError([])));

        await waitFor(() => {
            expect(spyFn).toHaveBeenCalled();
            expect(spyFnError).toHaveBeenCalled();
        });
    });
});
