# Dad Jokes

A dad joke generator built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, just the fundamentals.

**Live site:** https://stephenmcode.github.io/dad-jokes/

## What's Working Now

- Fetch random dad jokes from icanhazdadjoke.com
- Offline support with 100 local fallback jokes
- Loading state with breathing animation
- Accessible (ARIA live regions, reduced motion support)
- Smooth joke text transitions (fade out, swap, fade in)
- Fluid typography that scales with viewport
- Cozy/warm visual design
- Deploys to GitHub Pages

## What's Coming

Persistence:
- Save favorites to localStorage
- Separate favorites page
- History tracking (last 100 jokes)
- Don't repeat favorited jokes

Polish:
- Smooth transitions
- Button feedback
- Visual refinements

Extras:
- Dark mode toggle
- Keyboard shortcuts
- Share/copy buttons
- Mobile responsive

## API

Jokes come from [icanhazdadjoke.com](https://icanhazdadjoke.com). It's free and doesn't need an API key. When the API is unavailable, the site falls back to a local collection of 100 jokes.