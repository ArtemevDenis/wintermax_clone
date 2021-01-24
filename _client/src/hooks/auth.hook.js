import {useCallback, useEffect, useState} from 'react'

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [ready, setReady] = useState(false);
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState(null);


    const login = useCallback((jwtToken, id, userRole, email) => {
        setToken(jwtToken);
        setUserID(id);
        setRole(userRole);
        setEmail(email)
        console.log(userRole);
        console.log(JSON.stringify({userRole: userRole, userID: id, token: jwtToken}))
        localStorage.setItem(storageName, JSON.stringify({
            userRole: userRole,
            userID: id,
            token: jwtToken,
            email: email
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserID(null)
        setRole(null)

        localStorage.removeItem(storageName)
        localStorage.removeItem("filter")
        localStorage.setItem("filter", JSON.stringify({types: [], minPrice: "", maxPrice: ""}))
        localStorage.removeItem("user")
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userID, data.userRole, data.email)
        }
        setReady(true)
    }, [login])
    return {login, logout, token, userID, role, ready, email}
}