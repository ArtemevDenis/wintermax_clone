import React from 'react'
import Star from "./Star";

const Rating = ({rating = 1, size = 19}) => {
    //TODO доделать рейтинг для точного отображения рейтинга + добавить возможность выставлять оценку
    const starts = [1, 2, 3, 4, 5]
    return (
        <div className='rating' style={{width: size * 5 + 'px', height: size + 'px'}}>
            <div className='rating__empty'>
                {starts.map((star, i) => {
                    return <Star key={i} size={size} isFull={false}/>
                })}
            </div>
            <div className='rating__full' style={{width: '50%'}}>
                {starts.map((star, i) => {
                    return <Star key={i} size={size} isFull={true}/>
                })}
            </div>
        </div>
    )
}

export default Rating