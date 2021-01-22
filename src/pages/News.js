import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import NewsView from "../components/news/NewsView";

function News() {
    const newsID = useParams().id
    const {request, loading, error} = useHttp()
    const [news, setNews] = useState(null)

    const getNews = async () => {
        try {
            const data = await request(`/api/news/${newsID}`, 'GET', null,)
            setNews(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getNews()
    }, [])

    // TODO доделать вывод ошибок + дописать api сервера
    // if (error) {
    //     return <>что то пошло не так...</>
    // }
    if (loading) {
        return <Loader/>
    }

    return (
        <>{!loading && news && <NewsView news={news}/>}</>
    );
}

export default News;
