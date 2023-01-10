
import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { access, email } = useAuth()
    // console.log(allowedRoles)

    const content = (
        access.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth