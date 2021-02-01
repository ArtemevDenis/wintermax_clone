import React from 'react'
import Star from "./Star";

const Rating = ({rating = 1, size = 19}) => {
    const starts = [1, 2, 3, 4, 5]
    return (
        <div className='rating' style={{width: size * 5 + 'px', height: size + 'px'}}>
            <div className='rating__empty'>
                {starts.map((star, i) => {
                    return <Star key={i} size={size} isFull={false}/>
                })}
            </div>
            {rating !== 0 &&
            <div className='rating__full' style={{width: (rating * 100.0 / 5.0 + '%')}}>
                {starts.map((star, i) => {
                    return <Star key={i} size={size} isFull={true}/>
                })}
            </div>
            }


        </div>
    )
}

export default Rating