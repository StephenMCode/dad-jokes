// jokes ascquisition module
// handles API fetching, local fallback, and no-repeat shuffling

const CONFIG = {
    API_URL: 'https://icanhazdadjoke.com/',
    HEADERS: { 'Accept': 'application/json' },
    FALLBACK_PATH: './data/jokes.json'
};

// emergency fallback - if JSON also fails to load
const EMERGENCY_JOKES = [
    { id: 'emergency-001', joke: "Why don't eggs tell jokes? They'd crack each other up.", status: 200 },
    { id: 'emergency-002', joke: "I'm reading a book about anti-gravity. It's impossible to put down.", status: 200 },
    { id: 'emergency-003', joke: "What do you call a fake noodle? An impasta.", status: 200 }
];

let fallbackJokes = null;
let shuffledJokes = [];
let currentIndex = 0;
let emergencyIndex = 0;

// fisher-yates shuffle
function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

async function loadFallbackJokes() {
    try {
        const response = await fetch(CONFIG.FALLBACK_PATH);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        fallbackJokes = data.jokes;
        shuffledJokes = shuffle(fallbackJokes);
        currentIndex = 0;
    } catch (error) {
        console.warn('Fallback JSON failed, using emergency jokes:', error.message);
        fallbackJokes = EMERGENCY_JOKES;
        shuffledJokes = shuffle(EMERGENCY_JOKES);
        currentIndex = 0;
    }
}

function getRandomFallbackJoke() {
    // fallback not loaded yet
    if (!shuffledJokes.length) {
        const joke = EMERGENCY_JOKES[emergencyIndex];
        emergencyIndex = (emergencyIndex + 1) % EMERGENCY_JOKES.length;
        return joke;
    }

    const joke = shuffledJokes[currentIndex]
    currentIndex++;

    if (currentIndex >= shuffledJokes.length) {
        shuffledJokes = shuffle(fallbackJokes);
        currentIndex = 0;
    }

    return joke;
}

async function fetchJokeFromAPI() {
    const response = await fetch(CONFIG.API_URL, {
        headers: CONFIG.HEADERS
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

// preload fallback jokes
export async function initJokes() {
    await loadFallbackJokes();
}

// returns joke object {id, joke, status}
export async function getJoke() {
    try {
        return await fetchJokeFromAPI();
    } catch (error) {
        return getRandomFallbackJoke();
    }
}