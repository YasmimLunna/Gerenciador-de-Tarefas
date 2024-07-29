const taskManager = (tasks, taskList, tarefaDetalhe) => {
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        let filteredTasks;
        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else {
            filteredTasks = tasks;
        }

        filteredTasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('tarefa', 'card');
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

            taskDeadline.textContent = ` Fim: ${formattedDueDate}`;
            taskStatusLabel.appendChild(taskDeadline);

            taskInfo.appendChild(taskStatusLabel);
            taskElement.appendChild(taskInfo);

            const changeStatusButton = document.createElement('button');
            changeStatusButton.textContent = 'Alterar Status';
            changeStatusButton.addEventListener('click', (e) => {
                e.stopPropagation();
                changeTaskStatus(index);
            });
            taskElement.appendChild(changeStatusButton);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            // deleteButton.innerHTML = '🗑️';
            deleteButton.innerHTML = `
    <img src="assets/icons/delete.svg" alt="Delete" class="delete-icon">
`;
            deleteButton.in
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTask(index);
            });
            taskElement.appendChild(deleteButton);

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

    const changeTaskStatus = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
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

    const editTask = (index, newText, newDescription, newDueDate) => {
        tasks[index].text = newText;
        tasks[index].description = newDescription;
        tasks[index].dueDate = newDueDate;
        saveTasks();
        renderTasks();
        closeModal();
    };

    return {
        saveTasks,
        renderTasks,
        showTaskDetails,
        changeTaskStatus,
        showModal,
        addTask,
        editTask
    };
};