let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start-timer');
let pomodoroButton = document.getElementById('pomodoro-mode');
let shortBreakButton = document.getElementById('short-break-mode');
let longBreakButton = document.getElementById('long-break-mode');
let taskInput = document.getElementById('task-input');
let taskList = document.getElementById('task-list');

let countdown;
let isRunning = false;
let timeLeft = 25 * 60;
let currentMode = 'pomodoro'; // Define o modo inicial como Pomodoro
let cycles = 0;  // Contador de ciclos Pomodoro

// Modos de duração
const modes = {
    pomodoro: 25 * 60,
    shortBreak: 5, // Mantendo 5 segundos para teste
    longBreak: 15 * 60
};

// Trocar o modo automaticamente com ciclos
function switchMode() {
    if (currentMode === 'pomodoro') {
        cycles++;
        if (cycles % 4 === 0) { // A cada 4 ciclos, faz a pausa longa
            currentMode = 'longBreak';
            timeLeft = modes.longBreak;
        } else {
            currentMode = 'shortBreak';
            timeLeft = modes.shortBreak;
        }
    } else if (currentMode === 'shortBreak' || currentMode === 'longBreak') {
        currentMode = 'pomodoro';
        timeLeft = modes.pomodoro;
    }
    updateTimerDisplay();
}

// Atualizar o display do temporizador
function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Iniciar o temporizador
startButton.addEventListener('click', function () {
    if (!isRunning) {
        isRunning = true;
        countdown = setInterval(updateTimer, 1000);
        startButton.textContent = "Pausar";
    } else {
        clearInterval(countdown);
        isRunning = false;
        startButton.textContent = "Iniciar";
    }
});

// Atualizar o temporizador
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
    } else {
        clearInterval(countdown);
        playSound();  // Toca o som de alerta imediatamente
        showNotification("O tempo acabou! Trocando de modo.");  // Exibe a notificação sem bloquear
        isRunning = false;
        switchMode();  // Troca para pausa ou volta ao Pomodoro
        startButton.textContent = "Iniciar";
    }
}

// Função para tocar som de alerta
function playSound() {
    let alertSound = new Audio('alert.mp3');
    alertSound.play();
}

// Função para exibir uma notificação não bloqueante
function showNotification(message) {
    let notification = document.createElement('div');
    notification.textContent = message;
    notification.style.background = '#333';
    notification.style.color = '#fff';
    notification.style.padding = '10px';
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.right = '10px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000); // Remove a notificação após 3 segundos
}

// Mudar para Pomodoro (25 minutos)
pomodoroButton.addEventListener('click', function() {
    clearInterval(countdown);
    isRunning = false;
    currentMode = 'pomodoro';
    timeLeft = modes.pomodoro;
    updateTimerDisplay();
    startButton.textContent = "Iniciar";
});

// Mudar para Pausa Curta (5 segundos)
shortBreakButton.addEventListener('click', function() {
    clearInterval(countdown);
    isRunning = false;
    currentMode = 'shortBreak';
    timeLeft = modes.shortBreak;
    updateTimerDisplay();
    startButton.textContent = "Iniciar";
});

// Mudar para Pausa Longa (15 minutos)
longBreakButton.addEventListener('click', function() {
    clearInterval(countdown);
    isRunning = false;
    currentMode = 'longBreak';
    timeLeft = modes.longBreak;
    updateTimerDisplay();
    startButton.textContent = "Iniciar";
});

// Adicionar nova tarefa
document.getElementById('add-task').addEventListener('click', function () {
    let task = taskInput.value;
    if (task.trim()) {
        let taskItem = document.createElement('li');
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
        taskInput.value = ""; // Limpa o campo de entrada
        saveTasks(); // Salva as tarefas no localStorage
    }
});

// Salvar tarefas no localStorage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        tasks.push(taskItem.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carregar tarefas do localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        let taskItem = document.createElement('li');
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
    });
}

// Carregar tarefas ao carregar a página
window.addEventListener('load', loadTasks);
