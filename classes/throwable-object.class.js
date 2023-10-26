class ThrowableObject extends MovableObject {
    energy = 5;
    height = 400 * globalScaleFactor;
    width = 400 * globalScaleFactor;
    IMAGES_ROTATION = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    bottleCrash = new Audio('../audio/bottleCrash.mp3');

    constructor(x, directionX, y) {
        super().loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.offset = {top: 20, right: 20, bottom: 20, left: 20};
        this.throw(x, directionX, y);
        this.animate();
        this.bottleCrash.currentTime = 0.5;
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.accelerationY = 0;
                this.speedY = 0;
                this.speed = 0;
                this.playAnimation(this.IMAGES_SPLASH);
                //checks if last image of splashing animation is reached; if yes, stops interval and calls game over screen
                if (((this.currentImage - 1) % this.IMAGES_SPLASH.length) + 1 === this.IMAGES_SPLASH.length) {
                    clearInterval(this.animationInterval);
                }
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, globalMotionInterval);
    }



    throw(startX, directionX, startY) {
        this.x = startX;
        this.y = startY;
        this.speed = 20 * directionX;
        this.speedY = -20;
        this.currentImage = 0;
        this.applyGravity();
        setInterval(() => {
            this.x += this.speed;
        }, globalMotionInterval);
    }
}