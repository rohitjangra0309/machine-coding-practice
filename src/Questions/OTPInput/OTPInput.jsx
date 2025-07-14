import React, { useEffect, useRef, useState } from 'react'
import './OTPInput.css'

const OTPInput = ({ boxCount }) => {
  // State to store the OTP values - initialized as an array of empty strings
  const [box, setBox] = useState(new Array(boxCount).fill(''))

  // useRef to store references to all input elements
  // We use an array because we need to reference multiple inputs (one for each OTP digit)
  const refArr = useRef([])

  // useEffect to auto-focus the first input when component mounts
  useEffect(() => {
    refArr.current[0]?.focus() // Safely focus first input if it exists
  }, []) // Empty dependency array means this runs only once on mount

  /**
   * Handles input change events
   * @param {string} value - The new input value
   * @param {number} index - The index of the current input box
   */
  const handleOnChange = (value, index) => {
    // Only allow numeric values
    if (isNaN(value)) return
    
    // Update the state with new value (only taking the last character entered)
    const newData = [...box]
    newData[index] = value.slice(-1) // Take last character to handle paste scenarios
    setBox(newData)
    
    // Auto-focus next input if a value was entered
    value && refArr.current[index + 1]?.focus()
  }

  /**
   * Handles key down events (specifically for Backspace)
   * @param {Event} e - The keydown event
   * @param {number} index - The index of the current input box
   */
  const handleOnKeyDown = (e, index) => {
    // If current input is empty and Backspace is pressed, focus previous input
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus()
    }
  }

  return (
    <div className='otp-container'>
      {box.map((element, index) => (
        <input 
          type='text' 
          key={index} 
          className='inputBox' 
          value={box[index]} 
          onChange={e => handleOnChange(e.target.value, index)}
          // Store each input's reference in our refArr at the corresponding index
          ref={(input) => (refArr.current[index] = input)}
          onKeyDown={e => handleOnKeyDown(e, index)}
          maxLength={1} // Each box should only contain 1 character
        />
      ))}
    </div>
  )
}

export default OTPInput


// How ref assignment works:
// In the ref={(input) => (refArr.current[index] = input)} part:

// As each input renders, React calls this function with the input element

// We store it in refArr.current[index] (current is needed because useRef returns an object with current property)

// Now refArr.current[0] refers to the first input, refArr.current[1] to the second, etc.

// Let me break down how ref assignment works in your OTP component with a simple analogy and step-by-step explanation.

// 📌 The Ref Assignment Process (Visualized)
// Imagine your OTP input has 4 boxes. Here's what happens:

// jsx
// Copy
// {/* Rendered JSX */}
// <input ref={(el) => (refArr.current[0] = el)} />  {/* Box 1 */}
// <input ref={(el) => (refArr.current[1] = el)} />  {/* Box 2 */}
// <input ref={(el) => (refArr.current[2] = el)} />  {/* Box 3 */}
// <input ref={(el) => (refArr.current[3] = el)} />  {/* Box 4 */}
// 🔍 Step-by-Step Breakdown
// 1. Initial Setup
// js
// Copy
// const refArr = useRef([]);  // Creates: { current: [] }
// useRef gives you an object { current: [] } (initially empty array).

// 2. During Rendering
// When React renders each <input>:

// It sees the ref={(el) => ...} callback.

// After the input is mounted to the DOM, React calls your function with the actual DOM element (el).

// 3. Ref Assignment
// For the first input (index 0):

// js
// Copy
// ref={(el) => (refArr.current[0] = el)}
// el = The actual <input> DOM element.

// React executes: refArr.current[0] = [HTMLInputElement].

// Now refArr.current looks like:

// js
// Copy
// { current: [ <input1>, empty, empty, empty ] }
// 4. Repeat for All Inputs
// After all inputs render, refArr.current becomes:

// js
// Copy
// { 
//   current: [ <input1>, <input2>, <input3>, <input4> ] 
// }
// (Where <input1> is the actual DOM element for the first box, etc.)

// 🎯 Why This Works
// useRef persists across re-renders (unlike regular variables).

// The callback ref (ref={(el) => ...}) is called for each input after it mounts.

// You store each DOM element in the array at its correct position (index).

// 🛠 How You Use These Refs Later
// Example from your OTP component:

// js
// Copy
// // Focus the next input when typing:
// refArr.current[index + 1]?.focus();
// refArr.current[1] gives you direct access to the second input's DOM element.

// You can call DOM methods like .focus(), .value, etc.

// ❓ Common Questions
// Q: Why not just use ref={refArr.current[index]}?
// A: This won't work because:

// useRef needs the callback form to dynamically assign DOM elements.

// The inline ref={refArr.current[index]} would try to read the ref before it exists.

// Q: What's the purpose of current?
// A: useRef always returns an object { current: ... } to:

// Maintain consistency with class component refs.

// Allow mutation without triggering re-renders (unlike state).

// 🌟 Key Takeaways
// ref={(el) => (refArr.current[index] = el)} is a callback ref that captures each input's DOM element.

// The index ensures each ref goes to the right position in the array.

// After rendering, refArr.current becomes an array of DOM elements you can control.

// This pattern is essential for managing dynamic lists of inputs (OTP, forms, etc.).