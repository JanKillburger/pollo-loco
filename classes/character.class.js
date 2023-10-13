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
    ];
    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png',
    ];
    world;


    constructor(world) {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.world = world;
        this.speed = 6;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.walkingSound = new Audio('audio/characterWalking.mp3');
        this.walkingSound.loop = true;
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (!this.isAboveGround() && (this.world.keyboard.UP || this.world.keyboard.SPACE)) {
                this.jump();
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.oppositeDirection = false;
                this.moveRight();
                this.world.cameraX -= this.speed;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.oppositeDirection = true;
                this.moveLeft();
                this.world.cameraX += this.speed;
            }
        }, 50)
    }

    handleKeyPress(key) {
        if (key == 'ArrowLeft' || key == 'ArrowRight') this.walkingSound.play();
    }

    handleKeyUp(key) {
        if (key == 'ArrowLeft' || key == 'ArrowRight') this.walkingSound.pause();
    }
}