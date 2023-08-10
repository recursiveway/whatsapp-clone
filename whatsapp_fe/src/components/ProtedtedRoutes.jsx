import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
    let auth = { token: true };
    return auth.token ? <Outlet /> : <Navigate to="/" />;
}