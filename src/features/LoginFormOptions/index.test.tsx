import { render, screen, fireEvent } from "@testing-library/react";
import LoginFormOptions from "./";
import { useAuth } from "@/hooks/useAuth";
import { MockedFunction } from "vitest";
import { BUTTON_LOGIN, BUTTON_SIGNUP } from "@/constants";

vi.mock("@/hooks/useAuth", () => ({
    useAuth: vi.fn(),
}));

describe("LoginFormOptions", () => {
    const mockResetError = vi.fn();
    const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            forgotUserPasswordConfirm: vi.fn(),
            isLoading: false,
            setIsLoading: vi.fn(),
            error: null,
            setError: vi.fn(),
            resetError: mockResetError,
            userAttributes: { email: "test@example.com", given_name: "Name1", family_name: "LastName1" },
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

    test("renders options correctly", () => {
        render(<LoginFormOptions isLoginForm={true} setIsLoginForm={vi.fn()} />);

        expect(screen.getByText(BUTTON_LOGIN)).toBeInTheDocument();
        expect(screen.getByText(BUTTON_SIGNUP)).toBeInTheDocument();
    });

    test("switches to login form on clicking Login button", () => {
        const setIsLoginFormMock = vi.fn();
        render(<LoginFormOptions isLoginForm={false} setIsLoginForm={setIsLoginFormMock} />);

        fireEvent.click(screen.getByText(BUTTON_LOGIN));

        expect(mockResetError).toHaveBeenCalled();
        expect(setIsLoginFormMock).toHaveBeenCalledWith(true);
    });

    test("switches to sign up form on clicking Sign Up button", () => {
        const setIsLoginFormMock = vi.fn();
        render(<LoginFormOptions isLoginForm={true} setIsLoginForm={setIsLoginFormMock} />);

        fireEvent.click(screen.getByText(BUTTON_SIGNUP));

        expect(mockResetError).toHaveBeenCalled();
        expect(setIsLoginFormMock).toHaveBeenCalledWith(false);
    });
});
