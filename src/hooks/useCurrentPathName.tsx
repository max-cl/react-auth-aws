import { useLocation } from "react-router-dom";

export const useCurrentPathName = () => {
    const location = useLocation();

    return location.pathname;
};
