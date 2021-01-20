import React from "react";
import ImageSlider from "../components/slider/ImageSlider";
import {SliderData} from "../data/SliderData";

function Main() {
    return (
        <div>
            <ImageSlider wSize={765} hSize={645} dataSet={SliderData}/>
            <ImageSlider wSize={765} hSize={645} dataSet={SliderData}/>
        </div>
    );
}

export default Main;
