/* GAME 4: SPEED READER - 15 ROUNDS LOGIC */
let currentRound = 1;
let score = 0;
let timeRemaining = 30;
let timerInterval = null;

document.addEventListener('DOMContentLoaded', function() {
    loadGameProgress();
    setupGame();
});

/* ============================================
   GAME SETUP
   ============================================ */
function setupGame() {
    const startBtn = document.getElementById('start-game-btn');
    startBtn.addEventListener('click', startGame);
}

function loadGameProgress() {
    const savedScore = localStorage.getItem('game4-score');
    if (savedScore) {
        score = parseInt(savedScore);
    }
}

function startGame() {
    // Hide instruction, show game
    document.getElementById('instruction-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    // Load first round
    loadRound(1);
}

/* ============================================
   TIMER LOGIC - Dynamic based on round
   ============================================ */
function getTimeLimitForRound(round) {
    if (round >= 1 && round <= 5) {
        return 30; // R1-R5: 30 seconds
    } else if (round >= 6 && round <= 10) {
        return 40; // R6-R10: 40 seconds
    } else {
        return 60; // R11-R15: 60 seconds
    }
}

/* ============================================
   ROUND MANAGEMENT
   ============================================ */
function loadRound(round) {
    currentRound = round;
    const roundData = GAME_DATA.rounds[round - 1];
    
    if (!roundData) {
        showCompletion();
        return;
    }
    
    // Hide Next button
    document.getElementById('next-button-container').style.display = 'none';
    
    // Set timer based on round
    timeRemaining = getTimeLimitForRound(round);
    updateTimerDisplay();
    
    // Update round display
    document.getElementById('current-round').textContent = round;
    
    // Load paragraph
    document.getElementById('paragraph-box').textContent = roundData.paragraph;
    
    // Load question and options immediately
    loadQuestion(roundData);
    
    // Start timer automatically
    startTimer();
}

function loadQuestion(roundData) {
    // Set question text
    document.getElementById('question-text').textContent = roundData.question;
    
    // Create option buttons
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    roundData.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', function() {
            checkAnswer(index, btn);
        });
        container.appendChild(btn);
    });
}

/* ============================================
   ANSWER CHECKING
   ============================================ */
function checkAnswer(selectedIndex, btnElement) {
    stopTimer();
    
    const roundData = GAME_DATA.rounds[currentRound - 1];
    const isCorrect = selectedIndex === roundData.correct;
    
    // Disable all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        
        // Calculate points based on time
        const timeLimit = getTimeLimitForRound(currentRound);
        const timeSpent = timeLimit - timeRemaining;
        let points = roundData.maxPoints;
        
        // Scoring: 0-33% time = 100%, 34-66% = 60%, 67-100% = 30%
        const percentageTime = (timeSpent / timeLimit) * 100;
        
        if (percentageTime <= 33) {
            points = roundData.maxPoints; // 100%
        } else if (percentageTime <= 66) {
            points = Math.floor(roundData.maxPoints * 0.6); // 60%
        } else {
            points = Math.floor(roundData.maxPoints * 0.3); // 30%
        }
        
        score += points;
    } else {
        btnElement.classList.add('wrong');
    }
    
    // Show Next button if time remains, otherwise auto-next
    if (timeRemaining > 0) {
        showNextButton();
    } else {
        autoNextRound();
    }
}

function showNextButton() {
    const nextBtnContainer = document.getElementById('next-button-container');
    const nextBtn = document.getElementById('next-button');
    
    nextBtnContainer.style.display = 'block';
    
    // Setup next button click
    nextBtn.onclick = function() {
        nextBtnContainer.style.display = 'none';
        if (currentRound < 15) {
            loadRound(currentRound + 1);
        } else {
            showCompletion();
        }
    };
}

function autoNextRound() {
    setTimeout(() => {
        if (currentRound < 15) {
            loadRound(currentRound + 1);
        } else {
            showCompletion();
        }
    }, 500);
}

/* ============================================
   TIMER FUNCTIONS
   ============================================ */
function startTimer() {
    timerInterval = setInterval(function() {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            stopTimer();
            // Disable all options when time runs out
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.style.pointerEvents = 'none';
            });
            // Auto move to next round
            autoNextRound();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = timeRemaining;
}

/* ============================================
   COMPLETION
   ============================================ */
function showCompletion() {
    stopTimer();
    document.getElementById('final-score').textContent = score;
    document.getElementById('completion-modal').classList.add('active');
    
    // Save progress
    localStorage.setItem('game4-score', score);
    localStorage.setItem('game4-level', 15);
}