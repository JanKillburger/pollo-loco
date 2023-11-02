let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let startScreen = document.getElementById('start-screen-img');
let endScreen = document.getElementById('end-screen-img');
let gameOverScreen = new Image();
let intervalIds = [];
let usesTouchscreen = false;

function init() {
    canvas = document.getElementById('canvas');
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
}


function showGameOverScreen(type) {
    stopIntervals();
    endScreen.classList.add('active');
    switch (type) {
        case 'success':
            endScreen.src = './img/9_intro_outro_screens/game_over/game over.png';
            break;
        case 'failure':
            endScreen.src = './img/9_intro_outro_screens/game_over/you lost.png';
            break;
    }
    document.querySelector('.start-game').classList.remove('d-none');
    if (usesTouchscreen) document.querySelectorAll('.mobile-control').forEach((el) => el.classList.add('d-none'));
}

function setStoppableInterval(callbackFn, interval) {
    const intervalId = setInterval(callbackFn, interval);
    intervalIds.push(intervalId);
    return intervalId;
}

function stopInterval(intervalId) {
    clearInterval(intervalId);
}

function stopIntervals() {
    for (const intervalId of intervalIds) {
        stopInterval(intervalId);
    }
    intervalIds = [];
}

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

window.addEventListener('keydown', (ev) => {
    ev.preventDefault();
})

function calculateVerticalScrollbarWidth() {
    document.documentElement.style.setProperty(
        '--scrollbar-width',
        (window.innerWidth - document.documentElement.clientWidth) + "px"
    );
}

window.addEventListener('DOMContentLoaded', calculateVerticalScrollbarWidth, false);
window.addEventListener('resize', calculateVerticalScrollbarWidth, false);
window.addEventListener('load', calculateVerticalScrollbarWidth, false);

window.addEventListener('touchstart', function onFirstTouch() {
    // or set some global variable
    usesTouchscreen = true;
    // we only need to know once that a human touched the screen, so we can stop listening now
    window.removeEventListener('touchstart', onFirstTouch, false);
}, false);