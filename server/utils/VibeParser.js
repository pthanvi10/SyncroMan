

// Dictionaries of weighted keywords
// You can easily expand these arrays later to make the parser smarter
const energizingWords = [
    'focused', 'ready', 'grind', 'deep', 'fast', 'energy', 'good', 
    'productive', 'motivated', 'strong', 'locked', 'awake', 'hyped', 'fresh', 'clear', 'sharp', 'on', 'fire', 'lit', 'pumped', 'invincible', 'unstoppable'
];

const drainingWords = [
    'tired', 'sluggish', 'chill', 'break', 'easy', 'exhausted', 
    'burnt', 'sleepy', 'done', 'slow', 'stressed', 'overwhelmed', 'foggy', 'distracted', 'off', 'drained', 'worn', 'unfocused', 'lethargic', 'fatigued', 'weary', 'burned', 'overworked', 'depleted', 'wiped', 'spent','alas', 'kantala'
];

/**
 * Calculates the user's energy level (1-5) based on their text input.
 * @param {string} text - The user's "Vibe Check" input.
 * @returns {number} - An integer from 1 (Lowest Energy) to 5 (Highest Energy).
 */
const calculateEnergyLevel = (text) => {
    if (!text || text.trim() === "") return 3; // Default to medium energy if blank

    const normalizedText = text.toLowerCase().replace(/[^\w\s]/gi, '');
    const words = normalizedText.split(/\s+/);

    let rawScore = 0;

    // Calculate raw score based on keyword matches
    words.forEach(word => {
        if (energizingWords.includes(word)) rawScore += 1;
        if (drainingWords.includes(word)) rawScore -= 1;
    });

    // The Math: Sigmoid Transformation
    // This normalizes any raw score into a 1-5 boundary constraint.
    // E = 1 + round(4 / (1 + e^(-k * rawScore)))
    const k = 0.8; // Tuning parameter for steepness. Higher k = faster jump to extremes.
    const sigmoid = 1 / (1 + Math.exp(-k * rawScore));
    
    // Scale the 0-1 sigmoid to a 0-4 range, then shift by +1 to get 1-5.
    let finalEnergy = 1 + Math.round(4 * sigmoid);

    // Failsafe bounds check
    if (finalEnergy < 1) finalEnergy = 1;
    if (finalEnergy > 5) finalEnergy = 5;

    return finalEnergy;
};

module.exports = { calculateEnergyLevel };