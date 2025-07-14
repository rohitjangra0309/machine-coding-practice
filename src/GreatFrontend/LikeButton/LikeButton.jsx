import React, { useState } from 'react'

import './styles.css'

import { HeartIcon, SpinnerIcon } from './Icons'

const URL = 'https://questions.greatfrontend.com/api/questions/like-button'

const buttonText = 'Like'
const buttonTextClicked = 'Liked'

const LikeButton = () => {
    const [clicked, setClicked] = useState(false);
    const [result, setResult] = useState("Null");

    const apiCall = async () => {
        const response = await fetch(URL, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json', // Send JSON data
            },
            body: JSON.stringify({ // Send the data in the body of the request
                action: 'like', // Or any other necessary data
            }),
        });

        const jsonResult = await response.json();
        setResult(jsonResult); // Set the result from the response
        return;
    };

    const handleClick = async () => {
        setClicked((prev) => !prev);
        await apiCall();
    };

    return (
        <div className='center-container'>
            <button className={`button ${clicked ? 'buttonClicked' : ''}`} onClick={handleClick}>
                <HeartIcon /> {clicked ? buttonTextClicked : buttonText}
            </button>
            {result && <div>{JSON.stringify(result)}</div>}
        </div>
    );
};

export default LikeButton;


// The :not() Pseudo-class:
// The :not() pseudo-class is used to exclude elements from a given style. In the case of:

// css
// Copy
// Edit
// .button:hover:not(.buttonClicked)
// It means:

// Apply the hover effect only if the element does not have the .buttonClicked class.

// The general syntax of :not() is:

// css
// Copy
// Edit
// selector:not(condition) {
//     /* styles */
// }
// selector: The element or class you want to target.

// :not(condition): The condition inside :not() specifies which elements should not receive the styles.

// For example:

// div:not(.active) would target all <div> elements that do not have the active class.

// button:not(:disabled) would target all buttons that are not disabled.

