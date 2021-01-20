import React from "react";
import ImageSlider from "../components/slider/ImageSlider";
import {SliderData} from "../data/SliderData";
import FakeNews from "../data/fakeNews";
import MiniNews from "../components/news/MiniNews";
import HotSales from "../components/HotSales";

function Main() {
    return (
        <div className='main'>
            <div className='main__news'>
                {FakeNews.map((news) => {
                    return <MiniNews key={news.id} news={news}/>
                })}
            </div>
            <div className='main__slider'><ImageSlider hSize={'565px'} dataSet={SliderData}/></div>
            <div className='main__hot'>
                <HotSales/>
            </div>
        </div>
    );
}

export default Main;
