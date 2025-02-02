import React, { useState } from 'react';


/***
This file handles the input and submits a new tasks to the App.js. 

***/

function InputForm({ addTask }) {
    const [input, setInput] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(input, priority, dueDate);
        setInput(""); // Clear input
        setDueDate("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
             {/* Priority Selection */}
             <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            {/* Date Picker for Due Date */}
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default InputForm;