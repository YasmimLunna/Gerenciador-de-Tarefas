import React, { useState, useEffect } from 'react';

interface Task {
    id: string;
    text: string;
    description: string;
    completed: boolean;
    dueDate: string;
}

interface TaskInputProps {
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    taskToEdit: Task | null;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask, updateTask, showModal, setShowModal, taskToEdit }) => {
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setText(taskToEdit.text);
            setDescription(taskToEdit.description);
            setDueDate(taskToEdit.dueDate);
        } else {
            setText('');
            setDescription('');
            setDueDate('');
        }
    }, [taskToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            id: taskToEdit ? taskToEdit.id : '',
            text,
            description,
            completed: taskToEdit ? taskToEdit.completed : false,
            dueDate,
        };
        if (taskToEdit) {
            updateTask(newTask);
        } else {
            addTask(newTask);
        }
    };

    if (!showModal) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <label className="left-align">
                        Título
                        <input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
                    </label>
                    <label className="left-align">
                        Descrição
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>
                    <label className="left-align">
                        Data de Conclusão
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                    </label>
                    <button type="submit" className="submit-button">{taskToEdit ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}</button>
                    <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default TaskInput;