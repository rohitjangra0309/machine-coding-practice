import React, { useState } from 'react';
import './TransferList.css';

export const TransferList = () => {
    const initialData = [
        { title: 'First', id: 0 },
        { title: 'Second', id: 1 },
        { title: 'Third', id: 2 },
        { title: 'Fourth', id: 3 },
    ];

    const [leftData, setLeftData] = useState(initialData);
    const [rightData, setRightData] = useState([]);
    const [selectedLeft, setSelectedLeft] = useState([]);
    const [selectedRight, setSelectedRight] = useState([]);

    const handleSelectLeft = (item) => {
        setSelectedLeft((prev) => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    const handleSelectRight = (item) => {
        setSelectedRight((prev) => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    const transferToRight = () => {
        setRightData([...rightData, ...selectedLeft]);
        setLeftData(leftData.filter(item => !selectedLeft.includes(item)));
        setSelectedLeft([]);
    };

    const transferToLeft = () => {
        setLeftData([...leftData, ...selectedRight]);
        setRightData(rightData.filter(item => !selectedRight.includes(item)));
        setSelectedRight([]);
    };

    return (
        <div className='outerContainer'>
            <div className='leftDiv'>
                {leftData.map((item) => (
                    <button
                        key={item.id}
                        className={selectedLeft.includes(item) ? 'selected' : ''}
                        onClick={() => handleSelectLeft(item)}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
            <div className='centerDiv'>
                <button onClick={transferToRight} disabled={selectedLeft.length === 0}>Right →</button>
                <button onClick={transferToLeft} disabled={selectedRight.length === 0}>← Left</button>
            </div>
            <div className='rightDiv'>
                {rightData.map((item) => (
                    <button
                        key={item.id}
                        className={selectedRight.includes(item) ? 'selected' : ''}
                        onClick={() => handleSelectRight(item)}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    );
};
