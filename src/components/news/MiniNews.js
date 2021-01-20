import React from "react";
import {NavLink} from "react-router-dom";

const MiniNews = ({news}) => {

    const shortText = () => {
        return news.text.substr(0, 140) + '...'
    }

    return (
        <div className='miniNews'>
            <div className='miniNews__top'>
                <h3 className='miniNews__title'>{news.title}</h3>
                <p className='miniNews__data'>{news.date}</p>
            </div>
            <p className='miniNews__description'>{shortText()}</p>
            <div className='miniNews__readMore'>
                <NavLink to={`news/${news.id}`}>читать дальше...</NavLink>
            </div>
        </div>
    )
}

export default MiniNews