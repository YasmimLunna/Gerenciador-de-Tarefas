document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');
    const filterAllButton = document.getElementById('filter-all');
    const filterCompletedButton = document.getElementById('filter-completed');
    const filterPendingButton = document.getElementById('filter-pending');
    const tarefaDetalhe = document.getElementById('tarefa-detalhe');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentIndex = -1;

    const { saveTasks, renderTasks, showTaskDetails, changeTaskStatus, showModal, addTask, editTask } = taskManager(tasks, taskList, tarefaDetalhe);

    addTaskButton.addEventListener('click', () => {
        showModal(-1);
    });

    filterAllButton.addEventListener('click', () => {
        renderTasks('all');
    });

    filterCompletedButton.addEventListener('click', () => {
        renderTasks('completed');
    });

    filterPendingButton.addEventListener('click', () => {
        renderTasks('pending');
    });

    renderTasks();
});