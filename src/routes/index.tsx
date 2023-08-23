import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/pages/login";
import ConfirmationUser from "@/pages/user-confirmation";
import ForgotPassword from "@/pages/forgot-password";
import ForgotPasswordSubmit from "@/pages/forgot-password-submit";
import NavigationBar from "@/features/NavigationBar";
import Home from "@/pages/home";
import Page1 from "@/pages/page1";
import Page2 from "@/pages/page2";
import Page3 from "@/pages/page3";
import UserProfile from "@/pages/user-profile";
import NotFound from "@/pages/not-found";
import {
    ROUTE_NOT_FOUND,
    ROUTE_TO_CHANGE_PASSWORD,
    ROUTE_TO_CONFIRMATION,
    ROUTE_TO_FORGOT_PASSWORD,
    ROUTE_TO_FORGOT_PASSWORD_CONFIRM,
    ROUTE_TO_HOME,
    ROUTE_TO_LOGIN,
    ROUTE_TO_PAGE_1,
    ROUTE_TO_PAGE_2,
    ROUTE_TO_PAGE_3,
    ROUTE_TO_USER_PROFILE,
} from "@/constants";
import ChangeUserPassword from "@/pages/change-user-password";
import { ProtectedRoute } from "./ProtectedRoute";

function RoutesApp() {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route index element={<Login />} />
                <Route path={ROUTE_TO_LOGIN} element={<Login />} />
                <Route path={ROUTE_TO_CONFIRMATION} element={<ConfirmationUser />} />
                <Route path={ROUTE_TO_FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={ROUTE_TO_FORGOT_PASSWORD_CONFIRM} element={<ForgotPasswordSubmit />} />
                <Route path={ROUTE_TO_HOME} element={<ProtectedRoute />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path={ROUTE_TO_PAGE_1} element={<ProtectedRoute />}>
                    <Route index element={<Page1 />} />
                </Route>
                <Route path={ROUTE_TO_PAGE_2} element={<ProtectedRoute />}>
                    <Route index element={<Page2 />} />
                </Route>
                <Route path={ROUTE_TO_PAGE_3} element={<ProtectedRoute />}>
                    <Route index element={<Page3 />} />
                </Route>
                <Route path={ROUTE_TO_USER_PROFILE} element={<ProtectedRoute />}>
                    <Route index element={<UserProfile />} />
                </Route>
                <Route path={ROUTE_TO_CHANGE_PASSWORD} element={<ProtectedRoute />}>
                    <Route index element={<ChangeUserPassword />} />
                </Route>
                <Route path={ROUTE_NOT_FOUND} element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
