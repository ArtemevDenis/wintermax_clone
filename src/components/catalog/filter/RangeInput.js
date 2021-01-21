import React from "react";

const RangeInput = React.forwardRef((props, ref) => {
    return (
        <input
            className='input__number--100'
            type='number'
            ref={ref}
            placeholder={props.placeholder}/>
    )
})

export default RangeInput