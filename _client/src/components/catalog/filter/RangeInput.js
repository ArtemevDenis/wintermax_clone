import React from "react";

const RangeInput = React.forwardRef((props, ref) => {
    return (
        <input
            className='input__number--100'
            type={props.type ? props.type : 'number'}
            ref={ref}
            placeholder={props.placeholder}
            style={{width: props.width}}
        />
    )
})

export default RangeInput