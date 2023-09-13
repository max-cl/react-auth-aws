import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { ROUTE_TO_LOGIN, SUCCESS_SIGNOUT } from "@/constants";

import NavbarStart from "./components/NavbarStart";
import NavbarCenter from "./components/NavbarCenter";
import NavbarEnd from "./components/NavbarEnd";

export default function NavigationBar() {
    const { signOut, isLoading, setIsLoading, userAttributes, isAuthenticated, setError } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        setIsLoading(true);

        try {
            await signOut();
            toast.success(SUCCESS_SIGNOUT);
            navigate(ROUTE_TO_LOGIN);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
        }
        setIsLoading(false);
    }

    return (
        <div className="bg-black navbar">
            <NavbarStart isAuthenticated={isAuthenticated} />

            {isAuthenticated ? (
                <>
                    <NavbarCenter />
                    <NavbarEnd
                        handleLogout={handleLogout}
                        isLoading={isLoading}
                        firstName={userAttributes?.given_name}
                        lastName={userAttributes?.family_name}
                    />
                </>
            ) : null}
        </div>
    );
}
