import React, { useId } from 'react'

const Input = React.forwardRef(function Input({ componentId, label, type = "text", className = "", multiple = false,errorMessage, ...props }, ref) {
    const id = useId()
    return (

        <div className='w-full' id={componentId}>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>
            }
            <input type={type} multiple={multiple} className={`px-3 py-2 rounded-lg outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...props} ref={ref} id={id} />
        </div>

    )
})

export default Input