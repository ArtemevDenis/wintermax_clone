import React, {useEffect, useState} from "react";
import ImageSlider from "../components/slider/ImageSlider";
import {SliderData} from "../data/SliderData";
import MiniNews from "../components/news/MiniNews";
import HotSales from "../components/HotSales";
import {useHttp} from "../hooks/http.hook";

function Main() {

    const [news, setNews] = useState([])
    const {loading, request} = useHttp()
    const loadNews = async () => {
        try {
            const data = await request('/api/news/count/4', 'GET')
            setNews(data)
            console.log(data)

        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        loadNews()
    }, [])


    return (
        <div className='main'>
            <div className='main__news'>{!loading &&
            news.map((news) => {
                return <MiniNews key={news.id} news={news}/>
            })

            }
            </div>
            <div className='main__slider'><ImageSlider hSize={'565px'} dataSet={SliderData}/></div>
            <div className='main__hot'>
                <HotSales/>
            </div>
        </div>
    );
}

export default Main;
