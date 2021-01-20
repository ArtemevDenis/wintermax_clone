import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";


function Login() {
    let history = useHistory();
    const auth = useContext(AuthContext)
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        clearError();
    }, [error, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userID)
            history.push('/home')
        } catch (e) {

        }
    }
    return (
        <div>
            <span>Вход</span>
            <div>
                <input id="email"
                       type="text"
                       name={'email'}
                       value={form.email}
                       onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
            </div>
            <div>
                <input id="password"
                       type="password"
                       name={'password'}
                       value={form.password}
                       onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
            </div>
            <button
                style={{marginRight: 10}}
                onClick={loginHandler}
                disabled={loading}
            >
                Войти
            </button>
        </div>
    );
}

export default Login;
