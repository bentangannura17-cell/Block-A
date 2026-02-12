/* GAME 3: STORY BUILDER - DATA */

const GAME_DATA = {
    characters: [
        { id: 'fox', name: 'Fox', icon: '🦊', coherence: { forest: 100, river: 60, mountain: 70, village: 50, cave: 80, castle: 45 } },
        { id: 'bear', name: 'Bear', icon: '�', coherence: { forest: 95, river: 70, mountain: 90, village: 40, cave: 100, castle: 50 } },
        { id: 'eagle', name: 'Eagle', icon: '🦅', coherence: { forest: 80, river: 60, mountain: 100, village: 50, cave: 75, castle: 85 } }
    ],

    settings: [
        { id: 'forest', name: 'Forest', icon: '🌲' },
        { id: 'river', name: 'River', icon: '🌊' },
        { id: 'mountain', name: 'Mountain', icon: '⛰️' },
        { id: 'village', name: 'Village', icon: '🏘️' },
        { id: 'cave', name: 'Cave', icon: '🕳️' },
        { id: 'castle', name: 'Castle', icon: '🏰' }
    ],

    problems: {
        forest: [
            { id: 1, text: 'got lost in the dark woods', coherence: 90 },
            { id: 2, text: 'was very hungry and needed food', coherence: 100 },
            { id: 3, text: 'needed to find water', coherence: 60 },
            { id: 4, text: 'was chased by a predator', coherence: 85 },
            { id: 5, text: 'found an injured animal', coherence: 75 },
            { id: 6, text: 'discovered a mysterious path', coherence: 80 },
            { id: 7, text: 'heard strange howling sounds', coherence: 88 },
            { id: 8, text: 'fell into a hidden trap', coherence: 82 },
            { id: 9, text: 'encountered a raging storm', coherence: 92 },
            { id: 10, text: 'found ancient ruins', coherence: 78 },
            { id: 11, text: 'was separated from family', coherence: 95 },
            { id: 12, text: 'discovered poisonous plants', coherence: 70 }
        ],
        river: [
            { id: 1, text: 'couldn\'t swim across', coherence: 90 },
            { id: 2, text: 'was caught in strong current', coherence: 100 },
            { id: 3, text: 'couldn\'t find the way home', coherence: 70 },
            { id: 4, text: 'saw something shiny underwater', coherence: 75 },
            { id: 5, text: 'met a stranger asking for help', coherence: 80 },
            { id: 6, text: 'noticed the water was polluted', coherence: 85 },
            { id: 7, text: 'slipped on wet rocks', coherence: 88 },
            { id: 8, text: 'heard cries from across the river', coherence: 82 },
            { id: 9, text: 'found a broken bridge', coherence: 92 },
            { id: 10, text: 'spotted a waterfall ahead', coherence: 78 },
            { id: 11, text: 'was swept downstream', coherence: 95 },
            { id: 12, text: 'encountered rapids', coherence: 93 }
        ],
        mountain: [
            { id: 1, text: 'got stuck on a steep cliff', coherence: 100 },
            { id: 2, text: 'was cold and needed shelter', coherence: 90 },
            { id: 3, text: 'heard strange noises', coherence: 70 },
            { id: 4, text: 'encountered a snowstorm', coherence: 95 },
            { id: 5, text: 'found a hidden cave entrance', coherence: 85 },
            { id: 6, text: 'slipped and hurt their leg', coherence: 88 },
            { id: 7, text: 'ran out of energy', coherence: 82 },
            { id: 8, text: 'faced thin mountain air', coherence: 87 },
            { id: 9, text: 'witnessed an avalanche', coherence: 98 },
            { id: 10, text: 'lost the trail in fog', coherence: 91 },
            { id: 11, text: 'found precious minerals', coherence: 76 },
            { id: 12, text: 'saw a dangerous ledge', coherence: 89 }
        ],
        village: [
            { id: 1, text: 'needed help from villagers', coherence: 90 },
            { id: 2, text: 'was chased by dogs', coherence: 80 },
            { id: 3, text: 'wanted to find friends', coherence: 100 },
            { id: 4, text: 'was accused of stealing', coherence: 85 },
            { id: 5, text: 'saw smoke coming from a house', coherence: 95 },
            { id: 6, text: 'heard a child crying', coherence: 88 },
            { id: 7, text: 'was afraid of humans', coherence: 83 },
            { id: 8, text: 'found a lost item', coherence: 78 },
            { id: 9, text: 'witnessed an argument', coherence: 72 },
            { id: 10, text: 'smelled delicious food', coherence: 86 },
            { id: 11, text: 'heard festive music', coherence: 81 },
            { id: 12, text: 'saw a market closing', coherence: 75 }
        ],
        cave: [
            { id: 1, text: 'got lost in the darkness', coherence: 100 },
            { id: 2, text: 'heard echoing sounds', coherence: 85 },
            { id: 3, text: 'found ancient drawings', coherence: 80 },
            { id: 4, text: 'slipped on wet rocks', coherence: 90 },
            { id: 5, text: 'saw glowing crystals', coherence: 75 },
            { id: 6, text: 'felt the ground shaking', coherence: 88 },
            { id: 7, text: 'discovered underground water', coherence: 82 },
            { id: 8, text: 'encountered bats flying', coherence: 92 },
            { id: 9, text: 'found bones on the floor', coherence: 86 },
            { id: 10, text: 'heard dripping water', coherence: 78 },
            { id: 11, text: 'saw strange shadows', coherence: 91 },
            { id: 12, text: 'found multiple tunnels', coherence: 84 }
        ],
        castle: [
            { id: 1, text: 'was locked in a tower', coherence: 95 },
            { id: 2, text: 'heard mysterious footsteps', coherence: 85 },
            { id: 3, text: 'found a secret passage', coherence: 90 },
            { id: 4, text: 'was chased by guards', coherence: 88 },
            { id: 5, text: 'discovered a magical artifact', coherence: 80 },
            { id: 6, text: 'needed to warn the king', coherence: 100 },
            { id: 7, text: 'heard bells ringing', coherence: 82 },
            { id: 8, text: 'found a hidden library', coherence: 86 },
            { id: 9, text: 'saw a banquet hall', coherence: 79 },
            { id: 10, text: 'encountered a knight', coherence: 93 },
            { id: 11, text: 'discovered a dungeon', coherence: 91 },
            { id: 12, text: 'climbed the castle walls', coherence: 87 }
        ]
    },

    actions: {
        'lost': [
            { id: 1, text: 'followed the stars to navigate', coherence: 90 },
            { id: 2, text: 'climbed a tall tree to look around', coherence: 85 },
            { id: 3, text: 'asked other animals for help', coherence: 100 },
            { id: 4, text: 'retraced their steps carefully', coherence: 95 },
            { id: 5, text: 'followed a stream downhill', coherence: 88 },
            { id: 6, text: 'stayed calm and thought clearly', coherence: 80 },
            { id: 7, text: 'marked trees to avoid circles', coherence: 92 },
            { id: 8, text: 'listened for familiar sounds', coherence: 87 },
            { id: 9, text: 'waited for daylight', coherence: 83 },
            { id: 10, text: 'followed bird migrations', coherence: 86 },
            { id: 11, text: 'used the sun as a guide', coherence: 91 },
            { id: 12, text: 'remembered landmarks', coherence: 89 }
        ],
        'hungry': [
            { id: 1, text: 'searched for berries and nuts', coherence: 100 },
            { id: 2, text: 'hunted for small prey', coherence: 90 },
            { id: 3, text: 'found a garden', coherence: 70 },
            { id: 4, text: 'dug for roots and mushrooms', coherence: 85 },
            { id: 5, text: 'followed birds to food sources', coherence: 88 },
            { id: 6, text: 'waited patiently by a trap', coherence: 82 },
            { id: 7, text: 'fished in nearby water', coherence: 93 },
            { id: 8, text: 'foraged for edible plants', coherence: 87 },
            { id: 9, text: 'stored food for later', coherence: 79 },
            { id: 10, text: 'shared food with others', coherence: 84 },
            { id: 11, text: 'searched in hollow trees', coherence: 86 },
            { id: 12, text: 'tracked scent of food', coherence: 91 }
        ],
        'water': [
            { id: 1, text: 'listened for the sound of water', coherence: 100 },
            { id: 2, text: 'followed bird tracks', coherence: 85 },
            { id: 3, text: 'dug a hole', coherence: 60 },
            { id: 4, text: 'looked for green vegetation', coherence: 90 },
            { id: 5, text: 'collected morning dew', coherence: 75 },
            { id: 6, text: 'searched in rocky areas', coherence: 80 },
            { id: 7, text: 'followed animal trails', coherence: 92 },
            { id: 8, text: 'searched in low areas', coherence: 88 },
            { id: 9, text: 'watched for insects', coherence: 83 },
            { id: 10, text: 'smelled the air for moisture', coherence: 86 },
            { id: 11, text: 'followed downhill paths', coherence: 94 },
            { id: 12, text: 'checked under rocks', coherence: 78 }
        ],
        'swim': [
            { id: 1, text: 'found floating logs to help', coherence: 100 },
            { id: 2, text: 'waited for shallow water', coherence: 90 },
            { id: 3, text: 'jumped across stones', coherence: 85 },
            { id: 4, text: 'built a simple raft', coherence: 95 },
            { id: 5, text: 'found a narrow crossing point', coherence: 88 },
            { id: 6, text: 'asked a friendly beaver for help', coherence: 82 },
            { id: 7, text: 'looked for a bridge', coherence: 93 },
            { id: 8, text: 'practiced swimming first', coherence: 86 },
            { id: 9, text: 'tested the water depth', coherence: 89 },
            { id: 10, text: 'swam with the current', coherence: 91 },
            { id: 11, text: 'held onto branches', coherence: 84 },
            { id: 12, text: 'waited for calmer water', coherence: 87 }
        ],
        'chased': [
            { id: 1, text: 'ran as fast as possible', coherence: 85 },
            { id: 2, text: 'hid in a hollow tree', coherence: 100 },
            { id: 3, text: 'climbed to safety', coherence: 95 },
            { id: 4, text: 'used a clever distraction', coherence: 90 },
            { id: 5, text: 'found a secret escape route', coherence: 88 },
            { id: 6, text: 'called for help from friends', coherence: 92 },
            { id: 7, text: 'zigzagged to confuse pursuer', coherence: 87 },
            { id: 8, text: 'jumped over obstacles', coherence: 83 },
            { id: 9, text: 'ducked into bushes', coherence: 91 },
            { id: 10, text: 'ran downhill quickly', coherence: 86 },
            { id: 11, text: 'used camouflage', coherence: 89 },
            { id: 12, text: 'crossed water to lose scent', coherence: 94 }
        ],
        'cold': [
            { id: 1, text: 'found a warm shelter', coherence: 100 },
            { id: 2, text: 'built a fire carefully', coherence: 95 },
            { id: 3, text: 'huddled with other animals', coherence: 90 },
            { id: 4, text: 'gathered dry leaves for warmth', coherence: 85 },
            { id: 5, text: 'dug into the snow for insulation', coherence: 88 },
            { id: 6, text: 'kept moving to stay warm', coherence: 80 },
            { id: 7, text: 'found a sunny spot', coherence: 92 },
            { id: 8, text: 'wrapped in thick fur', coherence: 87 },
            { id: 9, text: 'sought protected areas', coherence: 91 },
            { id: 10, text: 'ate to maintain energy', coherence: 84 },
            { id: 11, text: 'found a cave entrance', coherence: 96 },
            { id: 12, text: 'stayed out of wind', coherence: 89 }
        ],
        'help': [
            { id: 1, text: 'rushed to assist immediately', coherence: 95 },
            { id: 2, text: 'gathered others to help', coherence: 100 },
            { id: 3, text: 'used special skills to solve it', coherence: 90 },
            { id: 4, text: 'thought of a creative solution', coherence: 88 },
            { id: 5, text: 'stayed calm and took charge', coherence: 85 },
            { id: 6, text: 'found the right tools needed', coherence: 82 },
            { id: 7, text: 'assessed the situation first', coherence: 92 },
            { id: 8, text: 'provided comfort and support', coherence: 87 },
            { id: 9, text: 'shared resources generously', coherence: 91 },
            { id: 10, text: 'organized a rescue team', coherence: 94 },
            { id: 11, text: 'used wisdom and experience', coherence: 89 },
            { id: 12, text: 'acted quickly and decisively', coherence: 93 }
        ],
        'scared': [
            { id: 1, text: 'took deep breaths to calm down', coherence: 88 },
            { id: 2, text: 'found courage within', coherence: 92 },
            { id: 3, text: 'remembered past successes', coherence: 85 },
            { id: 4, text: 'sought safety first', coherence: 95 },
            { id: 5, text: 'talked to self encouragingly', coherence: 80 },
            { id: 6, text: 'stayed still and observed', coherence: 87 },
            { id: 7, text: 'relied on instincts', coherence: 91 },
            { id: 8, text: 'backed away slowly', coherence: 89 },
            { id: 9, text: 'made self appear bigger', coherence: 84 },
            { id: 10, text: 'called for backup', coherence: 86 },
            { id: 11, text: 'found a safe hiding spot', coherence: 93 },
            { id: 12, text: 'assessed all options', coherence: 82 }
        ],
        'injured': [
            { id: 1, text: 'rested to recover energy', coherence: 90 },
            { id: 2, text: 'found healing herbs', coherence: 88 },
            { id: 3, text: 'cleaned the wound carefully', coherence: 95 },
            { id: 4, text: 'sought help from others', coherence: 100 },
            { id: 5, text: 'applied natural remedies', coherence: 85 },
            { id: 6, text: 'stayed still to heal', coherence: 92 },
            { id: 7, text: 'wrapped the injury', coherence: 87 },
            { id: 8, text: 'avoided putting weight on it', coherence: 91 },
            { id: 9, text: 'found a safe place to rest', coherence: 94 },
            { id: 10, text: 'kept the wound dry', coherence: 83 },
            { id: 11, text: 'ate nutritious food', coherence: 86 },
            { id: 12, text: 'stayed patient during recovery', coherence: 89 }
        ],
        'discover': [
            { id: 1, text: 'investigated carefully', coherence: 92 },
            { id: 2, text: 'approached with caution', coherence: 88 },
            { id: 3, text: 'examined every detail', coherence: 85 },
            { id: 4, text: 'shared the discovery', coherence: 90 },
            { id: 5, text: 'documented the findings', coherence: 82 },
            { id: 6, text: 'tested if it was safe', coherence: 95 },
            { id: 7, text: 'took a sample to study', coherence: 87 },
            { id: 8, text: 'marked the location', coherence: 91 },
            { id: 9, text: 'returned for more research', coherence: 84 },
            { id: 10, text: 'protected the discovery', coherence: 89 },
            { id: 11, text: 'sought expert opinion', coherence: 86 },
            { id: 12, text: 'photographed it mentally', coherence: 83 }
        ],
        'default': [
            { id: 1, text: 'thought of a clever plan', coherence: 80 },
            { id: 2, text: 'asked for help', coherence: 90 },
            { id: 3, text: 'used courage and determination', coherence: 85 },
            { id: 4, text: 'tried different approaches', coherence: 82 },
            { id: 5, text: 'stayed patient and persistent', coherence: 88 },
            { id: 6, text: 'learned from past experiences', coherence: 86 },
            { id: 7, text: 'adapted to the situation', coherence: 92 },
            { id: 8, text: 'remained calm under pressure', coherence: 87 },
            { id: 9, text: 'used available resources', coherence: 91 },
            { id: 10, text: 'took one step at a time', coherence: 84 },
            { id: 11, text: 'believed in themselves', coherence: 89 },
            { id: 12, text: 'never gave up trying', coherence: 93 }
        ]
    },

    resolutions: [
        { id: 1, text: 'found the way home safely', coherence: 90 },
        { id: 2, text: 'learned an important lesson', coherence: 100 },
        { id: 3, text: 'made new friends', coherence: 85 },
        { id: 4, text: 'became stronger and wiser', coherence: 95 },
        { id: 5, text: 'helped others in need', coherence: 92 },
        { id: 6, text: 'discovered hidden courage', coherence: 88 },
        { id: 7, text: 'solved the mystery', coherence: 86 },
        { id: 8, text: 'earned respect from others', coherence: 90 },
        { id: 9, text: 'found unexpected treasure', coherence: 82 },
        { id: 10, text: 'lived happily ever after', coherence: 95 },
        { id: 11, text: 'grew more confident', coherence: 89 },
        { id: 12, text: 'inspired others with bravery', coherence: 91 },
        { id: 13, text: 'achieved their goal', coherence: 93 },
        { id: 14, text: 'returned as a hero', coherence: 87 },
        { id: 15, text: 'found inner peace', coherence: 84 },
        { id: 16, text: 'reunited with loved ones', coherence: 96 },
        { id: 17, text: 'gained new skills', coherence: 88 },
        { id: 18, text: 'protected the community', coherence: 92 }
    ],

    stages: [
        { id: 1, name: 'CHARACTER', question: 'Choose a Character' },
        { id: 2, name: 'SETTING', question: 'Choose a Setting' },
        { id: 3, name: 'PROBLEM', question: 'What\'s the Problem?' },
        { id: 4, name: 'ACTION', question: 'What Action to Take?' },
        { id: 5, name: 'RESOLUTION', question: 'How Does it End?' }
    ]
};

window.GAME_DATA = GAME_DATA;