import {createContext} from 'react'

const noop = {}
export const AuthContext = createContext({
    token: null,
    userID: null,
    login: noop,
    logout: noop,
    isAuth: null,
    isAdmin: true,
    email: null
})