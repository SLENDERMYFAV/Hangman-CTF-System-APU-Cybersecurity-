let lives = 5;
let timeLeft = 300; // 5 minutes in seconds
let timerInterval;

// 1. INPUT VALIDATION
function checkInput() {
    const input = document.getElementById('cli-input').value.trim();
    
    // Validating against the lecturer-themed flag
    if (input === "apuCTF{mr_hanis_jenalis}") {
        triggerSuccess();
    } else {
        triggerInvalid();
    }
    document.getElementById('cli-input').value = "";
}

// 2. PENALTY LOGIC: Broken Hearts & Video
function triggerInvalid() {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('invalid-player');
    modal.style.display = 'flex';
    player.play();

    if (lives > 0) {
        // Targets hearts h5 down to h1
        const currentHeart = document.getElementById('h' + lives);
        if (currentHeart) {
            currentHeart.src = "../image/brokenheart.png"; // Swap to broken asset
            currentHeart.classList.add('broken'); // Apply dimmed/grey CSS
        }
        lives--;
        document.getElementById('life-text').innerText = lives;
    }

    player.onended = () => {
        modal.style.display = 'none';
        logToTerminal(`ADJACENCY VIOLATION. HEART BROKEN. LIVES: ${lives}`, "#ff0000");
    };
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
            return;
        }
        
        timeLeft--;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('countdown-timer').innerText = display;
}

function handleTimeOut() {
    logToTerminal("CRITICAL: TIME EXPIRED. SYSTEM LOCKDOWN.", "#ff0000");
    document.getElementById('cli-input').disabled = true;
    document.getElementById('solver-btn').disabled = true;
    document.getElementById('solver-btn').innerText = "EXPIRED";
    // Trigger any additional failure logic here
}

// Update your triggerSuccess function to stop the timer
const originalTriggerSuccess = triggerSuccess;
triggerSuccess = function() {
    clearInterval(timerInterval);
    originalTriggerSuccess();
}

// 3. SUCCESS LOGIC: Victory & Permanent Lock
function triggerSuccess() {
    const successModal = document.getElementById('success-modal');
    const successPlayer = document.getElementById('success-player');
    const hudBox = document.getElementById('hudBox');
    const terminal = document.querySelector('.terminal-container');
    const inputField = document.getElementById('cli-input');
    const solverBtn = document.getElementById('solver-btn');

    successModal.style.display = 'flex';
    successPlayer.play();

    successPlayer.onended = () => {
        successModal.style.display = 'none'; 
        
        // Permanent Green Glow for Hub and Terminal
        terminal.classList.add('challenge-solved-glow');
        hudBox.classList.add('challenge-solved-glow');
        
        // Grey out navigation buttons (Solved Lock)
        const navButtons = document.querySelectorAll('.btn-nav, .btn-hud');
        navButtons.forEach(btn => {
            btn.classList.add('solved-lock');
            btn.onclick = null; // Disable all clicks
        });

        // Lock the Input System
        inputField.disabled = true;
        inputField.placeholder = "SYSTEM SECURED";
        solverBtn.disabled = true;
        solverBtn.innerText = "LOCKED";
        
        logToTerminal("========================================", "#00ff41");
        logToTerminal("CHALLENGE OFFICIALLY SOLVED", "#ffffff");
        logToTerminal("OPERATORS SUREEN & DIVA SECURED THE SYSTEM", "#00ff41");
        logToTerminal("========================================", "#00ff41");
        
        document.getElementById('life-text').innerText = "SECURED";
    };
}

// 4. UI TOGGLE: Center vs Side-by-Side
function toggleTerminal() {
    const hudBox = document.getElementById('hudBox');
    const btn = document.getElementById('terminal-toggle');
    
    // Toggle 'collapsed' on parent to shift between center (100% width) and split-screen
    hudBox.classList.toggle('collapsed');
    
    // Toggle active state appearance (White Glow vs Grey)
    btn.classList.toggle('active-btn');
    btn.classList.toggle('inactive');
}

// 5. UTILITY: Terminal Logging & Listeners
function logToTerminal(msg, color) {
    const history = document.getElementById('terminal-history');
    history.innerHTML += `<p style="color:${color}">> ${msg}</p>`;
    history.scrollTop = history.scrollHeight;
}

function showModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// Enter key support for immediate solving
document.getElementById('cli-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkInput();
});

window.onload = startTimer;