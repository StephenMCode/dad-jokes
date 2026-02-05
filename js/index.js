import { initJokes, getJoke } from './jokes.js';

// dom refs
const jokeDisplay = document.querySelector('[data-js="display-joke"]');
const fetchButton = document.querySelector('[data-js="fetch-joke"]');

// state
let currentJoke = null;

// event handlers
async function handleFetchJoke() {
    fetchButton.disabled = true;
    fetchButton.classList.add('joke-card__button--loading');
    fetchButton.textContent = 'Loading...';
    jokeDisplay.setAttribute('aria-busy', 'true');

    try {
        const data = await getJoke();
        currentJoke = data;
        jokeDisplay.textContent = data.joke;
    } finally {
        fetchButton.disabled = false;
        fetchButton.classList.remove('joke-card__button--loading');
        fetchButton.textContent = 'Get Joke';
        jokeDisplay.setAttribute('aria-busy', 'false');
    }
}

// init
initJokes();
fetchButton.addEventListener('click', handleFetchJoke);