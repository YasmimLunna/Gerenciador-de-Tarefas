import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ text: task, description, completed: false, dueDate });
        setTask('');
        setDescription('');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Título da Tarefa"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição da Tarefa"
                required
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default TaskInput;