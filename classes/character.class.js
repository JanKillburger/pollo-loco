class Character extends MovableObject {
    y = 80;
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
    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ]
    world;


    constructor(world) {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.world = world;
        this.speed = 2;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.walkingSound = new Audio('audio/characterWalking.mp3');
        this.walkingSound.loop = true;
        this.animate();
    }

    animate() {
        this.walkLeft();
        this.walkRight();
        this.applyGravity();
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (!this.isAboveGround() && this.world.keyboard.UP) {
                this.jump();
            }

        }, 75)
    }

    handleKeyPress(key) {
        if (key == 'ArrowLeft' || key == 'ArrowRight') this.walkingSound.play();
    }

    handleKeyUp(key) {
        if (key == 'ArrowLeft' || key == 'ArrowRight') this.walkingSound.pause();
    }

    walkRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.oppositeDirection = false;
                this.x += this.speed;
                this.world.cameraX -= this.speed;
            }
        }, 1000 / 60);
    }

    walkLeft() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.oppositeDirection = true;
                this.x -= this.speed;
                this.world.cameraX += this.speed;
            }
        }, 1000 / 60);
    }

    jump() {
        this.speedY = -25;
    }
}