import { Link } from "react-router-dom";

import Logo from "@/components/Logo";
import { ROUTE_TO_HOME, ROUTE_TO_LOGIN } from "@/constants";

interface Props {
    isAuthenticated: boolean;
}

export default function NavbarStart({ isAuthenticated }: Props) {
    return (
        <div className="navbar-start space-x-4">
            <Link to={isAuthenticated ? ROUTE_TO_HOME : ROUTE_TO_LOGIN}>
                <Logo />
            </Link>
        </div>
    );
}
