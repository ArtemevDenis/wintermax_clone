import React from "react";
import {NavLink} from "react-router-dom";

const NewsView = ({news}) => {
    return (
        <div className="news">
            <NavLink className='back-link' to="/home">На галвную</NavLink>
            <h2 className='news__title'>{news.title}</h2>
            <div className='news__description'>{news.text}</div>
        </div>
    )
}

export default NewsView