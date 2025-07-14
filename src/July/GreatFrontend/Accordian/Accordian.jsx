import React, { useState } from 'react'

import './Accordian.css'



const data = [
  {
    title: 'HTML',
    content: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.'
  },
  {
    title: 'CSS',
    content: 'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.'
  },
  {
    title: 'JavaScript',
    content: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.'
  }
]

const Accordian = () => {

  const [openIndex, setOpenIndex] = useState(-1)



  const handleClick = (index) => {
    if (openIndex === index) setOpenIndex(-1)
    else setOpenIndex(index)
  }


  return (
    <div>
      {data.map((item, index) => (
        <div>
          <div key={index} onClick={() => handleClick(index)} >
            {item.title}{' '}
            <div className={`accordion-icon ${openIndex === index ? "accordion-icon--rotated" : " "}`} ></div>
          </div>
          <div>
            {openIndex === index && item.content}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordian