import React, { useState } from 'react'
import './FileExplorer.css'

const data = [
    {
        id: 1,
        name: 'README.md',
    },
    {
        id: 2,
        name: 'Documents',
        children: [
            {
                id: 3,
                name: 'Word.doc',
            },
            {
                id: 4,
                name: 'Powerpoint.ppt',
            },
        ],
    },
    {
        id: 5,
        name: 'Downloads',
        children: [
            {
                id: 6,
                name: 'unnamed.txt',
            },
            {
                id: 7,
                name: 'Misc',
                children: [
                    {
                        id: 8,
                        name: 'foo.txt',
                    },
                    {
                        id: 9,
                        name: 'bar.txt',
                    },
                ],
            },
        ],
    },
];


const FileExplorerItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState({})
    return (
        <div>
            {item.name}
            {" "} {item.children && (<span onClick={() => setIsExpanded((prev) => {
                if (prev[item.name]) {
                    return { ...prev, [item.name]: false }
                } else {
                    return { ...prev, [item.name]: true }
                }
            })}>{isExpanded[item.name] ? '-' : "+"}</span>)}
            {item.children && (
                item.children.map((element) => (
                    <div className='childPadding'>
                        {isExpanded[item.name] && <FileExplorerItem key={element.id} item={element} />}
                    </div>
                ))
            )}
        </div>
    );
};

const FileExplorer = () => {
    return (
        <div>
            {data.map((item) => (
                <FileExplorerItem key={item.id} item={item} />
            ))}
        </div>
    )
}

export default FileExplorer