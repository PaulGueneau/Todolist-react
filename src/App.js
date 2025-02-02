import React, { useState } from 'react';
import ToDoList from './ToDoList';
import InputForm from './InputForm';

/***
This file maintains the central state of the app, the main methods are defined there then passed 
as props to ToDoList and InputForm. 

***/

function App() {

  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState("All");

  // Add a new task
  const addTask = (taskText, priority, dueDate) => {
    if (taskText.trim() !== "") {
      const newTask = {
        text: taskText.trim(),
        completed: false,
        id: Date.now(),  // or use a unique identifier like uuid
        priority: priority || "Low", //Default priority 
        dueDate: dueDate || "",
      };
      setTasks([...tasks, newTask]);
    }
  };

  const changePriority = (id, newPriority) => {
    const updatedTasks = tasks.map((task) =>
      task.id == id ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
  }

  // Delete a task
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  //Complete a task 
  const toggleCompleteTask = (id) => {
    const newTasks = tasks.map((task) =>
      task.id == id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  //Edit a task 
  const editTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText.trim() } : task
    );
    setTasks(updatedTasks);
    console.log('Updated tasks:', updatedTasks);
  };


  // Define a priority ranking order
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

    // Sort by priority first, then by due date
    const filteredTasks = tasks
    .filter((task) => filterPriority === "All" || task.priority === filterPriority)
    .sort((a, b) => {
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority]; // Sort by priority
      }
      return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date
    });


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>To-Do List</h1>
      {/* Priority Filter Dropdown */}
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <InputForm addTask={addTask} />
      <ToDoList tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleCompleteTask={toggleCompleteTask}
        editTask={editTask}
        changePriority={changePriority}
      />
    </div>
  );
}

export default App;
