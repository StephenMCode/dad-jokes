// config
const CONFIG = {
    API_URL: 'https://icanhazdadjoke.com/',
    HEADERS: {
        'Accept': 'application/json'
    }
}

// dom refs
const jokeDisplay = document.querySelector('[data-js="display-joke"]');
const fetchButton = document.querySelector('[data-js="fetch-joke"]');

// state
let currentJoke = null;

// api
async function fetchJoke() {
    const response = await fetch(CONFIG.API_URL, {
        headers: CONFIG.HEADERS
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
}

// event handlers
async function handleFetchJoke() {
    fetchButton.disabled = true;
    fetchButton.classList.add('joke-card__button--loading');
    fetchButton.textContent = 'Loading...';
    jokeDisplay.setAttribute('aria-busy', 'true');

    try {
        const data = await fetchJoke();
        currentJoke = data;
        jokeDisplay.textContent = data.joke;
    } catch (error) {
        console.error('Failed to fetch joke:', error);
    } finally {
        fetchButton.disabled = false;
        fetchButton.classList.remove('joke-card__button--loading');
        fetchButton.textContent = 'Get Joke';
        jokeDisplay.setAttribute('aria-busy', 'false');
    }
}

// init
fetchButton.addEventListener('click', handleFetchJoke);