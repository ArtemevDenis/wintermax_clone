import React, {useContext, useEffect, useState} from "react";
import ImageSlider from "../components/slider/ImageSlider";
import MiniNews from "../components/news/MiniNews";
import HotSales from "../components/HotSales";
import {useHttp} from "../hooks/http.hook";
import {UserContext} from "../context/AuthContext";

function Main() {

    const user = useContext(UserContext)
    const [news, setNews] = useState([])
    const {loading, request} = useHttp()
    const [sliderData, setSliderData] = useState(null)
    const loadNews = () => {
        request('/api/news/count/4', 'GET')
            .then(setNews)

    }


    const getSliderData = async () => {
        request('/api/slider', 'GET')
            .then(r => {
                setSliderData(r.code)
            })

    }

    useEffect(() => {
        loadNews()
        getSliderData()
    }, [])

    const loadCartSize = () => {
        if (user.userID)
            request('/api/cart/size', 'POST', {userID: user.userID}, {
                Authorization: `Bearer ${user.token}`
            }).then(r => {
                user.setCartSize(r.size);
            })

    }

    useEffect(() => {
        loadCartSize()
    }, [user])

    return (
        <div className='main'>
            <div className='main__news'>
                {!loading &&
                news.map((news) => {
                    return <MiniNews key={news.ID} news={news}/>
                })}
            </div>
            <div className='main__slider'>{sliderData && <ImageSlider hSize={'565px'} dataSet={sliderData}/>}</div>
            <div className='main__hot'>
                <HotSales/>
            </div>
        </div>
    );
}

export default Main;
