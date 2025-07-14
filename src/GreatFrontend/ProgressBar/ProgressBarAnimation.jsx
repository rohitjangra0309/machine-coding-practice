import React, { useState } from 'react'
import './ProgressBarAnimation.css'

const ProgressBarAnimation = () => {
    return (
        <div className="bar">
            <div className="fill"></div>
        </div>
    )
}

const AddBar = () => {
    const [bar, setBar] = useState(0)

    return (
        <>
        {/* Array(3)             // [ <3 empty items> ] → .map() won't work
        Array.from({ length: 3 {'}'}) // [undefined, undefined, undefined] → .map() works! */}
            <button onClick={() => setBar(p => p + 1)}>Add</button>
            {Array.from({ length: bar }).map((_, index) => (
                <ProgressBarAnimation key={index} />
            ))}
        </>
    )
}

export default AddBar
