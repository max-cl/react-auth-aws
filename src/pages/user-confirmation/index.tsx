import { Navigate } from "react-router-dom";

import ConfirmationUserForm from "@/features/ConfirmationUserForm";
import ContainerPage from "@/components/common/ContainerPage";
import LinkBack from "@/components/LinkBack";
import { LINK_TO_LOGIN, ROUTE_TO_HOME, ROUTE_TO_LOGIN } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

export default function ConfirmationUser() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTE_TO_HOME} replace />;
    }

    return (
        <ContainerPage>
            <div className="card w-96 px-4 py-4 shadow-md bg-black">
                <ConfirmationUserForm />
                <LinkBack to={ROUTE_TO_LOGIN} linkText={LINK_TO_LOGIN} />
            </div>
        </ContainerPage>
    );
}
