import React, { useState } from 'react'

function ToDoList() {
    const [todoList, setTodolist] = useState([])
    const [currentInput, setCurrentInput] = useState('')

    const handleAdd = () => {
        if (currentInput) {
           const curId = Date.now() + Math.random()
            if (todoList) {
                setTodolist((prev) => [...prev, { id: curId, task: currentInput }])
            } else {
                setTodolist({ id: curId, task: currentInput })
            }
            setCurrentInput('')
        }
    }

    const handleRemove = (id) => {
        console.log('inside')
        const filterList = todoList.filter((element) => element.id !== id)
        console.log(filterList)
        setTodolist(filterList)
    }

    const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

    return (
        <>
            <div>
                <input type='text' value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} onKeyDown={handleKeyPress}/>
                <button onClick={() => handleAdd()} > Add</button>
            </div>
            <ol>
                {todoList && (todoList.map((element) => (
                    <li key={element.id}><span>{element.task}
                    </span>
                        <button onClick={() => handleRemove(element.id)}>Remove</button>
                    </li>

                )))}
            </ol>
        </>
    )
}

export default ToDoList