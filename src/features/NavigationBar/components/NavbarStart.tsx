import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "@/components/Logo";
import Menu from "./Menu";
import { ROUTE_TO_HOME, ROUTE_TO_LOGIN } from "@/constants";
import { useScreenSize } from "@/hooks/useScreenSize";

const burgerMenuIcon = "/burger-menu.svg";
const closeMenuIcon = "/close-menu.svg";

interface Props {
    isAuthenticated: boolean;
}

export default function NavbarStart({ isAuthenticated }: Props) {
    const [openMenu, setOpenMenu] = useState(false);
    const { screenWidth } = useScreenSize();

    useEffect(() => {
        if (screenWidth >= 1024) {
            setOpenMenu(false);
        }
    }, [screenWidth]);

    return (
        <>
            <div className="navbar-start">
                <Link to={isAuthenticated ? ROUTE_TO_HOME : ROUTE_TO_LOGIN}>
                    <Logo />
                </Link>
            </div>

            {isAuthenticated ? (
                <>
                    <label
                        className={`absolute z-50 bg-black block p-2 cursor-pointer lg:hidden btn btn-ghost btn-circle avatar btn-burger-menu ${
                            openMenu ? "close" : ""
                        }`}
                        onClick={() => setOpenMenu((prev) => !prev)}
                    >
                        <img
                            src={openMenu ? closeMenuIcon : burgerMenuIcon}
                            width={24}
                            height={24}
                            alt="Menu small devices"
                        />
                    </label>

                    <div
                        className={`z-40 absolute left-0 bottom-0 w-full bg-black lg:hidden shadow burger-menu ${
                            openMenu ? "show" : ""
                        }`}
                        onClick={() => setOpenMenu(false)}
                    >
                        {openMenu ? <Menu /> : null}
                    </div>
                </>
            ) : null}
        </>
    );
}
