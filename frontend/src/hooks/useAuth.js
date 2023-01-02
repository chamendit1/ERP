import { useSelector } from 'react-redux'
// import { selectCurrentToken } from "../features/auth/authSlice"
// import jwtDecode from 'jwt-decode'

const useAuth = () => {
    
    // const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "Employee"
    const user = JSON.parse(localStorage.getItem('profile'))
    // console.log(localStorage)

    if (user.token) {
        const { email, role, access } = user.result
        console.log(user.result)
        console.log(role)
        isManager = role.includes('Manager')
        isAdmin = role.includes('Admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { email, role, access, status, isManager, isAdmin }
    }

    return { email: '', role: '', access: [''] ,isManager, isAdmin, status }
}
export default useAuth