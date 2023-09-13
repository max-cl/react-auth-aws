import { Link } from "react-router-dom";

import { useCurrentPathName } from "@/hooks/useCurrentPathName";
import { ROUTE_TO_HOME, ROUTE_TO_PAGE_1, ROUTE_TO_PAGE_2, ROUTE_TO_PAGE_3 } from "@/constants";

const Menu = () => {
    const currentPathName = useCurrentPathName();

    return (
        <ul className="flex flex-col items-center justify-center w-full h-screen tracking-widest text-white uppercase lg:font-thin lg:h-auto lg:w-auto lg:menu-horizontal lg:space-x-8">
            <li
                className={`${
                    currentPathName === ROUTE_TO_HOME ? "font-bold lg:font-thin lg:border-b" : ""
                } py-8 flex justify-center lg:py-0 lg:block`}
            >
                <Link to={ROUTE_TO_HOME}>Home</Link>
            </li>
            <li
                className={`${
                    currentPathName === ROUTE_TO_PAGE_1 ? "font-bold lg:font-thin lg:border-b" : ""
                } py-8 flex justify-center lg:py-0 lg:block`}
            >
                <Link to={ROUTE_TO_PAGE_1}>Page 1</Link>
            </li>
            <li
                className={`${
                    currentPathName === ROUTE_TO_PAGE_2 ? "font-bold lg:font-thin lg:border-b" : ""
                } py-8 flex justify-center lg:py-0 lg:block`}
            >
                <Link to={ROUTE_TO_PAGE_2}>Page 2</Link>
            </li>
            <li
                className={`${
                    currentPathName === ROUTE_TO_PAGE_3 ? "font-bold lg:font-thin lg:border-b" : ""
                } py-8 flex justify-center lg:py-0 lg:block`}
            >
                <Link to={ROUTE_TO_PAGE_3}>Page 3</Link>
            </li>
        </ul>
    );
};

export default Menu;
