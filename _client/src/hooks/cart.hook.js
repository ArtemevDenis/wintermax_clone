import {useCallback, useState} from 'react'

export const useCart = () => {
    const [size, setSize] = useState(0)

    const setCartSize = useCallback((size) => {
        setSize(size)

    }, []);


    const getCartSize = useCallback((size) => {
        return size
    } ,[]);
    return {size, setCartSize, getCartSize}
}