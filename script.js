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

// Modos de duração
const modes = {
    pomodoro: 25 * 60,
    shortBreak: 1 * 5,
    longBreak: 15 * 60
};

// Trocar o modo automaticamente
function switchMode() {
    if (currentMode === 'pomodoro') {
        currentMode = 'shortBreak';
        timeLeft = modes.shortBreak;
    } else if (currentMode === 'shortBreak') {
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
        playSound(); // Toca o som de alerta
        alert("O tempo acabou! Trocando de modo.");
        isRunning = false;
        switchMode(); // Troca para pausa ou volta ao Pomodoro
        startButton.textContent = "Iniciar";
    }
}

// Função para tocar som de alerta
function playSound() {
    let alertSound = new Audio('alert.mp3');
    alertSound.play();
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

// Mudar para Pausa Curta (5 minutos)
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
    }
});
