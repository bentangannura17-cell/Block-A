/* ============================================
   GAME 2: VOCABULARY MATCHER - SIMPLIFIED
   1 Paragraph with multiple words to match
   ============================================ */

// Game State Variables
let currentLevel = 1;
let score = 0;
let lives = 3;
let comboCount = 0;
let timeRemaining = 60;
let timerInterval = null;
let currentSlide = 1;
const TOTAL_SLIDES = 4;

// Matching state
let selectedWord = null;
let selectedMeaning = null;
let matches = [];
let totalWords = 0;

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    loadGameProgress();
    setupInlineTutorial();
});

/* ============================================
   INLINE TUTORIAL NAVIGATION
   ============================================ */

function setupInlineTutorial() {
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const startBtn = document.getElementById('start-game-btn');
    const dots = document.querySelectorAll('.slide-dot');

    prevBtn.addEventListener('click', function() {
        if (currentSlide > 1) {
            currentSlide--;
            updateSlide();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentSlide < TOTAL_SLIDES) {
            currentSlide++;
            updateSlide();
        } else {
            showStartButtonInTutorial();
        }
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentSlide = parseInt(this.dataset.slide);
            updateSlide();
        });
    });

    startBtn.addEventListener('click', startGame);
}

function updateSlide() {
    const slides = document.querySelectorAll('.tutorial-slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const startButtonContainer = document.getElementById('start-button-container');

    slides.forEach(slide => {
        slide.classList.remove('active');
        if (parseInt(slide.dataset.slide) === currentSlide) {
            slide.classList.add('active');
        }
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
        if (parseInt(dot.dataset.slide) === currentSlide) {
            dot.classList.add('active');
        }
    });

    prevBtn.disabled = currentSlide === 1;
    
    if (currentSlide === TOTAL_SLIDES) {
        nextBtn.textContent = 'Got it! →';
    } else {
        nextBtn.textContent = 'Next →';
        startButtonContainer.style.display = 'none';
    }
}

function showStartButtonInTutorial() {
    document.getElementById('prev-slide').style.display = 'none';
    document.getElementById('next-slide').style.display = 'none';
    document.getElementById('start-button-container').style.display = 'block';
}

function startGame() {
    document.getElementById('inline-tutorial').style.display = 'none';
    document.getElementById('level-info').style.display = 'flex';
    document.getElementById('story-info').style.display = 'flex';
    document.getElementById('game-content').style.display = 'block';
    startTimer();
}

/* ============================================
   LOAD GAME PROGRESS
   ============================================ */

function loadGameProgress() {
    const savedScore = localStorage.getItem('game2-score');
    const savedLevel = localStorage.getItem('game2-level');
    
    if (savedScore) {
        score = parseInt(savedScore);
        updateScoreDisplay();
    }
    
    if (savedLevel) {
        currentLevel = parseInt(savedLevel);
    }
    
    document.getElementById('game-area').style.display = 'block';
    loadLevel(currentLevel);
}

/* ============================================
   LOAD LEVEL
   ============================================ */

function loadLevel(level) {
    const levelData = GAME_DATA.levels[level - 1];
    
    if (!levelData) {
        showCompletionModal();
        return;
    }

    // Reset state
    lives = 3;
    comboCount = 0;
    matches = [];
    selectedWord = null;
    selectedMeaning = null;
    timeRemaining = levelData.timeLimit;
    totalWords = levelData.words.length;

    // Update UI
    document.getElementById('current-level').textContent = level;
    updateLivesDisplay();
    updateComboDisplay();
    updateTimerDisplay();
    
    // Update story info
    document.getElementById('story-name').textContent = levelData.story;
    document.getElementById('structure-name').textContent = levelData.structure;

    // Show tutorial on first level
    if (level === 1) {
        document.getElementById('inline-tutorial').style.display = 'block';
        document.getElementById('level-info').style.display = 'none';
        document.getElementById('story-info').style.display = 'none';
        document.getElementById('game-content').style.display = 'none';
        
        currentSlide = 1;
        updateSlide();
        document.getElementById('prev-slide').style.display = 'block';
        document.getElementById('next-slide').style.display = 'block';
        document.getElementById('start-button-container').style.display = 'none';
    } else {
        showLevelStartScreen(level, levelData.story, levelData.structure);
    }

    // Load paragraph
    loadParagraph(levelData.paragraph);

    // Load cards
    loadCards(levelData.words, levelData.meanings);

    // Reset buttons
    document.getElementById('next-level').style.display = 'none';
}

function showLevelStartScreen(level, story, structure) {
    const inlineTutorial = document.getElementById('inline-tutorial');
    inlineTutorial.style.display = 'block';
    inlineTutorial.innerHTML = `
        <div class="level-ready-screen">
            <div class="tutorial-icon">🎯</div>
            <h2>Level ${level} Ready!</h2>
            <p><strong>${story}</strong> - ${structure}</p>
            <p>Click the button below to start the challenge.</p>
            <button id="quick-start-btn" class="btn btn-success btn-large-tutorial">
                ▶️ Start Level ${level}
            </button>
        </div>
    `;
    
    
    // Sembunyikan story info dan game content saat level ready screen
    document.getElementById('story-info').style.display = 'none';
    document.getElementById('game-content').style.display = 'none';
    document.getElementById('quick-start-btn').addEventListener('click', startGameWithStory);
}

function startGameWithStory() {
    document.getElementById('inline-tutorial').style.display = 'none';
    document.getElementById('level-info').style.display = 'flex';
    document.getElementById('story-info').style.display = 'flex';
    document.getElementById('game-content').style.display = 'block';
    startTimer();
}

/* ============================================
   LOAD PARAGRAPH
   ============================================ */

function loadParagraph(paragraphHTML) {
    const container = document.getElementById('paragraph-box');
    container.innerHTML = paragraphHTML;
}

/* ============================================
   LOAD CARDS
   ============================================ */

function loadCards(words, meanings) {
    const wordsContainer = document.getElementById('words-container');
    const meaningsContainer = document.getElementById('meanings-container');
    
    wordsContainer.innerHTML = '';
    meaningsContainer.innerHTML = '';
    
    // Shuffle meanings
    const shuffledMeanings = [...meanings].sort(() => Math.random() - 0.5);
    
    // Create word cards
    words.forEach(wordData => {
        const wordCard = document.createElement('div');
        wordCard.className = 'match-card word-card';
        wordCard.dataset.id = wordData.id;
        wordCard.textContent = wordData.word;
        wordCard.addEventListener('click', () => selectWord(wordData.id));
        wordsContainer.appendChild(wordCard);
    });
    
    // Create meaning cards
    shuffledMeanings.forEach(meaningData => {
        const meaningCard = document.createElement('div');
        meaningCard.className = 'match-card meaning-card';
        meaningCard.dataset.id = meaningData.id;
        meaningCard.dataset.correct = meaningData.correct;
        meaningCard.textContent = meaningData.text;
        meaningCard.addEventListener('click', () => selectMeaning(meaningData.id, meaningData.correct));
        meaningsContainer.appendChild(meaningCard);
    });
}

/* ============================================
   MATCHING LOGIC
   ============================================ */

function selectWord(id) {
    // Deselect previous word
    const previousWord = document.querySelector('.word-card.selected');
    if (previousWord) {
        previousWord.classList.remove('selected');
    }
    
    // Select new word
    selectedWord = id;
    const wordCard = document.querySelector(`.word-card[data-id="${id}"]`);
    wordCard.classList.add('selected');
    
    // Check if both selected
    if (selectedMeaning !== null) {
        checkMatch();
    }
}

function selectMeaning(id, isCorrect) {
    // Deselect previous meaning
    const previousMeaning = document.querySelector('.meaning-card.selected');
    if (previousMeaning) {
        previousMeaning.classList.remove('selected');
    }
    
    // Select new meaning
    selectedMeaning = { id, isCorrect };
    const meaningCard = document.querySelector(`.meaning-card[data-id="${id}"]`);
    meaningCard.classList.add('selected');
    
    // Check if both selected
    if (selectedWord !== null) {
        checkMatch();
    }
}

function checkMatch() {
    const wordCard = document.querySelector(`.word-card[data-id="${selectedWord}"]`);
    const meaningCard = document.querySelector(`.meaning-card[data-id="${selectedMeaning.id}"]`);
    
    // Check if IDs match AND meaning is correct
    if (selectedWord === selectedMeaning.id && selectedMeaning.isCorrect) {
        // Correct match!
        wordCard.classList.remove('selected');
        meaningCard.classList.remove('selected');
        wordCard.classList.add('matched');
        meaningCard.classList.add('matched');
        
        matches.push(selectedWord);
        comboCount++;
        
        // Calculate points based on level data (no multiplier, fixed points)
        const levelData = GAME_DATA.levels[currentLevel - 1];
        const points = levelData.pointsPerMatch;
        score += points;
        
        updateScoreDisplay();
        updateComboDisplay();
        
        // Check if all matched
        if (matches.length === totalWords) {
            setTimeout(() => {
                completeLevelSuccess();
            }, 500);
        }
    } else {
        // Wrong match!
        wordCard.classList.add('wrong');
        meaningCard.classList.add('wrong');
        
        setTimeout(() => {
            wordCard.classList.remove('wrong', 'selected');
            meaningCard.classList.remove('wrong', 'selected');
        }, 400);
        
        lives--;
        comboCount = 0;
        
        updateLivesDisplay();
        updateComboDisplay();
        
        if (lives === 0) {
            gameOver();
        }
    }
    
    // Reset selection
    selectedWord = null;
    selectedMeaning = null;
}

function getComboMultiplier() {
    if (comboCount >= 4) return GAME_DATA.comboMultipliers[4] || 3;
    if (comboCount >= 3) return GAME_DATA.comboMultipliers[3] || 2;
    if (comboCount >= 2) return GAME_DATA.comboMultipliers[2] || 1.5;
    return 1;
}

/* ============================================
   TIMER
   ============================================ */

function startTimer() {
    stopTimer();
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            stopTimer();
            gameOver();
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
    const timerElement = document.getElementById('timer');
    const levelInfoBox = document.getElementById('level-info');
    
    timerElement.textContent = timeRemaining;

    if (timeRemaining <= 10) {
        levelInfoBox.classList.add('timer-warning');
    } else {
        levelInfoBox.classList.remove('timer-warning');
    }
}

/* ============================================
   UPDATE DISPLAYS
   ============================================ */

function updateScoreDisplay() {
    // Normalize score to 100 (total raw score is 126)
    const normalizedScore = Math.round((score / 126) * 100);
    const displayScore = Math.min(normalizedScore, 100); // Cap at 100
    document.getElementById('score').textContent = displayScore;
}

function updateLivesDisplay() {
    const hearts = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
    document.getElementById('lives').textContent = hearts;
}

function updateComboDisplay() {
    document.getElementById('combo-count').textContent = comboCount;
    const multiplierElement = document.getElementById('multiplier');
    const multiplier = getComboMultiplier();
    multiplierElement.textContent = `x${multiplier}`;
    
    if (multiplier > 1) {
        multiplierElement.classList.add('active');
        setTimeout(() => multiplierElement.classList.remove('active'), 500);
    }
}

/* ============================================
   LEVEL COMPLETION & GAME OVER
   ============================================ */

function completeLevelSuccess() {
    stopTimer();
    
    // Save progress
    currentLevel++;
    saveGameProgress();
    
    // Show next level button
    document.getElementById('next-level').style.display = 'block';
    
    document.getElementById('next-level').onclick = function() {
        loadLevel(currentLevel);
    };
}

function gameOver() {
    stopTimer();
    
    const modal = document.getElementById('gameover-modal');
    modal.classList.add('active');
    
    document.getElementById('restart-level').onclick = function() {
        modal.classList.remove('active');
        loadLevel(currentLevel);
    };
}

function showCompletionModal() {
    const modal = document.getElementById('completion-modal');
    
    // Normalize score to 100 (total raw score is 126)
    const normalizedScore = Math.round((score / 126) * 100);
    const finalScore = Math.min(normalizedScore, 100); // Cap at 100
    
    document.getElementById('final-score').textContent = finalScore;
    modal.classList.add('active');
    
    localStorage.removeItem('game2-score');
    localStorage.removeItem('game2-level');
}

function saveGameProgress() {
    localStorage.setItem('game2-score', score);
    localStorage.setItem('game2-level', currentLevel);
}