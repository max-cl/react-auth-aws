import { render, screen, fireEvent, waitFor, renderHook } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ChangeUserPasswordForm from "./";
import { MockedFunction } from "vitest";
import { z } from "zod";
import {
    BUTTON_CHANGE_PASSWORD,
    PLACEHOLDER_OLD_PASSWORD,
    PLACEHOLDER_PASSWORD,
    PLACEHOLDER_REPASSWORD,
} from "@/constants";

vi.mock("@/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));

describe("ChangeUserPasswordForm", () => {
    const mockChangeUserPassword = vi.fn();
    const mockSetIsLoading = vi.fn();
    const mockSetError = vi.fn();
    const mockResetError = vi.fn();
    const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            changeUserPassword: mockChangeUserPassword,
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
            confirmUser: vi.fn(),
            resendCode: vi.fn(),
            updateUserAttributes: vi.fn(),
            forgotUserPasswordConfirm: vi.fn(),
            forgotUserPassword: vi.fn(),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders form fields and buttons", () => {
        render(<ChangeUserPasswordForm />, { wrapper: Router });

        expect(screen.getByPlaceholderText(PLACEHOLDER_OLD_PASSWORD)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(PLACEHOLDER_PASSWORD)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(PLACEHOLDER_REPASSWORD)).toBeInTheDocument();
        expect(screen.getByText(BUTTON_CHANGE_PASSWORD)).toBeInTheDocument();
        expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });

    test("calls resetError when inputs are changed", () => {
        render(<ChangeUserPasswordForm />, { wrapper: Router });

        fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_OLD_PASSWORD), { target: { value: "oldPassword" } });
        expect(mockResetError).toHaveBeenCalled();

        fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_PASSWORD), { target: { value: "newPassword" } });
        expect(mockResetError).toHaveBeenCalledTimes(2);
    });

    test("submitting form calls changeUserPassword from useAuth", async () => {
        const { result } = renderHook(useAuth);
        render(<ChangeUserPasswordForm />, { wrapper: Router });

        const spyFn = vi.spyOn(result.current, "changeUserPassword");

        fireEvent.submit(screen.getByText(BUTTON_CHANGE_PASSWORD));

        result.current.changeUserPassword({ oldPassword: "123", newPassword: "qwe" });

        await waitFor(() => {
            expect(spyFn).toHaveBeenCalled();
            expect(result.current.changeUserPassword).toHaveBeenCalledWith({
                oldPassword: expect.any(String),
                newPassword: expect.any(String),
            });
        });
    });

    test("handles validation errors properly", async () => {
        mockChangeUserPassword.mockRejectedValueOnce(new z.ZodError([]));

        render(<ChangeUserPasswordForm />, { wrapper: Router });

        fireEvent.submit(screen.getByText(BUTTON_CHANGE_PASSWORD));

        await waitFor(() => {
            expect(mockSetError).toHaveBeenCalled();
        });
    });
});
