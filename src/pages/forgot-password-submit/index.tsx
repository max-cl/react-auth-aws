import { Navigate } from "react-router-dom";

import ForgotPasswordSubmitForm from "@/features/ForgotPasswordSubmitForm";
import ContainerPage from "@/components/common/ContainerPage";
import LinkBack from "@/components/LinkBack";
import { LINK_TO_FORGOT_PASSWORD, ROUTE_TO_FORGOT_PASSWORD, ROUTE_TO_HOME } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordSubmit() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTE_TO_HOME} replace />;
    }

    return (
        <ContainerPage>
            <div className="card w-96 px-4 py-4 shadow-md bg-black">
                <ForgotPasswordSubmitForm />
                <LinkBack to={ROUTE_TO_FORGOT_PASSWORD} linkText={LINK_TO_FORGOT_PASSWORD} />
            </div>
        </ContainerPage>
    );
}
