import { useState } from "react";
import { Link } from "react-router-dom";

import FullName from "@/components/FullName";
import Button from "@/components/common/Button";
import { BUTTON_SIGNOUT, ROUTE_TO_CHANGE_PASSWORD, ROUTE_TO_USER_PROFILE } from "@/constants";

import userPlaceholderImgUrl from "/user_placeholder.svg";

interface Props {
    handleLogout: () => Promise<void>;
    isLoading: boolean;
    firstName: string | undefined;
    lastName: string | undefined;
}

export default function NavbarEnd({ handleLogout, isLoading, firstName, lastName }: Props) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="navbar-end">
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <label
                        onClick={() => setShowDropdown((prev) => !prev)}
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img src={userPlaceholderImgUrl} width={24} height={24} alt="User image" />
                        </div>
                    </label>
                    {showDropdown ? (
                        <ul
                            tabIndex={0}
                            className="bg-black mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 text-white font-thin tracking-widest"
                        >
                            <li>
                                <FullName firstName={firstName} lastName={lastName} />
                            </li>
                            <li>
                                <Link to={ROUTE_TO_USER_PROFILE} onClick={() => setShowDropdown(false)}>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to={ROUTE_TO_CHANGE_PASSWORD} onClick={() => setShowDropdown(false)}>
                                    Change password
                                </Link>
                            </li>
                            <li>
                                <div className="">
                                    <Button
                                        type="button"
                                        isLoading={isLoading}
                                        onClick={handleLogout}
                                        btnText={BUTTON_SIGNOUT}
                                    />
                                </div>
                            </li>
                        </ul>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
