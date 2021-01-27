import React, {useEffect, useState} from "react";
import ImageSlider from "../components/slider/ImageSlider";
import MiniNews from "../components/news/MiniNews";
import HotSales from "../components/HotSales";
import {useHttp} from "../hooks/http.hook";

function Main() {

    const [news, setNews] = useState([])
    const {loading, request} = useHttp()
    const [sliderData, setSliderData] = useState(null)
    const loadNews = async () => {
        try {
            const data = await request('/api/news/count/4', 'GET')
            setNews(data)
        } catch (e) {
            console.error(e)
        }
    }


    const getSliderData = async () => {
        new Promise(async (resolve, reject) => {
            try {
                const data = await request('/api/slider', 'GET')
                console.log(data.code)
                resolve(data.code)
            } catch (e) {
                console.error(e)
            }
        }).then(r => {
            setSliderData(r)
        })

    }

    useEffect(() => {
        loadNews()
        getSliderData()
    }, [])

    return (
        <div className='main'>
            <div className='main__news'>{!loading &&
            news.map((news) => {
                return <MiniNews key={news.ID} news={news}/>
            })

            }
            </div>
            <div className='main__slider'>{sliderData && <ImageSlider hSize={'565px'} dataSet={sliderData}/>}</div>
            <div className='main__hot'>
                <HotSales/>
            </div>
        </div>
    );
}

export default Main;
