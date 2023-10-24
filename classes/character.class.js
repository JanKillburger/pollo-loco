class Character extends MovableObject {
    y = 80;
    idleSince;
    isIdle = false;
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
    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;
    onCrushingCourseWith = [];


    constructor(world) {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.world = world;
        this.offsetX = 20;
        this.offsetY = 120;
        this.speed = 20;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.walkingSound = new Audio('audio/characterWalking.mp3');
        this.walkingSound.loop = true;
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.isIdle = false;
                this.playAnimation(this.IMAGES_DEAD);
                //checks if last image of dying animation is reached; if yes, stops interval and calls game over screen
                if (((this.currentImage - 1) % this.IMAGES_DEAD.length) + 1 === this.IMAGES_DEAD.length) {
                    clearInterval(this.animationInterval);
                }
            } else if (this.isHurt()) {
                this.resetIdleState();
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.resetIdleState();
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.resetIdleState();
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.getIdleTime() > 5) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
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
        }, globalMotionInterval);
    }

    resetIdleState() {
        this.isIdle = false;
        this.idleSince = new Date().getTime();
    }

    getIdleTime() {
        if (this.isIdle) {
            let now = new Date();
            return (now - this.idleSince) / 1000;
        } else {
            this.isIdle = true;
            this.idleSince = new Date().getTime();
        }
    }

    handleKeyPress(key) {
        if (key == 'ArrowLeft' || key == 'ArrowRight') this.walkingSound.play();
    }

    handleKeyUp(key) {
        if (key == 'ArrowLeft' || key == 'ArrowRight') this.walkingSound.pause();
    }

    isCrushingEnemy(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y /*+ this.offsetY*/ + this.height) >= obj.y && this.onCrushingCourseWith.indexOf(obj) != -1
        //(this.y /*+ this.offsetY*/) <= (obj.y + obj.height)
    }

    checkCrushingCourse(obj) {
        if ((this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y /*+ this.offsetY*/ + this.height) < obj.y) {
            if (this.onCrushingCourseWith.indexOf(obj) == -1) {
                this.onCrushingCourseWith.push(obj);
            }
        } else if (this.onCrushingCourseWith.indexOf(obj) != -1 && !((this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width)) &&
            (this.y /*+ this.offsetY*/ + this.height) < obj.y) {
            this.onCrushingCourseWith.splice(this.onCrushingCourseWith.indexOf(obj), 1);
        }
    }
}