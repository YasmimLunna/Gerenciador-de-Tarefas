import React from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
    const toggleComplete = () => {
        updateTask({ ...task, completed: !task.completed });
    };

    return (
        <li>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
            </span>
            <button onClick={toggleComplete}>
                {task.completed ? 'Desmarcar' : 'Concluir'}
            </button>
            <button onClick={deleteTask}>Remover</button>
        </li>
    );
};

export default TaskItem;