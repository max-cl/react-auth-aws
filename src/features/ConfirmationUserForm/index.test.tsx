import { render, screen, fireEvent, waitFor, renderHook } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import ConfirmationUserForm from "./";
import { MockedFunction } from "vitest";
import { BUTTON_CONFIRM_USER, BUTTON_RESEND_CODE, PLACEHOLDER_CONFIRMATION_CODE } from "@/constants";

vi.mock("@/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));

describe("ConfirmationUserForm", () => {
    const mockConfirmUser = vi.fn();
    const mockResendCode = vi.fn();
    const mockSetIsLoading = vi.fn();
    const mockSetError = vi.fn();
    const mockResetError = vi.fn();
    const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            confirmUser: mockConfirmUser,
            resendCode: mockResendCode,
            isLoading: false,
            setIsLoading: mockSetIsLoading,
            error: null,
            setError: mockSetError,
            resetError: mockResetError,
            userAttributes: { email: "test@example.com", given_name: "Name1", family_name: "LastName1" },
            isAuthenticated: false,
            signIn: vi.fn(),
            signOut: vi.fn(),
            signUp: vi.fn(),
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
        render(
            <Router>
                <ConfirmationUserForm />
            </Router>
        );

        expect(screen.getByPlaceholderText(PLACEHOLDER_CONFIRMATION_CODE)).toBeInTheDocument();
        expect(screen.getByText(BUTTON_CONFIRM_USER)).toBeInTheDocument();
        expect(screen.getByText(BUTTON_RESEND_CODE)).toBeInTheDocument();
    });

    test("calls resetError when input is changed", () => {
        render(
            <Router>
                <ConfirmationUserForm />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_CONFIRMATION_CODE), { target: { value: "123456" } });
        expect(mockResetError).toHaveBeenCalled();
    });

    test("submitting form calls confirmUser from useAuth", async () => {
        const { result } = renderHook(useAuth);

        render(
            <Router>
                <ConfirmationUserForm />
            </Router>
        );

        const spyFn = vi.spyOn(result.current, "confirmUser");

        fireEvent.submit(screen.getByText(BUTTON_CONFIRM_USER));

        result.current.confirmUser({ email: "name@mail.com", code: "123456" });

        await waitFor(() => {
            expect(spyFn).toHaveBeenCalledWith({
                email: expect.any(String),
                code: "123456",
            });
        });
    });

    test("clicking resend button calls resendCode from useAuth", async () => {
        const { result } = renderHook(useAuth);

        render(
            <Router>
                <ConfirmationUserForm />
            </Router>
        );

        const spyFn = vi.spyOn(result.current, "resendCode");

        fireEvent.click(screen.getByText(BUTTON_RESEND_CODE));

        result.current.resendCode({ email: "name@mail.com" });

        await waitFor(() => {
            expect(spyFn).toHaveBeenCalledWith({
                email: expect.any(String),
            });
        });
    });

    test("handles validation errors properly", async () => {
        const { result } = renderHook(useAuth);
        const spyFn = vi.spyOn(result.current, "confirmUser");
        const spyFnError = vi.spyOn(result.current, "setError");

        render(<ConfirmationUserForm />, { wrapper: Router });

        fireEvent.submit(screen.getByText(BUTTON_CONFIRM_USER));

        result.current.confirmUser({ email: "name", code: "123" });
        result.current.setError(mockConfirmUser.mockRejectedValueOnce(new z.ZodError([])));

        mockConfirmUser.mockRejectedValueOnce(new z.ZodError([]));

        await waitFor(() => {
            expect(spyFn).toHaveBeenCalled();
            expect(spyFnError).toHaveBeenCalled();
        });
    });
});
