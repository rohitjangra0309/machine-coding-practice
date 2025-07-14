import React, { useState } from 'react';

const AccordianElement = ({ answer = "ANSWER", question = "QUESTION", index, isOpen, onClick }) => {
  return (
    <div>
      <span>{question + " " + index}</span>
      <span>
        <button onClick={() => onClick(index)}>{isOpen ? '−' : '+'}</button>
      </span>
      <div hidden={!isOpen}>{answer + " " + index}</div>
    </div>
  );
};

export default AccordianElement;

