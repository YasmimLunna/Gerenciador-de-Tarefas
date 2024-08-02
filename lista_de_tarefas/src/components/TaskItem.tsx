import React from 'react';

interface Task {
    id: string;
    text: string;
    description: string;
    completed: boolean;
    dueDate: string;
}

interface TaskItemProps {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
    onChangeStatus: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onChangeStatus }) => {
    const formattedDueDate = new Date(task.dueDate).toLocaleDateString('pt-BR');

    return (
        <div className="tarefa card">
            <div className={`tarefa-status ${task.completed ? 'completed' : 'in-progress'}`}></div>
            <div className="tarefa-info">
                <p><span className="tarefa-titulo"><strong>{task.text}</strong></span></p>
                <p><span className="tarefa-resumo">{task.description}</span></p>
                <p className="tarefa-status-label">
                    <span>
                        <strong>Status: </strong>
                        <span className={`tarefa-status-texto ${task.completed ? 'completed' : 'pending'}`}>
                            {task.completed ? 'Concluído' : 'Pendente'}
                        </span>
                    </span>
                    <span className="tarefa-deadline">Fim: {formattedDueDate}</span>
                </p>
            </div>
            <div className="button-container">
                <button className="status-button" onClick={(e) => { e.stopPropagation(); onChangeStatus(); }}>
                    <img src="assets/icons/sync_alt.svg" alt="Alterar Status" className="status-icon" />
                    Alterar Status
                </button>
                <button className="edit-button" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                    <img src="assets/icons/edit_note.svg" alt="Editar" className="edit-icon" />
                    Editar
                </button>
            </div>
            <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                <img src="assets/icons/delete.svg" alt="Deletar" className="delete-icon" />
            </button>
        </div>
    );
};

export default TaskItem;