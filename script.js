const toggleThemeButton = document.getElementById('toggle-theme');
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');

// Função para alternar entre o modo claro e escuro
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Adicionar uma tarefa
addTaskButton.addEventListener('click', () => {
    const taskValue = taskInput.value;

    if (taskValue) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskValue;

        // Adiciona animação
        taskItem.classList.add('animate-task');
        taskList.appendChild(taskItem);

        // Limpar input
        taskInput.value = '';
    }
});
