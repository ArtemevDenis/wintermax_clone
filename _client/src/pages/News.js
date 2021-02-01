import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import NewsView from "../components/news/NewsView";

function News() {
    const newsID = useParams().id
    const {request, loading} = useHttp()
    const [news, setNews] = useState(null)

    const getNews = () => {
        request(`/api/news/${newsID}`, 'GET', null).then(setNews)
    }
    useEffect(() => {
        getNews()
    }, [])

    if (loading) {
        return <Loader/>
    }

    return (
        <>{!loading && news && <NewsView news={news}/>}</>
    );
}
export default News;
