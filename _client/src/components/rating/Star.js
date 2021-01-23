import React from "react";

const Star = ({isFull, size = 19}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 19 18" fill={isFull ? 'yellow' : 'gray'}

             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04892 10.6213L0.464963 6.56434H7.36712L9.5 0Z"/>
        </svg>
    )
}

export default Star