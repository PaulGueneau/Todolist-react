import React, { useState } from 'react';

/***
This file: 
- Display the task text 
- Edit/Delete/Complete each task 

***/


function ToDoItem({ task, deleteTask, toggleCompleteTask, editTask, changePriority }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [selectedPriority, setSelectedPriority] = useState(task.priority);


    //Prority colors 
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let displayDateMessage;
    const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;
    if (taskDueDate) {
        taskDueDate.setHours(0, 0, 0, 0); // Normalize time

        const diffTime = taskDueDate.getTime() - today.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            displayDateMessage = `Overdue by ${Math.abs(diffDays)} day(s) due date was: ${task.dueDate}`;
        } else if (diffDays === 0) {
            displayDateMessage = "Due Today!";
        } else {
            displayDateMessage = `Due in ${diffDays} days`;
        }
    }


    const priorityColors = {
        High: 'red',
        Medium: 'orange',
        Low: 'green',
    }


    const handlePriorityChange = (e) => {
        const newPriority = e.target.value;
        setSelectedPriority(newPriority);
        changePriority(task.id, newPriority);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log('Editing task:', task.id, 'New Text:', editedText);
        editTask(task.id, editedText); //Call editTask method from App.js
        setIsEditing(false); // to end the editing mode 
    }

    return (
        <li style={{
            margin: '10px 0', padding: '10px', border: '2px solid ${priorityColors[task.priority]}',
            borderRadius: '5px', display: 'flex', alignItems: 'center', backgroundColor: `${priorityColors[task.priority]}20`
        }}>
            <input
                type="checkbox"
                checked={task.completed} // Checkbox is checked if task is completed
                onChange={toggleCompleteTask} // Toggle completion status on change
            />
            {isEditing ? (
                <form onSubmit={handleEditSubmit} style={{ flex: 1 }}>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </form>
            ) : (
                <>
                    <span style={{
                        marginLeft: '10px', textDecoration: task.completed ? 'line-through' : 'none',
                        color: priorityColors[task.priority],
                        fontWeight: 'bold',
                    }}
                    >
                        {task.text} (<strong>{displayDateMessage}</strong>)
                    </span>
                    {/* Priority dropdown */}
                    <span
                        value={selectedPriority}
                        onChange={handlePriorityChange}
                        style={{
                            marginLeft: '10px',
                            backgroundColor: `${priorityColors[task.priority]}`,
                            color: 'black',
                            padding: '5px',
                            borderRadius: '3px',
                        }}
                    >
                        {task.priority}
                    </span>
                    <button onClick={deleteTask} style={{ marginLeft: '10px' }}>
                        Delete
                    </button>
                    <button
                        onClick={() => setIsEditing(true)} // Start editing
                        style={{ marginLeft: '10px' }}
                    >
                        Edit
                    </button>
                </>
            )}
        </li>
    );
}

export default ToDoItem;