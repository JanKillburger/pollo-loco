let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

}

window.addEventListener('keydown', (event) => {
    if (!event.repeat) {
        keyboard.pressKey(event.key);
        world.character.handleKeyPress(event.key);
    }
})

window.addEventListener('keyup', (event) => {
    keyboard.releaseKey(event.key);
    world.character.handleKeyUp(event.key);
})