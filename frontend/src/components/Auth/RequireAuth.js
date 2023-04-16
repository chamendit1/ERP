
import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { access, email } = useAuth()

    const content = (
        access[allowedRoles] === true
            ? <Outlet />
            : email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/admin" state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth
