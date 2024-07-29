import React, { useState, useEffect } from 'react';
import TaskInput from './task_input';
import TaskList from './task_list';

const App = () => {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [showTaskInput, setShowTaskInput] = useState(false);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
        setShowTaskInput(false);
    };

    const updateTask = (index, updatedTask) => {
        const newTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div>
            <div className="flex-container">
                <header className="menu">
                    <div className="perfil">
                        <div className="perfil_info">
                            <p className="texto_menu">Planeje seus dias</p>
                            <p className="texto_menu">com eficiência nas suas</p>
                            <p className="texto_menu">tarefas diárias e constantes!</p>
                            <img src="assets/mocotempo.svg" alt="Imagem de um menino no computador com uma camisa vermelha e atrá tem uma ampulheta vermelha." className="perfil_foto" />
                        </div>
                    </div>
                </header>

                <main className="main-container">
                    <h1 className="main-titulo">Gerenciador de Tarefas</h1>
                    <div className="tarefa-secao">
                        <div className="tarefa-container">
                            <div className="tarefa-lista">
                                <div className="filters">
                                    <button id="filter-all">Todas</button>
                                    <button id="filter-completed">
                                        <img src="assets/icons/task_alt.svg" alt="Concluídas" className="button-icon" /> Concluídas
                                    </button>
                                    <button id="filter-pending">
                                        <img src="assets/icons/pending_actions.svg" alt="Pendentes" className="button-icon" /> Pendentes
                                    </button>
                                    <button id="add-task-button" className="button-icon" onClick={() => setShowTaskInput(true)}>
                                        <img src="assets/icons/add_task.svg" alt="Adicionar" className="button-icon" />
                                        <p>Adicionar Tarefa</p>
                                    </button>
                                </div>
                                {showTaskInput && <TaskInput addTask={addTask} />}
                                <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;