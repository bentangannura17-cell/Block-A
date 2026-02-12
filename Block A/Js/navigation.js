/* ============================================
   ✨ SIMPLIFIED CAROUSEL - MOBILE PRIORITY
   - Direct touch handling
   - Aggressive event binding
   - Maximum debugging
   ============================================ */

// Game Data
const games = [
    {
        title: "Story Detective",
        desc: "Arrange story parts in the correct order to build a complete narrative",
        link: "game1-story-detective/index.html"
    },
    {
        title: "Vocabulary Matcher",
        desc: "Match words with their meanings through contextual learning",
        link: "game2-vocabulary-matcher/index.html"
    },
    {
        title: "Speed Reader",
        desc: "Read quickly and answer comprehension questions under time pressure",
        link: "game4-speed-reader/index.html"
    },
    {
        title: "Story Builder",
        desc: "Create coherent narratives by choosing the right story elements",
        link: "game3-story-builder/index.html"
    }
];

// State
let currentGame = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
let dragOffset = 0;
let velocity = 0;
let lastX = 0;
let lastTime = 0;

// Elements
let circlesWrapper = null;
let circles = null;
let contentContainer = null;
let contentCurrent = null;
let dragArea = null;

// Touch/Mouse Events
let isTouchDevice = false;
let animationFrameId = null;

/* ============================================
   INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing carousel...');
    console.log('📱 User Agent:', navigator.userAgent);
    console.log('👆 Touch Points:', navigator.maxTouchPoints);
    
    try {
        initializeElements();
        
        if (!validateElements()) {
            console.error('❌ Critical elements missing!');
            return;
        }
        
        loadProgress();
        updateUI();
        setupEventListeners();
        setupMenu();
        
        console.log('✅ Carousel initialized successfully!');
        console.log('🖐️ Touch device:', isTouchDevice);
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
});

/* ============================================
   ELEMENT INITIALIZATION
   ============================================ */

function initializeElements() {
    circlesWrapper = document.getElementById('circles-wrapper');
    circles = document.querySelectorAll('.game-circle');
    contentContainer = document.querySelector('.content-container');
    contentCurrent = document.getElementById('content-current');
    dragArea = document.querySelector('.carousel-section');
    
    console.log('📦 Elements found:', {
        circlesWrapper: !!circlesWrapper,
        circles: circles.length,
        contentContainer: !!contentContainer,
        contentCurrent: !!contentCurrent,
        dragArea: !!dragArea
    });
}

function validateElements() {
    return circlesWrapper && 
           circles && circles.length > 0 && 
           contentContainer && 
           contentCurrent &&
           dragArea;
}

/* ============================================
   EVENT LISTENERS - SIMPLIFIED & AGGRESSIVE
   ============================================ */

function setupEventListeners() {
    // Detect touch capability
    isTouchDevice = ('ontouchstart' in window) || 
                    (navigator.maxTouchPoints > 0) || 
                    (navigator.msMaxTouchPoints > 0);

    console.log('🖐️ Setting up event listeners for touch device:', isTouchDevice);

    // ✨ CRITICAL: Bind to BOTH carousel-section AND circles-wrapper
    const targets = [dragArea, circlesWrapper];
    
    targets.forEach(target => {
        if (!target) return;
        
        console.log('🎯 Binding events to:', target.className || target.id);
        
        // Touch events (ALWAYS bind, even on desktop)
        target.addEventListener('touchstart', handleDragStart, { passive: false, capture: true });
        target.addEventListener('touchmove', handleDrag, { passive: false, capture: true });
        target.addEventListener('touchend', handleDragEnd, { passive: false, capture: true });
        target.addEventListener('touchcancel', handleDragEnd, { passive: false, capture: true });
        
        // Mouse events
        target.addEventListener('mousedown', handleDragStart, { passive: false, capture: true });
    });
    
    // Global mouse events
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    
    // Also bind to each circle individually
    circles.forEach((circle, index) => {
        console.log(`🎯 Binding to circle ${index + 1}`);
        circle.addEventListener('touchstart', handleDragStart, { passive: false, capture: true });
        circle.addEventListener('mousedown', handleDragStart, { passive: false, capture: true });
    });

    // Play button
    const playButton = document.getElementById('play-button-current');
    if (playButton) {
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            const link = games[currentGame].link;
            console.log('🎮 Navigating to:', link);
            window.location.href = link;
        });
        console.log('✅ Play button listener attached');
    }

    // Keyboard navigation (desktop only)
    if (!isTouchDevice) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                navigateToGame(currentGame - 1);
            } else if (e.key === 'ArrowRight') {
                navigateToGame(currentGame + 1);
            }
        });
    }
    
    console.log('✅ All event listeners attached');
}

/* ============================================
   DRAG HANDLERS
   ============================================ */

function handleDragStart(e) {
    console.log('👆 DRAG START - Type:', e.type, 'Target:', e.target.className);
    
    isDragging = true;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    startX = clientX;
    currentX = clientX;
    lastX = clientX;
    lastTime = Date.now();
    velocity = 0;
    
    console.log('   → Start X:', clientX);
    
    // Prevent default
    e.preventDefault();
    e.stopPropagation();
    
    if (dragArea) dragArea.style.cursor = 'grabbing';
    
    // Remove transitions for instant response
    circles.forEach(circle => {
        circle.style.transition = 'none';
    });
}

function handleDrag(e) {
    if (!isDragging) return;
    
    // Get touch position correctly
    const clientX = e.type.includes('touch') ? 
        (e.touches && e.touches[0] ? e.touches[0].clientX : currentX) : 
        e.clientX;
    
    currentX = clientX;
    
    // Calculate drag offset
    const containerWidth = dragArea.offsetWidth;
    const dragDistance = currentX - startX;
    dragOffset = -dragDistance / (containerWidth * 0.5);
    
    // Clamp
    dragOffset = Math.max(-1.5, Math.min(1.5, dragOffset));
    
    // Calculate velocity
    const now = Date.now();
    const timeDiff = now - lastTime;
    if (timeDiff > 0) {
        velocity = (clientX - lastX) / timeDiff;
    }
    lastX = clientX;
    lastTime = now;
    
    // Update positions in real-time
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(updatePositions);
    
    // Fade content during drag
    if (Math.abs(dragOffset) > 0.3) {
        const fadeAmount = Math.min(1, (Math.abs(dragOffset) - 0.3) / 0.4);
        contentCurrent.style.opacity = 1 - fadeAmount * 0.5;
    } else {
        contentCurrent.style.opacity = 1;
    }
    
    // Prevent default
    if (Math.abs(dragDistance) > 5) {
        e.preventDefault();
        e.stopPropagation();
    }
}

function handleDragEnd(e) {
    if (!isDragging) return;
    
    console.log('👋 DRAG END - Velocity:', velocity.toFixed(3), 'Offset:', dragOffset.toFixed(3));
    
    isDragging = false;
    if (dragArea) dragArea.style.cursor = 'grab';
    
    // Determine direction based on velocity or distance
    let indexChange = 0;
    
    if (Math.abs(velocity) > 0.3) {
        // Fast swipe
        indexChange = velocity > 0 ? -1 : 1;
        console.log('   ⚡ Fast swipe detected:', indexChange);
    } else if (Math.abs(dragOffset) > 0.5) {
        // Slow drag past threshold
        indexChange = dragOffset > 0 ? 1 : -1;
        console.log('   🐌 Slow drag detected:', indexChange);
    } else {
        console.log('   ↩️ Snap back - no navigation');
    }
    
    // Navigate to new game
    const newGame = currentGame + indexChange;
    navigateToGame(newGame);
}

/* ============================================
   NAVIGATION
   ============================================ */

function navigateToGame(index) {
    // Wrap around
    if (index < 0) index = games.length - 1;
    if (index >= games.length) index = 0;
    
    console.log('🎯 Navigate: Current', currentGame, '→ New', index);
    
    if (index === currentGame) {
        // Reset positions
        dragOffset = 0;
        updatePositions();
        return;
    }
    
    // Update current game
    currentGame = index;
    
    // Save progress
    saveProgress();
    
    // Reset drag offset
    dragOffset = 0;
    
    // Re-enable transitions
    circles.forEach(circle => {
        circle.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Update positions
    updatePositions();
    
    // Update content with fade effect
    contentCurrent.style.transition = 'opacity 0.3s ease';
    contentCurrent.style.opacity = 0;
    
    setTimeout(() => {
        updateContentData();
        contentCurrent.style.opacity = 1;
    }, 300);
}

/* ============================================
   POSITION CALCULATION
   ============================================ */

function updatePositions() {
    const containerWidth = dragArea.offsetWidth;
    
    circles.forEach((circle, index) => {
        // Position relative to current
        let position = index - currentGame - dragOffset;
        
        // Circular wrapping
        if (position > 2) position -= games.length;
        if (position < -2) position += games.length;
        
        // Calculate transforms
        let translateX, scale, opacity, zIndex;
        
        if (Math.abs(position) < 0.01) {
            // CENTER CIRCLE - ZOOM IN
            translateX = 0;
            scale = 1.15;
            opacity = 1;
            zIndex = 10;
        } else if (Math.abs(position) === 1) {
            // ADJACENT CIRCLES
            translateX = position * 168;
            scale = 0.85;
            opacity = 0.7;
            zIndex = 8;
        } else if (Math.abs(position) > 1 && Math.abs(position) < 2) {
            // FAR CIRCLES
            translateX = position * 185;
            scale = 0.65;
            opacity = 0.4;
            zIndex = 5;
        } else {
            // HIDDEN CIRCLES
            translateX = position * 205;
            scale = 0.5;
            opacity = 0;
            zIndex = 1;
        }
        
        // Apply transform
        circle.style.transform = `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`;
        circle.style.opacity = opacity;
        circle.style.zIndex = zIndex;
    });
}

/* ============================================
   UI UPDATES
   ============================================ */

function updateUI() {
    updateContentData();
    updatePositions();
}

function updateContentData() {
    const game = games[currentGame];
    
    // Update title
    const titleEl = document.getElementById('game-title-current');
    if (titleEl) titleEl.textContent = game.title;
    
    // Update description
    const descEl = document.getElementById('game-desc-current');
    if (descEl) descEl.textContent = game.desc;
    
    // Update stats
    updateStats();
    
    // Update play button
    const playBtn = document.getElementById('play-button-current');
    if (playBtn) {
        playBtn.href = game.link;
        const btnText = playBtn.querySelector('span');
        if (btnText) {
            btnText.textContent = `Play ${game.title} Now`;
        } else {
            playBtn.textContent = `Play ${game.title} Now`;
        }
    }
}

function updateStats() {
    const gameScores = [
        parseInt(localStorage.getItem('game1-score') || 0),
        parseInt(localStorage.getItem('game2-score') || 0),
        parseInt(localStorage.getItem('game4-score') || 0),
        parseInt(localStorage.getItem('game3-score') || 0)
    ];

    const gameLevels = [
        parseInt(localStorage.getItem('game1-level') || 0),
        parseInt(localStorage.getItem('game2-level') || 0),
        parseInt(localStorage.getItem('game4-level') || 0),
        parseInt(localStorage.getItem('game3-level') || 0)
    ];

    const maxLevels = [5, 6, 15, 1];

    // Update score
    const scoreEl = document.getElementById('game-score-current');
    if (scoreEl) scoreEl.textContent = gameScores[currentGame];
    
    // Update progress
    const progressEl = document.getElementById('game-progress-current');
    if (progressEl) {
        const progress = gameLevels[currentGame] > 0 
            ? Math.floor((gameLevels[currentGame] / maxLevels[currentGame]) * 100)
            : 0;
        progressEl.textContent = `${progress}%`;
    }

    // Update total score in menu
    const totalScoreEl = document.getElementById('total-score');
    if (totalScoreEl) {
        const totalScore = gameScores.reduce((a, b) => a + b, 0);
        totalScoreEl.textContent = totalScore;
    }
}

/* ============================================
   MENU FUNCTIONALITY
   ============================================ */

function setupMenu() {
    const menuButton = document.getElementById('menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const resetButton = document.getElementById('reset-progress');

    if (!menuButton || !closeMenuButton || !sideMenu || !overlay || !resetButton) {
        console.warn('⚠️ Menu elements not found');
        return;
    }

    function openMenu() {
        sideMenu.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        sideMenu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuButton.addEventListener('click', openMenu);
    closeMenuButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    resetButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            localStorage.removeItem('game1-score');
            localStorage.removeItem('game1-level');
            localStorage.removeItem('game2-score');
            localStorage.removeItem('game2-level');
            localStorage.removeItem('game3-score');
            localStorage.removeItem('game3-level');
            localStorage.removeItem('game4-score');
            localStorage.removeItem('game4-level');
            localStorage.removeItem('carousel-position');
            
            currentGame = 0;
            updateUI();
            closeMenu();
            
            alert('All progress has been reset!');
        }
    });
}

/* ============================================
   PROGRESS PERSISTENCE
   ============================================ */

function saveProgress() {
    try {
        localStorage.setItem('carousel-position', currentGame);
    } catch (e) {
        console.warn('Could not save progress:', e);
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('carousel-position');
        if (saved !== null) {
            const savedIndex = parseInt(saved);
            if (savedIndex >= 0 && savedIndex < games.length) {
                currentGame = savedIndex;
                console.log('📍 Restored position:', currentGame);
            }
        }
    } catch (e) {
        console.warn('Could not load progress:', e);
    }
}

/* ============================================
   WINDOW RESIZE HANDLER
   ============================================ */

let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        updatePositions();
    }, 100);
});

/* ============================================
   DEBUGGING - Remove after testing
   ============================================ */

// Log touch events to console
document.addEventListener('touchstart', function(e) {
    console.log('🌍 Global touchstart detected on:', e.target.className || e.target.tagName);
}, { passive: true });