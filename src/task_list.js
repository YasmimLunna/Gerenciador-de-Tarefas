import React from 'react';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
    const showTaskDetails = (task) => {
        alert(`
            Título: ${task.text}
            Descrição: ${task.description}
            Data de Conclusão: ${new Date(task.dueDate).toLocaleDateString('pt-BR')}
            Status: ${task.completed ? 'Concluído' : 'Pendente'}
        `);
    };

    return (
        <div id="task-list">
            {tasks.map((task, index) => (
                <div key={index} className="tarefa card" onClick={() => showTaskDetails(task)}>
                    <div className={`tarefa-status ${task.completed ? 'completed' : 'in-progress'}`}></div>
                    <div className="tarefa-info">
                        <p><span className="tarefa-titulo"><strong>{task.text}</strong></span></p>
                        <p><span className="tarefa-resumo">{task.description}</span></p>
                        <p>
                            <span className="tarefa-status-label"><strong>Status: </strong></span>
                            <span className={`tarefa-status-texto ${task.completed ? 'completed' : 'pending'}`}>
                                {task.completed ? 'Concluído' : 'Pendente'}
                            </span>
                            <span className="tarefa-deadline"> Fim: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;