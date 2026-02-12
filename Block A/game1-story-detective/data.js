/* ============================================
   GAME 1: STORY DETECTIVE - DATA
   All level data, cards, and stories
   ============================================ */

const GAME_DATA = {
    levels: [
        // ========== LEVEL 1: CINDERELLA ==========
        {
            level: 1,
            storyLength: 150,
            difficulty: "easy",
            points: 20,
            cards: [
                {
                    id: 1,
                    text: "Cinderella lived with her cruel stepmother and stepsisters.",
                    type: "orientation",
                    emoji: "👗"
                },
                {
                    id: 2,
                    text: "She wanted to go to the ball, but had nothing to wear.",
                    type: "complication",
                    emoji: "💔"
                },
                {
                    id: 3,
                    text: "Her fairy godmother appeared and gave her a beautiful dress.",
                    type: "resolution",
                    emoji: "✨"
                }
            ]
        },

        // ========== LEVEL 2: LITTLE RED RIDING HOOD ==========
        {
            level: 2,
            storyLength: 200,
            difficulty: "easy",
            points: 20,
            cards: [
                {
                    id: 1,
                    text: "Little Red Riding Hood walked through the forest to visit her grandmother.",
                    type: "orientation",
                    emoji: "🧺"
                },
                {
                    id: 2,
                    text: "A big bad wolf tricked her and went to grandmother's house first.",
                    type: "complication",
                    emoji: "🐺"
                },
                {
                    id: 3,
                    text: "A brave woodcutter saved them from the wolf.",
                    type: "resolution",
                    emoji: "🪓"
                },
                {
                    id: 4,
                    text: "The forest had many tall trees.",
                    type: "distractor",
                    emoji: "🌲"
                }
            ]
        },

        // ========== LEVEL 3: THE THREE LITTLE PIGS ==========
        {
            level: 3,
            storyLength: 250,
            difficulty: "medium",
            points: 20,
            cards: [
                {
                    id: 1,
                    text: "Three little pigs left home to build their own houses.",
                    type: "orientation",
                    emoji: "🐷"
                },
                {
                    id: 2,
                    text: "A wolf came and blew down the straw and stick houses.",
                    type: "complication",
                    emoji: "💨"
                },
                {
                    id: 3,
                    text: "The pigs were safe in the brick house that the wolf couldn't destroy.",
                    type: "resolution",
                    emoji: "🧱"
                },
                {
                    id: 4,
                    text: "The sky was blue and sunny.",
                    type: "distractor",
                    emoji: "☀️"
                },
                {
                    id: 5,
                    text: "Birds sang beautiful songs.",
                    type: "distractor",
                    emoji: "🐦"
                }
            ]
        },

        // ========== LEVEL 4: RAPUNZEL ==========
        {
            level: 4,
            storyLength: 300,
            difficulty: "medium",
            points: 20,
            cards: [
                {
                    id: 1,
                    text: "Rapunzel was locked in a tall tower by a wicked witch.",
                    type: "orientation",
                    emoji: "🗼"
                },
                {
                    id: 2,
                    text: "She had very long hair, but no way to escape from the tower.",
                    type: "complication",
                    emoji: "💇‍♀️"
                },
                {
                    id: 3,
                    text: "A prince climbed her hair and rescued her from the tower.",
                    type: "resolution",
                    emoji: "🤴"
                },
                {
                    id: 4,
                    text: "The tower was made of stone.",
                    type: "distractor",
                    emoji: "🏰"
                },
                {
                    id: 5,
                    text: "There were gardens around the area.",
                    type: "distractor",
                    emoji: "🌺"
                },
                {
                    id: 6,
                    text: "The weather was pleasant that day.",
                    type: "distractor",
                    emoji: "🌤️"
                }
            ]
        },

        // ========== LEVEL 5: PINOCCHIO ==========
        {
            level: 5,
            storyLength: 350,
            difficulty: "hard",
            points: 20,
            cards: [
                {
                    id: 1,
                    text: "Geppetto the woodcarver made a wooden puppet named Pinocchio.",
                    type: "orientation",
                    emoji: "🪵"
                },
                {
                    id: 2,
                    text: "Pinocchio kept lying and his nose grew longer each time he lied.",
                    type: "complication",
                    emoji: "🤥"
                },
                {
                    id: 3,
                    text: "He learned to be honest and became a real boy.",
                    type: "resolution",
                    emoji: "👦"
                },
                {
                    id: 4,
                    text: "Geppetto had a workshop full of tools.",
                    type: "distractor",
                    emoji: "🔨"
                },
                {
                    id: 5,
                    text: "The village was peaceful and quiet.",
                    type: "distractor",
                    emoji: "🏘️"
                },
                {
                    id: 6,
                    text: "There was a beautiful blue fairy.",
                    type: "distractor",
                    emoji: "🧚"
                }
            ]
        }
    ],

    // Hints for each level
    hints: {
        1: "Think about what happens first - who is Cinderella and what is her situation?",
        2: "Remember: the distractor doesn't move the story forward!",
        3: "What problem do the pigs face after building their houses?",
        4: "Watch out for details that don't affect the main story!",
        5: "Think about cause and effect - what happened because Pinocchio lied?"
    },

    // Explanations for correct answers
    explanations: {
        orientation: "ORIENTATION introduces the characters, setting (place), and time. It answers: Who? Where? When?",
        complication: "COMPLICATION presents the problem or conflict in the story. It answers: What's the problem? What happened?",
        resolution: "RESOLUTION shows how the problem was solved or how the story ended. It answers: How did it end? What was the solution?"
    }
};

// Export for use in script.js
window.GAME_DATA = GAME_DATA;