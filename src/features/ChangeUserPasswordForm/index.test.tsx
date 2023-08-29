import { render, screen, fireEvent, waitFor, renderHook } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ChangeUserPasswordForm from "./";
import { MockedFunction } from "vitest";
import { z } from "zod";

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
            // Required properties inferred from the error message:
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

        expect(screen.getByPlaceholderText("Old Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Re-enter Password")).toBeInTheDocument();
        expect(screen.getByText("Change Password")).toBeInTheDocument();
        expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });

    test("calls resetError when inputs are changed", () => {
        render(<ChangeUserPasswordForm />, { wrapper: Router });

        fireEvent.change(screen.getByPlaceholderText("Old Password"), { target: { value: "oldPassword" } });
        expect(mockResetError).toHaveBeenCalled();

        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "newPassword" } });
        expect(mockResetError).toHaveBeenCalledTimes(2);
    });

    test("submitting form calls changeUserPassword from useAuth", async () => {
        const { result } = renderHook(useAuth);
        render(<ChangeUserPasswordForm />, { wrapper: Router });

        const spyFn = vi.spyOn(result.current, "changeUserPassword");

        fireEvent.submit(screen.getByText("Change Password"));

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

        fireEvent.submit(screen.getByText("Change Password"));

        await waitFor(() => {
            expect(mockSetError).toHaveBeenCalled();
        });
    });
});
