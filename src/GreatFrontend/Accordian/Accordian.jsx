import React, { useState } from 'react';
import AccordianElement from './AccordianElement';

const SIZE = 5;
const arr = new Array(SIZE).fill(1);

const Accordian = () => {
  const [currentOpen, setCurrentOpen] = useState(null);

  const handleItemClick = (index) => {
    setCurrentOpen(currentOpen === index ? null : index);
  };

  return (
    <>
      <h1>Accordian</h1>
      {arr.map((_, index) => (
        <AccordianElement
          key={index}
          index={index}
          isOpen={currentOpen === index}
          onClick={handleItemClick}
        />
      ))}
    </>
  );
};

export default Accordian;