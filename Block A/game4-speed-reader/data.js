/* GAME 4: SPEED READER - DATA (15 ROUNDS) */
const GAME_DATA = {
    rounds: [
        // ========================================
        // ROUNDS 1-5: EASY (50 points, 30 seconds)
        // ========================================
        {
            round: 1,
            paragraph: "A clever cat lived in a small house. Every morning, the cat would chase mice in the garden. The cat was very fast and always caught them.",
            question: "Where did the cat chase mice?",
            options: ["A. In the house", "B. In the garden", "C. In the street", "D. In the forest"],
            correct: 1,
            maxPoints: 50,
            timeLimit: 30
        },
        {
            round: 2,
            paragraph: "A small bird built a nest on a tall tree. Every day, the bird would sing beautiful songs. People in the village loved to hear the bird sing.",
            question: "What did the bird do every day?",
            options: ["A. Build nests", "B. Fly away", "C. Sing songs", "D. Eat food"],
            correct: 2,
            maxPoints: 50,
            timeLimit: 30
        },
        {
            round: 3,
            paragraph: "Tom had a red ball. He played with it in the park every afternoon. One day, the ball rolled into a pond. Tom was sad because he couldn't get it back.",
            question: "Why was Tom sad?",
            options: ["A. He lost his ball", "B. It was raining", "C. He had no friends", "D. The park closed"],
            correct: 0,
            maxPoints: 50,
            timeLimit: 30
        },
        {
            round: 4,
            paragraph: "Lisa loves to read books. She goes to the library every week. Her favorite books are about animals and nature. She wants to be a scientist when she grows up.",
            question: "What does Lisa want to be?",
            options: ["A. A teacher", "B. A scientist", "C. A librarian", "D. A writer"],
            correct: 1,
            maxPoints: 50,
            timeLimit: 30
        },
        {
            round: 5,
            paragraph: "A lazy dog slept under a big tree. A busy ant walked by carrying food. The ant worked hard all day while the dog just slept and slept.",
            question: "Who worked hard all day?",
            options: ["A. The dog", "B. The tree", "C. The ant", "D. Both animals"],
            correct: 2,
            maxPoints: 50,
            timeLimit: 30
        },
        
        // ========================================
        // ROUNDS 6-10: MEDIUM (65 points, 40 seconds)
        // ========================================
        {
            round: 6,
            paragraph: "Long ago, there was a wise old owl who lived in a tall oak tree. Every night, animals from all over the forest came to ask the owl for advice. The owl always gave helpful answers.",
            question: "When did animals visit the owl?",
            options: ["A. In the morning", "B. At noon", "C. Every night", "D. In the afternoon"],
            correct: 2,
            maxPoints: 65,
            timeLimit: 40
        },
        {
            round: 7,
            paragraph: "Sarah wanted to learn how to swim. At first, she was afraid of deep water. Her father taught her slowly and patiently. After many weeks of practice, Sarah could finally swim across the pool by herself.",
            question: "What helped Sarah learn to swim?",
            options: ["A. Her friends", "B. A book", "C. Practice and her father", "D. The swimming pool"],
            correct: 2,
            maxPoints: 65,
            timeLimit: 40
        },
        {
            round: 8,
            paragraph: "A young rabbit wanted to cross a wide river. The rabbit was afraid because the water was moving very fast. Then, a kind turtle offered to help. The turtle carried the rabbit safely across the river on its back.",
            question: "Why was the rabbit afraid?",
            options: ["A. The turtle was scary", "B. The water was moving fast", "C. It was night", "D. There were fish"],
            correct: 1,
            maxPoints: 65,
            timeLimit: 40
        },
        {
            round: 9,
            paragraph: "Every morning, Mr. Brown walks his dog in the park. Today, he noticed that all the flowers were blooming. The park looked more beautiful than ever. He decided to bring his camera tomorrow to take pictures.",
            question: "What will Mr. Brown bring tomorrow?",
            options: ["A. His dog", "B. Flowers", "C. A camera", "D. Water"],
            correct: 2,
            maxPoints: 65,
            timeLimit: 40
        },
        {
            round: 10,
            paragraph: "The old lighthouse stood on a rocky cliff by the sea. For a hundred years, it had guided ships safely to shore. Even in the worst storms, the lighthouse never stopped shining its bright light across the dark waters.",
            question: "What is the main idea of this passage?",
            options: ["A. Lighthouses are old", "B. The lighthouse helps ships for many years", "C. Storms are dangerous", "D. The sea is dark"],
            correct: 1,
            maxPoints: 65,
            timeLimit: 40
        },
        
        // ========================================
        // ROUNDS 11-15: HARD (80 points, 60 seconds)
        // ========================================
        {
            round: 11,
            paragraph: "In a busy village, there lived a poor but honest farmer. One day, he found a bag of gold coins on the road. Instead of keeping it, the farmer searched for the owner. Finally, he returned the gold to a rich merchant. The merchant was so happy that he gave the farmer a reward.",
            question: "What is the main idea of this story?",
            options: ["A. Being rich is important", "B. Honesty is rewarded", "C. Finding gold is lucky", "D. Farmers work hard"],
            correct: 1,
            maxPoints: 80,
            timeLimit: 60
        },
        {
            round: 12,
            paragraph: "Once upon a time, a greedy fox saw some grapes hanging from a vine. The fox jumped and jumped but couldn't reach them. After many tries, the fox gave up and walked away, saying 'Those grapes are probably sour anyway.' But the truth was, the grapes were perfectly sweet - the fox just couldn't admit failure.",
            question: "What lesson does this story teach?",
            options: ["A. Grapes are always sour", "B. Foxes can't jump high", "C. People make excuses when they fail", "D. Vines grow grapes"],
            correct: 2,
            maxPoints: 80,
            timeLimit: 60
        },
        {
            round: 13,
            paragraph: "Maria's grandmother told her a story about when she was young. During the war, food was scarce and life was hard. But the community worked together, sharing what little they had. Her grandmother said that those difficult times taught her that kindness and cooperation matter more than wealth.",
            question: "According to the grandmother, what is most important?",
            options: ["A. Having lots of food", "B. Avoiding difficult times", "C. Kindness and cooperation", "D. Being wealthy"],
            correct: 2,
            maxPoints: 80,
            timeLimit: 60
        },
        {
            round: 14,
            paragraph: "The ancient library contained thousands of old books. Dr. Chen spent years studying them to learn about forgotten civilizations. She discovered that these ancient people had advanced knowledge of astronomy and mathematics. This finding challenged what historians previously believed about early human societies.",
            question: "What did Dr. Chen's discovery challenge?",
            options: ["A. The library's age", "B. Previous beliefs about early humans", "C. Knowledge of astronomy", "D. The number of books"],
            correct: 1,
            maxPoints: 80,
            timeLimit: 60
        },
        {
            round: 15,
            paragraph: "Two hikers were lost in the mountains as night fell. One panicked and wanted to keep walking in the dark. The other stayed calm and suggested they build a shelter and wait for morning. They followed the calm hiker's advice. At sunrise, they could see the trail clearly and found their way back safely.",
            question: "Why did the hikers find their way back?",
            options: ["A. They kept walking at night", "B. Someone rescued them", "C. They stayed calm and waited for daylight", "D. They had a map"],
            correct: 2,
            maxPoints: 80,
            timeLimit: 60
        }
    ]
};

window.GAME_DATA = GAME_DATA;