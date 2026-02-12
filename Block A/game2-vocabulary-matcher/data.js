/* ============================================
   GAME 2: VOCABULARY MATCHER - 6 LEVELS
   2 Popular Stories for A1 Level
   Maximum Score: 100 points
   ============================================ */

const GAME_DATA = {
    levels: [
        // ==========================================
        // STORY 1: THE THREE LITTLE PIGS
        // ==========================================
        
        // === LEVEL 1: ORIENTATION (2 words, 4 meanings) ===
        {
            level: 1,
            story: "The Three Little Pigs",
            structure: "Beginning",
            difficulty: "easy",
            timeLimit: 60,
            pointsPerMatch: 8, // 2 words × 8 = 16 points
            paragraph: "Three little pigs lived with their mother. One day, mother pig said, 'You are <span class='highlight'>BIG</span> now. Go and build your own houses.' The first pig was <span class='highlight'>LAZY</span>. He built his house with straw because it was easy and fast.",
            
            words: [
                { id: 1, word: "BIG" },
                { id: 2, word: "LAZY" }
            ],
            
            meanings: [
                { id: 1, text: "Not small", correct: true },
                { id: 2, text: "Does not want to work", correct: true },
                { id: 3, text: "Very clean", correct: false },
                { id: 4, text: "Very fast", correct: false }
            ]
        },

        // === LEVEL 2: COMPLICATION (3 words, 5 meanings) ===
        {
            level: 2,
            story: "The Three Little Pigs",
            structure: "Problem",
            difficulty: "medium",
            timeLimit: 100,
            pointsPerMatch: 8, // 3 words × 8 = 24 points
            paragraph: "A <span class='highlight'>BAD</span> wolf came to the first pig's house. The wolf was very <span class='highlight'>HUNGRY</span>. He said, 'Little pig, open the door!' The pig was <span class='highlight'>AFRAID</span> and said, 'No! Go away!' The wolf blew down the straw house easily.",
            
            words: [
                { id: 1, word: "BAD" },
                { id: 2, word: "HUNGRY" },
                { id: 3, word: "AFRAID" }
            ],
            
            meanings: [
                { id: 1, text: "Not good", correct: true },
                { id: 2, text: "Wants to eat", correct: true },
                { id: 3, text: "Feeling scared", correct: true },
                { id: 4, text: "Very happy", correct: false },
                { id: 5, text: "Very strong", correct: false }
            ]
        },

        // === LEVEL 3: RESOLUTION (4 words, 6 meanings) ===
        {
            level: 3,
            story: "The Three Little Pigs",
            structure: "Solution",
            difficulty: "hard",
            timeLimit: 150,
            pointsPerMatch: 8, // 4 words × 8 = 32 points
            paragraph: "The third pig was very <span class='highlight'>SMART</span>. He built a <span class='highlight'>STRONG</span> house with bricks. The wolf could not blow it down. The wolf was very <span class='highlight'>ANGRY</span>. Finally, the wolf ran away. The three pigs were <span class='highlight'>SAFE</span> and happy in the brick house.",
            
            words: [
                { id: 1, word: "SMART" },
                { id: 2, word: "STRONG" },
                { id: 3, word: "ANGRY" },
                { id: 4, word: "SAFE" }
            ],
            
            meanings: [
                { id: 1, text: "Very clever", correct: true },
                { id: 2, text: "Not weak", correct: true },
                { id: 3, text: "Very mad", correct: true },
                { id: 4, text: "Not in danger", correct: true },
                { id: 5, text: "Very sad", correct: false },
                { id: 6, text: "Very slow", correct: false }
            ]
        },

        // ==========================================
        // STORY 2: CINDERELLA
        // ==========================================
        
        // === LEVEL 4: ORIENTATION (3 words, 5 meanings) ===
        {
            level: 4,
            story: "Cinderella",
            structure: "Beginning",
            difficulty: "medium",
            timeLimit: 100,
            pointsPerMatch: 6, // 3 words × 6 = 18 points
            paragraph: "Cinderella lived with her stepmother and two stepsisters. They were very <span class='highlight'>MEAN</span> to her. Cinderella had to do all the housework. She was always <span class='highlight'>TIRED</span> and <span class='highlight'>SAD</span>. But Cinderella was always kind and never complained.",
            
            words: [
                { id: 1, word: "MEAN" },
                { id: 2, word: "TIRED" },
                { id: 3, word: "SAD" }
            ],
            
            meanings: [
                { id: 1, text: "Not kind or nice", correct: true },
                { id: 2, text: "Needs to rest", correct: true },
                { id: 3, text: "Not happy", correct: true },
                { id: 4, text: "Very excited", correct: false },
                { id: 5, text: "Full of energy", correct: false }
            ]
        },

        // === LEVEL 5: COMPLICATION (3 words, 5 meanings) ===
        {
            level: 5,
            story: "Cinderella",
            structure: "Problem",
            difficulty: "medium",
            timeLimit: 100,
            pointsPerMatch: 6, // 3 words × 6 = 18 points
            paragraph: "The prince invited everyone to a <span class='highlight'>BEAUTIFUL</span> ball at the palace. Cinderella wanted to go, but she had no <span class='highlight'>NICE</span> dress. She was very <span class='highlight'>UPSET</span>. Her stepsisters went to the ball in their fancy dresses, leaving Cinderella alone at home.",
            
            words: [
                { id: 1, word: "BEAUTIFUL" },
                { id: 2, word: "NICE" },
                { id: 3, word: "UPSET" }
            ],
            
            meanings: [
                { id: 1, text: "Very pretty", correct: true },
                { id: 2, text: "Good and pleasant", correct: true },
                { id: 3, text: "Unhappy and worried", correct: true },
                { id: 4, text: "Very old", correct: false },
                { id: 5, text: "Very loud", correct: false }
            ]
        },

        // === LEVEL 6: RESOLUTION (3 words, 5 meanings) ===
        {
            level: 6,
            story: "Cinderella",
            structure: "Solution",
            difficulty: "medium",
            timeLimit: 100,
            pointsPerMatch: 6, // 3 words × 6 = 18 points
            paragraph: "A fairy godmother appeared and made Cinderella <span class='highlight'>READY</span> for the ball. At the ball, the prince thought Cinderella was the most <span class='highlight'>WONDERFUL</span> girl. They danced together and fell in love. Cinderella married the prince and they lived <span class='highlight'>HAPPILY</span> ever after.",
            
            words: [
                { id: 1, word: "READY" },
                { id: 2, word: "WONDERFUL" },
                { id: 3, word: "HAPPILY" }
            ],
            
            meanings: [
                { id: 1, text: "Prepared to go", correct: true },
                { id: 2, text: "Amazing and great", correct: true },
                { id: 3, text: "In a happy way", correct: true },
                { id: 4, text: "Very quickly", correct: false },
                { id: 5, text: "Very quietly", correct: false }
            ]
        }
    ],

    // Combo multipliers (removed - scoring is now fixed per match)
    comboMultipliers: {
        2: 1,
        3: 1,
        4: 1
    },

    // Maximum total score
    maxScore: 100 // Total: 16 + 24 + 32 + 18 + 18 + 18 = 126, will be normalized to 100
};

// Export for use in script.js
window.GAME_DATA = GAME_DATA;