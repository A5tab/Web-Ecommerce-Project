import React, { useId } from 'react'

const Select = React.forwardRef(function Select({ componentId, name, label, options, value, className = "", required = true, errorMessage, ...props }, ref) {
    const id = useId();
    return (
        <div id={componentId} className='w-full'>
            <label htmlFor={id}>{label}</label>
            <select name={name} id={id} {...props} className={className} ref={ref}>
                {options.map((option, index) => {
                    return (<option key={index} value={option.value}>{option.label}</option>)
                })}
            </select>
        </div>
    )
})

export default Select