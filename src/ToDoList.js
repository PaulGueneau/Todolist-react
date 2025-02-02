import React from 'react';
import ToDoItem from './ToDoItem';

/***
This file loops through the tasks and renders each task using the ToDoItem component. 

***/

function ToDoList({ tasks, deleteTask, toggleCompleteTask, editTask, changePriority }) {
    return (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {tasks.map((task) => (
                <ToDoItem
                    key={task.id}
                    task={task}
                    deleteTask={() => deleteTask(task.id)}
                    toggleCompleteTask={() => toggleCompleteTask(task.id)}
                    editTask={editTask}
                    changePriority={changePriority}
                />
            ))}
        </ul>
    );
}

export default ToDoList;