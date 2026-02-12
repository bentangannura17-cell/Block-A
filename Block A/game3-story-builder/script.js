/* GAME 3: STORY BUILDER - LOGIC */

let currentStage = 1;
let score = 0;
let storyChoices = {
    character: null,
    setting: null,
    problem: null,
    action: null,
    resolution: null
};
let selectedOption = null;

// Tutorial state
let currentTutorialStep = 1;
const totalTutorialSteps = 5;

document.addEventListener('DOMContentLoaded', function() {
    loadGameProgress();
    setupTutorialNavigation();
    setupStoryCarousel();
});

function loadGameProgress() {
    const savedScore = localStorage.getItem('game3-score');
    if (savedScore) {
        score = parseInt(savedScore);
    }
}

// ================================
// STORY SIDEBAR CAROUSEL - OPTIMIZED DRAG TO SCROLL
// ================================
function setupStoryCarousel() {
    const wrapper = document.getElementById('story-table-wrapper');
    
    if (!wrapper) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastX = 0;
    let lastTime = Date.now();
    let momentumID;
    
    // Prevent text selection and click events during drag
    wrapper.addEventListener('selectstart', (e) => {
        if (isDown) e.preventDefault();
    });
    
    // Mouse events for desktop
    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        wrapper.style.cursor = 'grabbing';
        wrapper.style.scrollBehavior = 'auto';
        
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
        lastX = e.pageX;
        lastTime = Date.now();
        velocity = 0;
        
        // Cancel any ongoing momentum
        cancelMomentumTracking();
        
        // Prevent text selection
        e.preventDefault();
    });
    
    wrapper.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            wrapper.style.cursor = 'grab';
            wrapper.style.scrollBehavior = 'smooth';
            beginMomentumTracking();
        }
    });
    
    wrapper.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            wrapper.style.cursor = 'grab';
            wrapper.style.scrollBehavior = 'smooth';
            beginMomentumTracking();
        }
    });
    
    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        wrapper.scrollLeft = scrollLeft - walk;
        
        // Calculate velocity for momentum
        const now = Date.now();
        const elapsed = now - lastTime;
        if (elapsed > 0) {
            velocity = (e.pageX - lastX) / elapsed;
        }
        lastX = e.pageX;
        lastTime = now;
    });
    
    // Touch events for mobile - optimized
    let touchStartX = 0;
    let touchScrollLeft = 0;
    let touchLastX = 0;
    let touchLastTime = Date.now();
    let touchVelocity = 0;
    
    wrapper.addEventListener('touchstart', (e) => {
        wrapper.style.scrollBehavior = 'auto';
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = wrapper.scrollLeft;
        touchLastX = e.touches[0].pageX;
        touchLastTime = Date.now();
        touchVelocity = 0;
        
        // Cancel any ongoing momentum
        cancelMomentumTracking();
    }, { passive: true });
    
    wrapper.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX;
        const walk = (x - touchStartX) * 1.5; // Scroll speed for touch
        wrapper.scrollLeft = touchScrollLeft - walk;
        
        // Calculate velocity for momentum
        const now = Date.now();
        const elapsed = now - touchLastTime;
        if (elapsed > 0) {
            touchVelocity = (x - touchLastX) / elapsed;
        }
        touchLastX = x;
        touchLastTime = now;
    }, { passive: true });
    
    wrapper.addEventListener('touchend', () => {
        wrapper.style.scrollBehavior = 'smooth';
        velocity = touchVelocity;
        beginMomentumTracking();
    }, { passive: true });
    
    // Momentum scrolling
    function beginMomentumTracking() {
        cancelMomentumTracking();
        if (Math.abs(velocity) > 0.1) {
            momentumID = requestAnimationFrame(momentumLoop);
        }
    }
    
    function cancelMomentumTracking() {
        if (momentumID) {
            cancelAnimationFrame(momentumID);
            momentumID = null;
        }
    }
    
    function momentumLoop() {
        wrapper.scrollLeft -= velocity * 30;
        velocity *= 0.92; // Friction factor
        
        if (Math.abs(velocity) > 0.05) {
            momentumID = requestAnimationFrame(momentumLoop);
        } else {
            cancelMomentumTracking();
        }
    }
    
    // Prevent click events on links/buttons during drag
    let isDragging = false;
    
    wrapper.addEventListener('mousedown', () => {
        isDragging = false;
    });
    
    wrapper.addEventListener('mousemove', () => {
        if (isDown) isDragging = true;
    });
    
    wrapper.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
    
    // Set initial cursor style
    wrapper.style.cursor = 'grab';
}

// ================================
// TUTORIAL NAVIGATION SYSTEM
// ================================
function setupTutorialNavigation() {
    const nextBtn = document.getElementById('next-tutorial');
    const prevBtn = document.getElementById('prev-tutorial');
    const startBtn = document.getElementById('start-game');
    const dots = document.querySelectorAll('.dot');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToTutorialStep(currentTutorialStep + 1));
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToTutorialStep(currentTutorialStep - 1));
    }
    
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
    
    // Add click handlers to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const step = parseInt(this.getAttribute('data-step'));
            goToTutorialStep(step);
        });
    });
}

function goToTutorialStep(step) {
    if (step < 1 || step > totalTutorialSteps) return;
    
    // Hide current step
    const currentStep = document.querySelector('.tutorial-step.active');
    if (currentStep) {
        currentStep.classList.remove('active');
    }
    
    // Show new step
    const newStep = document.querySelector(`.tutorial-step[data-step="${step}"]`);
    if (newStep) {
        newStep.classList.add('active');
    }
    
    // Update current step
    currentTutorialStep = step;
    
    // Update progress dots
    updateTutorialDots();
    
    // Update navigation buttons
    updateTutorialButtons();
}

function updateTutorialDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        const dotStep = index + 1;
        dot.classList.remove('active', 'completed');
        
        if (dotStep === currentTutorialStep) {
            dot.classList.add('active');
        } else if (dotStep < currentTutorialStep) {
            dot.classList.add('completed');
        }
    });
}

function updateTutorialButtons() {
    const nextBtn = document.getElementById('next-tutorial');
    const prevBtn = document.getElementById('prev-tutorial');
    const startBtn = document.getElementById('start-game');
    
    // Enable/disable previous button
    if (currentTutorialStep === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    
    // Show/hide next and start buttons
    if (currentTutorialStep === totalTutorialSteps) {
        nextBtn.style.display = 'none';
        startBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        startBtn.style.display = 'none';
    }
}

// ================================
// GAME LOGIC
// ================================
function startGame() {
    document.getElementById('tutorial-screen').classList.remove('active');
    const gameArea = document.getElementById('game-area');
    
    if (window.innerWidth >= 768) {
        gameArea.style.display = 'grid';
    } else {
        gameArea.style.display = 'flex';
    }
    
    loadStage(1);
}

function loadStage(stage) {
    currentStage = stage;
    selectedOption = null;
    
    document.getElementById('current-stage').textContent = stage;
    
    const confirmBtn = document.getElementById('confirm-choice');
    const backBtn = document.getElementById('back-button');
    const feedbackBtn = document.getElementById('see-feedback');
    
    confirmBtn.style.display = 'none';
    confirmBtn.disabled = true;
    confirmBtn.classList.remove('active', 'fade-in');
    feedbackBtn.style.display = 'none';
    
    // Show back button if not first stage
    if (stage > 1) {
        backBtn.style.display = 'block';
    } else {
        backBtn.style.display = 'none';
    }
    
    const stageData = GAME_DATA.stages[stage - 1];
    document.getElementById('stage-title').textContent = stageData.question;
    
    // Set data-stage attribute untuk styling font yang berbeda
    const selectionArea = document.querySelector('.selection-area');
    selectionArea.setAttribute('data-stage', stage);
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    let options = [];
    
    switch(stage) {
        case 1: // Character
            options = GAME_DATA.characters;
            break;
        case 2: // Setting
            options = GAME_DATA.settings;
            break;
        case 3: // Problem
            options = GAME_DATA.problems[storyChoices.setting.id] || [];
            break;
        case 4: // Action
            const problemKey = Object.keys(GAME_DATA.actions).find(key => 
                storyChoices.problem.text.toLowerCase().includes(key)
            ) || 'default';
            options = GAME_DATA.actions[problemKey] || GAME_DATA.actions.default;
            break;
        case 5: // Resolution
            options = GAME_DATA.resolutions;
            break;
    }
    
    options.forEach(option => {
        const card = createOptionCard(option, stage);
        container.appendChild(card);
    });
    
    updateStoryPreview();
}

function createOptionCard(option, stage) {
    const card = document.createElement('div');
    card.className = 'option-card';
    
    if (option.icon) {
        card.innerHTML = `
            <div class="option-icon">${option.icon}</div>
            <div class="option-name">${option.name || option.text}</div>
        `;
    } else {
        card.innerHTML = `<div class="option-name">${option.text}</div>`;
    }
    
    card.addEventListener('click', function() {
        document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedOption = option;
        
        const confirmBtn = document.getElementById('confirm-choice');
        confirmBtn.style.display = 'block';
        confirmBtn.disabled = false;
        
        // Remove fade-in class and trigger reflow to restart animation
        confirmBtn.classList.remove('fade-in');
        void confirmBtn.offsetWidth; // Trigger reflow
        confirmBtn.classList.add('fade-in', 'active');
    });
    
    return card;
}

// Back button handler
document.getElementById('back-button').addEventListener('click', function() {
    if (currentStage > 1) {
        // Clear current stage choice
        switch(currentStage) {
            case 2:
                storyChoices.character = null;
                break;
            case 3:
                storyChoices.setting = null;
                break;
            case 4:
                storyChoices.problem = null;
                break;
            case 5:
                storyChoices.action = null;
                break;
        }
        
        loadStage(currentStage - 1);
        updateCoherence();
    }
});

// Confirm button handler
document.getElementById('confirm-choice').addEventListener('click', function(e) {
    // Prevent any default behavior
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedOption) return;
    
    switch(currentStage) {
        case 1:
            storyChoices.character = selectedOption;
            break;
        case 2:
            storyChoices.setting = selectedOption;
            break;
        case 3:
            storyChoices.problem = selectedOption;
            break;
        case 4:
            storyChoices.action = selectedOption;
            break;
        case 5:
            storyChoices.resolution = selectedOption;
            // Show feedback button instead of going directly to feedback
            document.getElementById('confirm-choice').style.display = 'none';
            document.getElementById('back-button').style.display = 'none';
            
            const feedbackBtn = document.getElementById('see-feedback');
            feedbackBtn.style.display = 'block';
            feedbackBtn.classList.remove('fade-in');
            void feedbackBtn.offsetWidth;
            feedbackBtn.classList.add('fade-in');
            
            updateStoryPreview();
            updateCoherence();
            return;
    }
    
    updateCoherence();
    
    if (currentStage < 5) {
        loadStage(currentStage + 1);
    }
});

// See feedback button handler
document.getElementById('see-feedback').addEventListener('click', function() {
    showFeedbackPage();
});

function updateStoryPreview() {
    const characterCell = document.getElementById('story-character');
    const settingCell = document.getElementById('story-setting');
    const problemCell = document.getElementById('story-problem');
    const actionCell = document.getElementById('story-action');
    const resolutionCell = document.getElementById('story-resolution');
    
    if (characterCell) {
        if (storyChoices.character) {
            characterCell.textContent = `${storyChoices.character.icon} ${storyChoices.character.name}`;
        } else {
            characterCell.textContent = '-';
        }
    }
    
    if (settingCell) {
        if (storyChoices.setting) {
            settingCell.textContent = `${storyChoices.setting.icon} ${storyChoices.setting.name}`;
        } else {
            settingCell.textContent = '-';
        }
    }
    
    if (problemCell) {
        if (storyChoices.problem) {
            problemCell.textContent = storyChoices.problem.text;
        } else {
            problemCell.textContent = '-';
        }
    }
    
    if (actionCell) {
        if (storyChoices.action) {
            actionCell.textContent = storyChoices.action.text;
        } else {
            actionCell.textContent = '-';
        }
    }
    
    if (resolutionCell) {
        if (storyChoices.resolution) {
            resolutionCell.textContent = storyChoices.resolution.text;
        } else {
            resolutionCell.textContent = '-';
        }
    }
}

function updateCoherence() {
    let coherence = 100;
    
    if (storyChoices.character && storyChoices.setting) {
        coherence = storyChoices.character.coherence[storyChoices.setting.id] || 50;
    }
    
    if (storyChoices.problem) {
        coherence = Math.floor((coherence + storyChoices.problem.coherence) / 2);
    }
    
    if (storyChoices.action) {
        coherence = Math.floor((coherence + storyChoices.action.coherence) / 2);
    }
    
    if (storyChoices.resolution) {
        coherence = Math.floor((coherence + storyChoices.resolution.coherence) / 2);
    }
    
    document.getElementById('coherence-fill').style.width = coherence + '%';
    document.getElementById('coherence-percent').textContent = coherence + '%';
}

function showFeedbackPage() {
    const coherence = parseInt(document.getElementById('coherence-percent').textContent);
    let points = 0;
    let feedback = '';
    let grade = '';
    
    // Optimized scoring system - Maximum 100 points
    if (coherence >= 95) {
        points = 100;
        grade = 'S';
        feedback = 'Perfect coherence! Masterpiece story! 🌟✨';
    } else if (coherence >= 90) {
        points = 95;
        grade = 'A+';
        feedback = 'Excellent coherence! Amazing story! ⭐';
    } else if (coherence >= 85) {
        points = 90;
        grade = 'A';
        feedback = 'Great coherence! Very good story! 🎉';
    } else if (coherence >= 80) {
        points = 85;
        grade = 'A-';
        feedback = 'Very good coherence! Strong story! 💫';
    } else if (coherence >= 75) {
        points = 80;
        grade = 'B+';
        feedback = 'Good coherence! Nice story! 👍';
    } else if (coherence >= 70) {
        points = 75;
        grade = 'B';
        feedback = 'Good coherence! Decent story! 😊';
    } else if (coherence >= 65) {
        points = 70;
        grade = 'B-';
        feedback = 'Fairly good coherence! Story works! ✓';
    } else if (coherence >= 60) {
        points = 65;
        grade = 'C+';
        feedback = 'Acceptable coherence! Story is okay! 👌';
    } else if (coherence >= 55) {
        points = 60;
        grade = 'C';
        feedback = 'Moderate coherence! Story makes sense! 🙂';
    } else if (coherence >= 50) {
        points = 55;
        grade = 'C-';
        feedback = 'Below average coherence! Some parts work! 😐';
    } else if (coherence >= 40) {
        points = 45;
        grade = 'D';
        feedback = 'Low coherence! Story needs work! 🤔';
    } else if (coherence >= 30) {
        points = 35;
        grade = 'D-';
        feedback = 'Poor coherence! Story is confusing! 😕';
    } else {
        points = 25;
        grade = 'F';
        feedback = 'Very low coherence! Try different choices! 💭';
    }
    
    score += points;
    
    const finalStory = `
        <p><strong>Orientation:</strong> A ${storyChoices.character.icon} ${storyChoices.character.name} lived in the ${storyChoices.setting.icon} ${storyChoices.setting.name}.</p>
        <p><strong>Complication:</strong> One day, the ${storyChoices.character.name} ${storyChoices.problem.text}.</p>
        <p><strong>Action:</strong> The ${storyChoices.character.name} ${storyChoices.action.text}.</p>
        <p><strong>Resolution:</strong> In the end, the ${storyChoices.character.name} ${storyChoices.resolution.text}.</p>
    `;
    
    document.getElementById('final-story').innerHTML = finalStory;
    document.getElementById('final-score').textContent = score;
    document.getElementById('coherence-feedback').textContent = feedback;
    
    localStorage.setItem('game3-score', score);
    localStorage.setItem('game3-level', 1);
    
    // Hide game area and show feedback page
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('feedback-page').style.display = 'block';
}