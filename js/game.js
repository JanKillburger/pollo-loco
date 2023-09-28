let canvas;
let ctx;
let world;
let globalScaleFactor = 0.23;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    
}