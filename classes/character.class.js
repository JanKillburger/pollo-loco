class Character extends MovableObject {
    y = 150;
    //absolute numbers are the original pixel sizes of image
    height = 1200 * globalScaleFactor;
    width = 610 * globalScaleFactor;
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    world;

    constructor(world) {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.world = world;
        this.speed = 2;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    animate() {
        this.walkRight();
        this.walkLeft();
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 75)
    }

    walkRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.oppositeDirection = false;
                this.x += this.speed;
                this.world.cameraX -= this.speed;
            }
        }, 1000 / 60);
    }

    walkLeft() {
        setInterval(() => {
            if (this.world.keyboard.LEFT) {
                this.oppositeDirection = true;
                this.x -= this.speed;
                this.world.cameraX += this.speed;
            }
        }, 1000 / 60);
    }

    jump() {

    }
}