import { Link } from "react-router-dom";

import { useCurrentPathName } from "@/hooks/useCurrentPathName";
import { ROUTE_TO_HOME, ROUTE_TO_PAGE_1, ROUTE_TO_PAGE_2, ROUTE_TO_PAGE_3 } from "@/constants";

export default function NavbarCenter() {
    const currentPathName = useCurrentPathName();
    return (
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal text-white font-thin tracking-widest uppercase">
                <li className={`${currentPathName === ROUTE_TO_HOME ? "border-b" : ""}`}>
                    <Link to={ROUTE_TO_HOME}>Home</Link>
                </li>
                <li className={`${currentPathName === ROUTE_TO_PAGE_1 ? "border-b" : ""}`}>
                    <Link to={ROUTE_TO_PAGE_1}>Page 1</Link>
                </li>
                <li className={`${currentPathName === ROUTE_TO_PAGE_2 ? "border-b" : ""}`}>
                    <Link to={ROUTE_TO_PAGE_2}>Page 2</Link>
                </li>
                <li className={`${currentPathName === ROUTE_TO_PAGE_3 ? "border-b" : ""}`}>
                    <Link to={ROUTE_TO_PAGE_3}>Page 3</Link>
                </li>
            </ul>
        </div>
    );
}
