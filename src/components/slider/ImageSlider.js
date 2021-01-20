import React, {useState} from 'react'
import {NavLink} from "react-router-dom";

const ImageSlider = ({wSize = '100%', hSize ='100%', dataSet}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    // const preview = (
    //     <div> {dataSet.map((slider, index) => {
    //         return <a href={slider.link} key={index}>
    //             <img src={slider.image}
    //                  alt='slider image'
    //                  height={hSize}
    //                  width={wSize}/>
    //         </a>
    //     })}</div>)

    const nextHandler = () => {
        if (currentIndex + 1 <= dataSet.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else
            setCurrentIndex(0)
    }

    const prevHandler = () => {
        if (currentIndex - 1 > 0) {
            setCurrentIndex(currentIndex - 1)
        } else
            setCurrentIndex(dataSet.length - 1)
    }


    if (Array.isArray(dataSet)) {
        console.log(dataSet[currentIndex])
        return (
            <div className='slider' style={{width: wSize, height: hSize}}>
                <span className='slider__arrow slider__arrow--right' onClick={nextHandler}/>
                <span className='slider__arrow slider__arrow--left' onClick={prevHandler}/>
                <NavLink to={dataSet[currentIndex].link}>
                    <img
                        className='slider__image'
                        src={dataSet[currentIndex].image}
                        alt={dataSet[currentIndex].alt}

                    />
                </NavLink>
            </div>
        )
    } else
        return <></>
}

export default ImageSlider