let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let world;
let keyboard = new Keyboard();
let startScreen = document.getElementById('start-screen-img');
let endScreen = document.getElementById('end-screen-img');
let gameOverScreen = new Image();
let intervalIds = [];
let usesTouchscreen = false;
let playSounds = true;

function preloadImages() {
    starterImages.forEach((img) => {
        console.log(`fetching ${img}...`)
        const imgDummy = new Image();
        imgDummy.src = img;
    })
}

preloadImages();


/** Creates World object, adds event listeners for keyboard game control and handles hiding/showing mobile control elements, start/end screen etc.
 * Is also called for re-starting the game after game over.
 */
function init() {
    world = new World(canvas, keyboard, intervalIds);
    window.addEventListener('keydown', (event) => {
        event.preventDefault();
        if (!event.repeat) {
            keyboard.pressKey(event.key);
        }
    });
    window.addEventListener('keyup', (event) => {
        event.preventDefault();
        keyboard.releaseKey(event.key);
    });
    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    document.querySelector('.start-game').classList.add('d-none');
    if (usesTouchscreen) document.querySelectorAll('.mobile-control').forEach((el) => el.classList.remove('d-none'));
    document.querySelector('.toggle-sounds').classList.remove('d-none');
}

/** Handles all actions related to end of game, like stopping animations and sounds and showing the appropriate end screen.
 * @param {string} screenType - A string whose value is either 'success' or 'failure'. Depending on this value a different text is shown on end screen.
 */
function handleGameOver(screenType) {
    stopIntervals();
    world.character.continuousSound.pause();
    switch (screenType) {
        case 'success':
            endScreen.src = './img/9_intro_outro_screens/game_over/game over.png';
            break;
        case 'failure':
            endScreen.src = './img/9_intro_outro_screens/game_over/you lost.png';
            break;
    }
    document.querySelector('.toggle-sounds').classList.add('d-none');
    endScreen.classList.add('active');
    document.querySelector('.start-game').classList.remove('d-none');
    if (usesTouchscreen) document.querySelectorAll('.mobile-control').forEach((el) => el.classList.add('d-none'));
}

/** Sets a new interval and stores the interval ID in the array intervalIds (to clear all intervals at end of game)
 * @param {Function} callbackFn - Function to set an interval for.
 * @param {number} interval - Duration in ms how frequently the function needs to be run.
 * @returns {number} The interval ID
 */
function setStoppableInterval(callbackFn, interval) {
    const intervalId = setInterval(callbackFn, interval);
    intervalIds.push(intervalId);
    return intervalId;
}

/** Stops all intervals whose IDs are stored in intervalIds array and clears array. */
function stopIntervals() {
    for (const intervalId of intervalIds) {
        clearInterval(intervalId);
    }
    intervalIds = [];
}

/** Toggles fullscreen by adding/removing html classes to the canvas, end-screen-img and start-screen-img elements and requesting/exiting fullscreen. */
function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.querySelectorAll('#canvas, #end-screen-img, #start-screen-img').forEach((el) => el.classList.remove('fullscreen-enabled'));
        document.exitFullscreen();
        document.getElementById('toggle-fullscreen').src = './img/enable-fullscreen.png';
    } else {
        document.querySelectorAll('#canvas, #end-screen-img, #start-screen-img').forEach((el) => el.classList.add('fullscreen-enabled'));
        document.getElementById('fullscreen').requestFullscreen();
        document.getElementById('toggle-fullscreen').src = './img/disable-fullscreen.png';
    }
}

/** Calculates scrollbar width and stores it as CSS custom property for use in CSS rules. */
function calculateVerticalScrollbarWidth() {
    document.documentElement.style.setProperty(
        '--scrollbar-width',
        (window.innerWidth - document.documentElement.clientWidth) + "px"
    );
}

/** Toggles all game sounds. Plays/Stops any continuous sound of the character being played upon request as well. */
function toggleSounds() {
    playSounds = !playSounds;
    if (playSounds) {
        if (world) world.character.continuousSound.play();
        document.getElementById('toggle-sounds').src = './img/mute-sounds.png';
    } else {
        if (world) world.character.continuousSound.pause();
        document.getElementById('toggle-sounds').src = './img/unmute-sounds.png';
    }
}

/** Helper function for playing sounds. Checks if sounds are enabled before playing them. */
function playSound(sound) {
    if (playSounds) sound.play();
}

/** Prevents default actions of keydown events: required for the game to work since arrow and space keys cause issues. */
window.addEventListener('keydown', (ev) => {
    ev.preventDefault();
})
/** Event to re-calculate scrollbar width, see called function. */
window.addEventListener('DOMContentLoaded', calculateVerticalScrollbarWidth, false);
/** Event to re-calculate scrollbar width, see called function. */
window.addEventListener('resize', calculateVerticalScrollbarWidth, false);
/** Event to re-calculate scrollbar width, see called function. */
window.addEventListener('load', calculateVerticalScrollbarWidth, false);
/** Event to detect touchscreen devices, sets a global variable to be used in other functions, hides everything besides canvas and sets canvas to fullscreen */
window.addEventListener('touchstart', function onFirstTouch() {
    usesTouchscreen = true;
    this.document.querySelectorAll('.desktop-only, #toggle-fullscreen').forEach((el) => el.classList.add('d-none'));
    this.document.getElementById('canvas').style.width = '100%';
    this.document.getElementById('canvas').style.height = '100vh';
    window.removeEventListener('touchstart', onFirstTouch, false);
}, false);