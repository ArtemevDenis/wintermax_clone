import React from "react";
import ImageSlider from "../components/slider/ImageSlider";
import {SliderData} from "../data/SliderData";

function Main() {
    return (
        <div className='main'>
            <div className='main__news'></div>
            <div className='main__slider'><ImageSlider wSize={810} hSize={645} dataSet={SliderData}/></div>
            <div className='main__hot'>
                <h2>Хот продаж</h2>
            </div>
        </div>
    );
}

export default Main;
