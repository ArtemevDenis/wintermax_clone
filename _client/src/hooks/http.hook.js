import {useCallback, useState} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        await setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
                console.log(body)
            }
            const start = new Date().getTime();
            const response = await fetch(url, {
                method,
                body,
                headers,
            })
            const end = new Date().getTime();
            console.log(`SecondWay: ${end - start}ms`);
            const data = await response.json()
            if (!response.ok) {
                new Error(data.message || 'Что то пошло не так')
            }
            await setLoading(false)

            return data
        } catch (e) {
            await setLoading(false)
            setError(e.message)

            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);
    return {loading, request, error, clearError}
}