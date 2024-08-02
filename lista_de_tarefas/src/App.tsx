import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './styles/menu.css';
import './styles/style.css';
import './styles/card.css';
import './styles/popup.css';

interface Task {
    id: string;
    text: string;
    description: string;
    completed: boolean;
    dueDate: string;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));
    const [showTaskInput, setShowTaskInput] = useState(false);
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Task) => {
        const newTask = { ...task, id: uuidv4() };
        setTasks([...tasks, newTask]);
        setShowTaskInput(false);
    };

    const updateTask = (updatedTask: Task) => {
        const newTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        setTasks(newTasks);
        setTaskToEdit(null);
        setShowTaskInput(false);
    };

    const deleteTask = (index: number) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const changeTaskStatus = (index: number) => {
        const newTasks = tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
        setTasks(newTasks);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
        setShowTaskInput(true);
    };

    return (
        <div className="flex-container">
            <div className="header-main-container">
                <header className="menu">
                    <div className="perfil">
                        <div className="perfil_info">
                            <p className="texto_menu">Planeje seus dias</p>
                            <p className="texto_menu">com eficiência nas suas</p>
                            <p className="texto_menu">tarefas diárias e constantes!</p>
                            <img src="assets/img/mocotempo.svg" alt="Imagem de um menino no computador com uma camisa vermelha e atrá tem uma ampulheta vermelha." className="perfil_foto" />
                        </div>
                    </div>
                </header>

                <main className="main-container">
                    <h1 className="main-titulo">Gerenciador de Tarefas</h1>
                    <div className="tarefa-secao">
                        <div className="tarefa-container">
                            <div className="tarefa-lista">
                                <div className="filters">
                                    <button id="filter-all" onClick={() => setFilter('all')}>Todas</button>
                                    <button id="filter-completed" onClick={() => setFilter('completed')}>
                                        <img src="assets/icons/task_alt.svg" alt="Concluídas" className="button-icon" /> Concluídas
                                    </button>
                                    <button id="filter-pending" onClick={() => setFilter('pending')}>
                                        <img src="assets/icons/pending_actions.svg" alt="Pendentes" className="button-icon" /> Pendentes
                                    </button>
                                    <button id="add-task-button" className="button-icon" onClick={() => { setTaskToEdit(null); setShowTaskInput(true); }}>
                                        <img src="assets/icons/add_task.svg" alt="Adicionar" className="button-icon" />
                                        <p>Adicionar Tarefa</p>
                                    </button>
                                </div>
                                <TaskInput addTask={addTask} updateTask={updateTask} showModal={showTaskInput} setShowModal={setShowTaskInput} taskToEdit={taskToEdit} />
                                <TaskList tasks={filteredTasks} onEdit={handleEditTask} onDelete={deleteTask} onChangeStatus={changeTaskStatus} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <footer className="rodape">
                <p>DESENVOLVIDO POR GABRIEL SILVA, KAYO VINICIUS E YASMIM LUNA.</p>
            </footer>
        </div>
    );
};

export default App;