import React from "react";
import Rating from "../rating/Rating";

const Review = ({review}) => {
    return (
        <div className='review'>
            <div className='review__line'>
                <p className='review__author'>{review.author}</p>
                <p className='review__date'>{review.date}</p>
            </div>
            <p className='review__text'>{review.text}</p>
            <Rating rating={review.rating}></Rating>
        </div>
    )
}

export default Review