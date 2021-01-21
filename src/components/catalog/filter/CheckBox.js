import React from "react";

const CheckBox = React.forwardRef((props, ref) => {
    return (
        <label className='input__checkbox-label'><input ref={ref} type='checkbox'/>{props.title}</label>
    )
})

export default CheckBox