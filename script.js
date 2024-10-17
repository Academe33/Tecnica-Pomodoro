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
let currentMode = 'pomodoro';
let cycles = 0;  

const modes = {
    pomodoro: 25 * 60,
    shortBreak: 600,
    longBreak: 15 * 60
};

function switchMode() {
    if (currentMode === 'pomodoro') {
        cycles++;
        if (cycles % 4 === 0) {
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

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

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

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
    } else {
        clearInterval(countdown);
        playSound();
        showNotification("O tempo acabou! Trocando de modo.");
        isRunning = false;
        switchMode();
        startButton.textContent = "Iniciar";
    }
}

function playSound() {
    let alertSound = new Audio('alert.mp3');
    alertSound.play();
}

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
    }, 3000);
}

pomodoroButton.addEventListener('click', function() {
    clearInterval(countdown);
    isRunning = false;
    currentMode = 'pomodoro';
    timeLeft = modes.pomodoro;
    updateTimerDisplay();
    startButton.textContent = "Iniciar";
});

shortBreakButton.addEventListener('click', function() {
    clearInterval(countdown);
    isRunning = false;
    currentMode = 'shortBreak';
    timeLeft = modes.shortBreak;
    updateTimerDisplay();
    startButton.textContent = "Iniciar";
});

longBreakButton.addEventListener('click', function() {
    clearInterval(countdown);
    isRunning = false;
    currentMode = 'longBreak';
    timeLeft = modes.longBreak;
    updateTimerDisplay();
    startButton.textContent = "Iniciar";
});

document.getElementById('add-task').addEventListener('click', function () {
    let task = taskInput.value;
    if (task.trim()) {
        let taskItem = document.createElement('li');
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
        taskInput.value = "";
        saveTasks();
    }
});

document.getElementById('clear-tasks').addEventListener('click', function() {
    taskList.innerHTML = ''; 
    localStorage.removeItem('tasks');
});

function saveTasks() {
    let tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        tasks.push(taskItem.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        let taskItem = document.createElement('li');
        taskItem.textContent = task;
        taskList.appendChild(taskItem);
    });
}

window.addEventListener('load', loadTasks);

function goBack() {
    window.history.back();
}
