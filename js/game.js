let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

}

window.addEventListener('keydown', (event) => {
    keyboard.pressKey(event.key);
})

window.addEventListener('keyup', (event) => {
    keyboard.releaseKey(event.key);
})