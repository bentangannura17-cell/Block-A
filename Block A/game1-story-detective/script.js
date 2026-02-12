/* ============================================
   GAME 1: STORY DETECTIVE - COMBINED VERSION
   Inline Tutorial (New) + Game Logic (Old)
   ============================================ */

// Game State Variables
let currentLevel = 1;
let score = 0;
let attempts = 0;
let currentSlide = 1;
const TOTAL_SLIDES = 4;

// Drag and Drop State
let draggedCard = null;
let currentLevelData = null;
let autoAdvanceTimer = null; // PERBAIKAN: Timer untuk auto-advance

// Drag & drop variables for mobile
let sourceZone = null;
let touchStartX = 0;
let touchStartY = 0;
let currentDropTarget = null;

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    loadGameProgress();
    setupInlineTutorial();
});

/* ============================================
   INLINE TUTORIAL NAVIGATION (NEW)
   ============================================ */

function setupInlineTutorial() {
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const startBtn = document.getElementById('start-game-btn');
    const dots = document.querySelectorAll('.slide-dot');

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentSlide > 1) {
                currentSlide--;
                updateSlide();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentSlide < TOTAL_SLIDES) {
                currentSlide++;
                updateSlide();
            } else {
                showStartButtonInTutorial();
            }
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentSlide = parseInt(this.dataset.slide);
            updateSlide();
        });
    });

    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
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
        nextBtn.textContent = 'Got it!';
    } else {
        nextBtn.textContent = 'Next';
        if (startButtonContainer) {
            startButtonContainer.style.display = 'none';
        }
    }
}

function showStartButtonInTutorial() {
    document.getElementById('tutorial-nav').style.display = 'none';
    const startContainer = document.getElementById('start-button-container');
    startContainer.style.display = 'block';
    startContainer.classList.add('slide-up');
}

function startGame() {
    document.getElementById('inline-tutorial').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    loadLevel(currentLevel);
}

/* ============================================
   LOAD GAME PROGRESS
   ============================================ */

function loadGameProgress() {
    const savedScore = localStorage.getItem('game1-score');
    const savedLevel = localStorage.getItem('game1-level');
    
    if (savedScore) {
        score = parseInt(savedScore);
        updateScoreDisplay();
    }
    
    if (savedLevel) {
        currentLevel = parseInt(savedLevel);
    }
}

function saveGameProgress() {
    localStorage.setItem('game1-score', score);
    localStorage.setItem('game1-level', currentLevel);
}

/* ============================================
   LOAD LEVEL
   ============================================ */

function loadLevel(level) {
    currentLevelData = GAME_DATA.levels[level - 1];
    
    if (!currentLevelData) {
        showCompletionModal();
        return;
    }
    
    // Reset state
    attempts = 0;
    
    // Update UI
    document.getElementById('current-level').textContent = level;
    document.getElementById('attempts').textContent = attempts;
    updateProgressBar();
    
    // Clear drop zones
    clearDropZones();
    
    // Load cards
    loadCards();
    
    // Setup drag and drop
    setupDragAndDrop();
    
    // Reset buttons
    document.getElementById('next-level').style.display = 'none';
}

function loadCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    // Shuffle cards
    const shuffledCards = [...currentLevelData.cards].sort(() => Math.random() - 0.5);
    
    shuffledCards.forEach((card, index) => {
        const cardElement = createCard(card, index + 1);
        container.appendChild(cardElement);
    });
}

function createCard(card, number) {
    const div = document.createElement('div');
    div.className = 'story-card';
    div.draggable = true;
    div.dataset.id = card.id;
    div.dataset.type = card.type;
    
    div.innerHTML = `
        <div class="card-image-placeholder">
            <span>Image ${number}</span>
        </div>
        <div class="card-text">${card.text}</div>
        <div class="card-number">${number}</div>
    `;
    
    return div;
}

/* ============================================
   DRAG AND DROP SETUP
   ============================================ */

function setupDragAndDrop() {
    const cards = document.querySelectorAll('.story-card');
    const dropAreas = document.querySelectorAll('.drop-area');
    const cardsContainer = document.getElementById('cards-container');
    
    // Desktop drag events
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
    
    dropAreas.forEach(area => {
        area.addEventListener('dragover', handleDragOver);
        area.addEventListener('dragenter', handleDragEnter);
        area.addEventListener('dragleave', handleDragLeave);
        area.addEventListener('drop', handleDrop);
    });
    
    // PERBAIKAN: Tambahkan event listener untuk cards container agar bisa menerima drop
    cardsContainer.addEventListener('dragover', handleDragOver);
    cardsContainer.addEventListener('dragenter', handleDragEnter);
    cardsContainer.addEventListener('dragleave', handleDragLeave);
    cardsContainer.addEventListener('drop', handleDropToCardsContainer);
    
    // Mobile touch events
    cards.forEach(card => {
        card.addEventListener('touchstart', handleTouchStart, {passive: false});
        card.addEventListener('touchmove', handleTouchMove, {passive: false});
        card.addEventListener('touchend', handleTouchEnd, {passive: false});
    });
}

/* ============================================
   DESKTOP DRAG HANDLERS
   ============================================ */

function handleDragStart(e) {
    draggedCard = this;
    sourceZone = this.closest('.drop-area');
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove drag-over class from all drop areas
    document.querySelectorAll('.drop-area').forEach(area => {
        area.classList.remove('drag-over');
    });
    
    // PERBAIKAN: Remove drag-over from cards container
    document.getElementById('cards-container').classList.remove('drag-over');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    e.preventDefault();
    // PERBAIKAN: Tambahkan drag-over ke drop-area juga
    if (this.classList.contains('drop-area')) {
        this.classList.add('drag-over');
    } else {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    // Only remove if we're actually leaving this element
    if (e.target === this) {
        this.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedCard) return;
    
    const dropArea = this;
    
    // Hide placeholder
    const placeholder = dropArea.querySelector('.placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    // Get existing card in drop zone
    const existingCard = dropArea.querySelector('.story-card');
    
    // PERBAIKAN: Logika swap yang lebih baik
    if (existingCard && existingCard !== draggedCard) {
        // Ada kartu di drop zone, lakukan swap
        if (sourceZone && sourceZone !== dropArea) {
            // Swap: pindahkan existing card ke source zone
            sourceZone.appendChild(existingCard);
            sourceZone.querySelector('.placeholder').style.display = 'none';
        } else if (!sourceZone) {
            // Dragged dari cards container, kembalikan existing card ke container
            document.getElementById('cards-container').appendChild(existingCard);
        }
    }
    
    // Pindahkan dragged card ke drop area
    dropArea.appendChild(draggedCard);
    
    // Show placeholder in source if it's empty and is a drop zone
    if (sourceZone && sourceZone !== dropArea) {
        const sourcePlaceholder = sourceZone.querySelector('.placeholder');
        if (!sourceZone.querySelector('.story-card') && sourcePlaceholder) {
            sourcePlaceholder.style.display = 'block';
        }
    }
    
    dropArea.classList.remove('drag-over');
    draggedCard = null;
    sourceZone = null;
}

// PERBAIKAN: Handler baru untuk drop ke cards container
function handleDropToCardsContainer(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedCard) return;
    
    const cardsContainer = document.getElementById('cards-container');
    
    // Pindahkan kartu ke cards container
    cardsContainer.appendChild(draggedCard);
    
    // Show placeholder in source zone if empty
    if (sourceZone) {
        const sourcePlaceholder = sourceZone.querySelector('.placeholder');
        if (!sourceZone.querySelector('.story-card') && sourcePlaceholder) {
            sourcePlaceholder.style.display = 'block';
        }
    }
    
    cardsContainer.classList.remove('drag-over');
    draggedCard = null;
    sourceZone = null;
}

/* ============================================
   MOBILE TOUCH HANDLERS
   ============================================ */

function handleTouchStart(e) {
    e.preventDefault();
    draggedCard = this;
    sourceZone = this.closest('.drop-area');
    this.classList.add('dragging');
    
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    
    // PERBAIKAN: Simpan ukuran asli kartu sebelum mengubah position
    const originalWidth = this.offsetWidth;
    const originalHeight = this.offsetHeight;
    
    // Store original position
    this.style.position = 'fixed';
    this.style.zIndex = '1000';
    this.style.width = originalWidth + 'px';
    this.style.height = originalHeight + 'px';
    this.style.left = touch.clientX - (originalWidth / 2) + 'px';
    this.style.top = touch.clientY - (originalHeight / 2) + 'px';
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!draggedCard) return;
    
    const touch = e.touches[0];
    draggedCard.style.left = touch.clientX - (draggedCard.offsetWidth / 2) + 'px';
    draggedCard.style.top = touch.clientY - (draggedCard.offsetHeight / 2) + 'px';
    
    // Highlight drop zone under touch
    const dropZones = document.querySelectorAll('.drop-area');
    const cardsContainer = document.getElementById('cards-container');
    let foundTarget = false;
    
    dropZones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
            touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
            zone.classList.add('drag-over');
            currentDropTarget = zone;
            foundTarget = true;
        } else {
            zone.classList.remove('drag-over');
        }
    });
    
    // PERBAIKAN: Check if touch is over cards container
    const containerRect = cardsContainer.getBoundingClientRect();
    if (touch.clientX >= containerRect.left && touch.clientX <= containerRect.right &&
        touch.clientY >= containerRect.top && touch.clientY <= containerRect.bottom) {
        cardsContainer.classList.add('drag-over');
        currentDropTarget = cardsContainer;
        foundTarget = true;
    } else {
        cardsContainer.classList.remove('drag-over');
    }
    
    if (!foundTarget) {
        currentDropTarget = null;
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    if (!draggedCard) return;
    
    draggedCard.classList.remove('dragging');
    draggedCard.style.position = '';
    draggedCard.style.zIndex = '';
    draggedCard.style.left = '';
    draggedCard.style.top = '';
    draggedCard.style.width = '';  // PERBAIKAN: Reset width
    draggedCard.style.height = ''; // PERBAIKAN: Reset height
    
    // Remove all drag-over classes
    document.querySelectorAll('.drop-area').forEach(zone => {
        zone.classList.remove('drag-over');
    });
    document.getElementById('cards-container').classList.remove('drag-over');
    
    if (currentDropTarget) {
        // PERBAIKAN: Check if dropping to cards container
        if (currentDropTarget.id === 'cards-container') {
            // Drop to cards container
            currentDropTarget.appendChild(draggedCard);
            
            // Show placeholder in source zone if empty
            if (sourceZone) {
                const sourcePlaceholder = sourceZone.querySelector('.placeholder');
                if (!sourceZone.querySelector('.story-card') && sourcePlaceholder) {
                    sourcePlaceholder.style.display = 'block';
                }
            }
        } else {
            // Drop to drop zone
            // Hide placeholder
            const placeholder = currentDropTarget.querySelector('.placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            
            // Get existing card
            const existingCard = currentDropTarget.querySelector('.story-card');
            
            // PERBAIKAN: Swap logic yang lebih baik
            if (existingCard) {
                if (sourceZone && sourceZone !== currentDropTarget) {
                    // Swap: existing card goes to source zone
                    sourceZone.appendChild(existingCard);
                    sourceZone.querySelector('.placeholder').style.display = 'none';
                } else if (!sourceZone) {
                    // Return existing card to cards container
                    document.getElementById('cards-container').appendChild(existingCard);
                }
            }
            
            // Add dragged card
            currentDropTarget.appendChild(draggedCard);
            
            // Show placeholder in source if empty
            if (sourceZone && sourceZone !== currentDropTarget) {
                const sourcePlaceholder = sourceZone.querySelector('.placeholder');
                if (!sourceZone.querySelector('.story-card') && sourcePlaceholder) {
                    sourcePlaceholder.style.display = 'block';
                }
            }
        }
    } else {
        // Return to original position if no drop target
        if (sourceZone) {
            sourceZone.appendChild(draggedCard);
        } else {
            document.getElementById('cards-container').appendChild(draggedCard);
        }
    }
    
    draggedCard = null;
    sourceZone = null;
    currentDropTarget = null;
}

function clearDropZones() {
    const dropAreas = document.querySelectorAll('.drop-area');
    dropAreas.forEach(area => {
        // Show placeholder
        const placeholder = area.querySelector('.placeholder');
        if (placeholder) {
            placeholder.style.display = 'block';
        }
        
        // Remove any cards
        const card = area.querySelector('.story-card');
        if (card) {
            card.remove();
        }
    });
}

/* ============================================
   CHECK ANSWER
   ============================================ */

document.getElementById('check-answer').addEventListener('click', checkAnswer);

function checkAnswer() {
    attempts++;
    document.getElementById('attempts').textContent = attempts;
    
    const orientationZone = document.getElementById('drop-orientation');
    const complicationZone = document.getElementById('drop-complication');
    const resolutionZone = document.getElementById('drop-resolution');
    
    const orientationCard = orientationZone.querySelector('.story-card');
    const complicationCard = complicationZone.querySelector('.story-card');
    const resolutionCard = resolutionZone.querySelector('.story-card');
    
    // Check if all zones are filled
    if (!orientationCard || !complicationCard || !resolutionCard) {
        showToast('warning', 'Please complete all sections before submitting.');
        return;
    }
    
    // Check if answers are correct
    const orientationCorrect = orientationCard.dataset.type === 'orientation';
    const complicationCorrect = complicationCard.dataset.type === 'complication';
    const resolutionCorrect = resolutionCard.dataset.type === 'resolution';
    
    if (orientationCorrect && complicationCorrect && resolutionCorrect) {
        // Calculate points
        let points = currentLevelData.points;
        if (attempts === 1) {
            points = currentLevelData.points; // 100%
        } else if (attempts <= 3) {
            points = Math.floor(currentLevelData.points * 0.7); // 70%
        } else {
            points = Math.floor(currentLevelData.points * 0.5); // 50%
        }
        
        score += points;
        updateScoreDisplay();
        saveGameProgress();
        
        // PERBAIKAN: Tampilkan toast dan auto-advance setelah 5 detik
        showToast('success', 'Excellent! Your story sequence is correct.');
        
        // Hide check button, show next level button
        document.getElementById('check-answer').style.display = 'none';
        document.getElementById('next-level').style.display = 'block';
        
        // Auto-advance setelah 5 detik
        autoAdvanceTimer = setTimeout(() => {
            document.getElementById('next-level').click();
        }, 5000);
        
    } else {
        showToast('error', 'The sequence is incorrect. Please review and try again.');
    }
}

/* ============================================
   HINT BUTTON
   ============================================ */

document.getElementById('hint-button').addEventListener('click', function() {
    const hint = GAME_DATA.hints[currentLevel] || 'Think about the story structure!';
    // Keep using modal for hints as they need more space
    showFeedback('info', 'Hint', hint);
});

/* ============================================
   NEXT LEVEL
   ============================================ */

document.getElementById('next-level').addEventListener('click', function() {
    // PERBAIKAN: Clear auto-advance timer jika user klik manual
    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }
    
    currentLevel++;
    
    if (currentLevel > 5) {
        showCompletionModal();
    } else {
        document.getElementById('check-answer').style.display = 'block';
        this.style.display = 'none';
        saveGameProgress();
        loadLevel(currentLevel);
    }
});

/* ============================================
   UI UPDATES
   ============================================ */

function updateScoreDisplay() {
    document.getElementById('score').textContent = score;
}

function updateProgressBar() {
    const progress = ((currentLevel - 1) / 5) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
}

/* ============================================
   TOAST NOTIFICATION (NEW)
   ============================================ */

function showToast(type, message) {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    const toastTimer = document.getElementById('toast-timer');
    
    // Set message
    toastMessage.textContent = message;
    
    // Remove previous classes
    toast.classList.remove('success', 'error', 'warning', 'show');
    
    // Add new type class
    toast.classList.add(type);
    
    // Reset timer animation
    toastTimer.style.animation = 'none';
    setTimeout(() => {
        toastTimer.style.animation = '';
    }, 10);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

/* ============================================
   FEEDBACK MODAL (KEPT FOR HINTS ONLY)
   ============================================ */

function showFeedback(type, message, explanation) {
    const modal = document.getElementById('feedback-modal');
    const messageEl = document.getElementById('feedback-message');
    const explanationEl = document.getElementById('feedback-explanation');
    
    messageEl.textContent = message;
    messageEl.style.background = type === 'success' ? '#d4edda' : 
                                 type === 'error' ? '#f8d7da' : '#d1ecf1';
    messageEl.style.color = type === 'success' ? '#155724' : 
                           type === 'error' ? '#721c24' : '#0c5460';
    
    explanationEl.textContent = explanation;
    
    modal.classList.add('active');
}

document.getElementById('close-feedback').addEventListener('click', function() {
    document.getElementById('feedback-modal').classList.remove('active');
});

/* ============================================
   COMPLETION MODAL
   ============================================ */

function showCompletionModal() {
    const modal = document.getElementById('completion-modal');
    document.getElementById('final-score').textContent = score;
    modal.classList.add('active');
    
    // Clear saved progress
    localStorage.removeItem('game1-score');
    localStorage.removeItem('game1-level');
}