import { Navigate } from "react-router-dom";

import ForgotPasswordForm from "@/features/ForgotPasswordForm";
import ContainerPage from "@/components/common/ContainerPage";
import LinkBack from "@/components/LinkBack";
import { LINK_TO_LOGIN, ROUTE_TO_HOME, ROUTE_TO_LOGIN } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPassword() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTE_TO_HOME} replace />;
    }

    return (
        <ContainerPage>
            <div className="card w-96 px-4 py-4 shadow-md bg-black">
                <ForgotPasswordForm />
                <LinkBack to={ROUTE_TO_LOGIN} linkText={LINK_TO_LOGIN} />
            </div>
        </ContainerPage>
    );
}
