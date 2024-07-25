document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDescription = document.getElementById('task-description');
    const taskDueDate = document.getElementById('task-due-date');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filters button');
    const addTaskButton = document.getElementById('add-task-button'); 


    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentIndex = -1; 

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
        });

        filteredTasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('tarefa');

            const taskStatus = document.createElement('div');
            taskStatus.classList.add('tarefa-status', task.completed ? 'completed' : 'in-progress');
            taskElement.appendChild(taskStatus);

            const taskInfo = document.createElement('div');
            taskInfo.classList.add('tarefa-info');

            const taskTitle = document.createElement('p');
            taskTitle.innerHTML = `<span class="tarefa-titulo"><strong>${task.text}</strong></span>`;
            taskInfo.appendChild(taskTitle);

            const taskSummary = document.createElement('p');
            taskSummary.innerHTML = `<span class="tarefa-resumo">${task.description}</span>`;
            taskInfo.appendChild(taskSummary);

            const taskStatusLabel = document.createElement('p');
            taskStatusLabel.innerHTML = `<span class="tarefa-status-label"><strong>Status: </strong></span>`;
            const taskStatusText = document.createElement('span');
            taskStatusText.classList.add('tarefa-status-texto', task.completed ? 'completed' : 'pending');
            taskStatusText.textContent = task.completed ? 'Concluído' : 'Pendente';
            taskStatusLabel.appendChild(taskStatusText);

            const taskDeadline = document.createElement('span');
            

            taskDeadline.classList.add('tarefa-deadline');
            const dueDateObj = new Date(task.dueDate);
            const formattedDueDate = `${dueDateObj.getDate()}/${dueDateObj.getMonth() + 1}/${dueDateObj.getFullYear()}`;

            taskDeadline.textContent = `Fim: ${formattedDueDate}`;

            taskStatusLabel.appendChild(taskDeadline);

            taskInfo.appendChild(taskStatusLabel);
            taskElement.appendChild(taskInfo);

            const taskControls = document.createElement('div');
            taskControls.classList.add('task-controls');

            const completeButton = document.createElement('button');
            completeButton.innerHTML = '<img src="assets/concluida.svg" alt="Complete">';
            completeButton.addEventListener('click', () => completeTask(index));

            const editButton = document.createElement('button');
            editButton.innerHTML = '<img src="assets/editar.svg" alt="Edit">'; 
            editButton.addEventListener('click', () => {
                showModal(index);
            });

            const removeButton = document.createElement('button');
            removeButton.innerHTML = '<img src="assets/remover.svg" alt="Remove">';
            removeButton.addEventListener('click', () => removeTask(index));

            taskControls.appendChild(completeButton);
            taskControls.appendChild(editButton);
            taskControls.appendChild(removeButton);
            taskElement.appendChild(taskControls);

            taskList.appendChild(taskElement);
        });
    };

    const addTask = (text, description, dueDate) => {
        if (!text || !description || !dueDate) {
            alert('Todos os campos obrigatórios!');
            return;
        }
    
        tasks.push({ text, description, completed: false, dueDate });
        saveTasks();
        alert('Tarefa adicionada com sucesso!');
        renderTasks();
        closeModal();
    };

    const completeTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    const showModal = (index) => {
        currentIndex = index;
        const task = index !== -1 ? tasks[index] : null;

        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Título:';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = task ? task.text : '';

        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Descrição:';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.value = task ? task.description : '';

        const dueDateLabel = document.createElement('label');
        dueDateLabel.textContent = 'Data de Conclusão:';
        const dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';
        dueDateInput.value = task && task.dueDate ? task.dueDate : '';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Salvar';
        saveButton.addEventListener('click', () => {
            if (index === -1) {
                addTask(titleInput.value, descriptionInput.value, dueDateInput.value);
            } else {
                editTask(index, titleInput.value, descriptionInput.value, dueDateInput.value);
            }
        });

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar';
        cancelButton.addEventListener('click', () => {
            closeModal();
        });

        modalContent.appendChild(titleLabel);
        modalContent.appendChild(titleInput);
        modalContent.appendChild(descriptionLabel);
        modalContent.appendChild(descriptionInput);
        modalContent.appendChild(dueDateLabel);
        modalContent.appendChild(dueDateInput);
        modalContent.appendChild(saveButton);
        modalContent.appendChild(cancelButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        const closeModal = () => {
            document.body.removeChild(modal);
            currentIndex = -1;
        };
    };

    const editTask = (index, newText, newDescription, newDueDate) => {
        tasks[index].text = newText;
        tasks[index].description = newDescription;
        tasks[index].dueDate = newDueDate;
        saveTasks();
        renderTasks();
        closeModal();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const closeModal = () => {
        const modal = document.querySelector('.modal');
        if (modal) {
            document.body.removeChild(modal);
        }
        currentIndex = -1;
    };

    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => {
            showModal(-1); 
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderTasks(button.id.split('-')[1]);
        });
    });

    renderTasks(); 
});


document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');
    const tarefaDetalhe = document.getElementById('tarefa-detalhe');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('tarefa');
            taskElement.addEventListener('click', () => showTaskDetails(task));

            const taskStatus = document.createElement('div');
            taskStatus.classList.add('tarefa-status', task.completed ? 'completed' : 'in-progress');
            taskElement.appendChild(taskStatus);

            const taskInfo = document.createElement('div');
            taskInfo.classList.add('tarefa-info');

            const taskTitle = document.createElement('p');
            taskTitle.innerHTML = `<span class="tarefa-titulo"><strong>${task.text}</strong></span>`;
            taskInfo.appendChild(taskTitle);

            const taskSummary = document.createElement('p');
            taskSummary.innerHTML = `<span class="tarefa-resumo">${task.description}</span>`;
            taskInfo.appendChild(taskSummary);

            const taskStatusLabel = document.createElement('p');
            taskStatusLabel.innerHTML = `<span class="tarefa-status-label"><strong>Status: </strong></span>`;
            const taskStatusText = document.createElement('span');
            taskStatusText.classList.add('tarefa-status-texto', task.completed ? 'completed' : 'pending');
            taskStatusText.textContent = task.completed ? 'Concluído' : 'Pendente';
            taskStatusLabel.appendChild(taskStatusText);

            const taskDeadline = document.createElement('span');
            taskDeadline.classList.add('tarefa-deadline');

            const dueDateObj = new Date(task.dueDate);
            const formattedDueDate = `${dueDateObj.getDate()}/${dueDateObj.getMonth() + 1}/${dueDateObj.getFullYear()}`;

            taskDeadline.textContent = `Fim: ${formattedDueDate}`;
            taskStatusLabel.appendChild(taskDeadline);

            taskInfo.appendChild(taskStatusLabel);
            taskElement.appendChild(taskInfo);

            taskList.appendChild(taskElement);
        });
    };

    const showTaskDetails = (task) => {
        tarefaDetalhe.innerHTML = `
            <h2>${task.text}</h2>
            <p><strong>Task Title:</strong> ${task.text}</p>
            <p><strong>Task Description:</strong> ${task.description}</p>
            <p><strong>Final da Tarefa:</strong> ${new Date(task.dueDate).toLocaleDateString('pt-BR')}</p>
            <p><strong>Status:</strong> <span class="${task.completed ? 'status-concluido' : 'status-pendente'}">${task.completed ? 'Concluído' : 'Pendente'}</span></p>
        `;
    };

    addTaskButton.addEventListener('click', () => {
        showModal(-1);
    });

    renderTasks();
});