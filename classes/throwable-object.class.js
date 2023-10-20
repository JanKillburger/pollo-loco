class ThrowableObject extends MovableObject {
    energy = 5;
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

    constructor(x, directionX, y) {
        super().loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.throw(x, directionX, y);
        this.animate();
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.accelerationY = 0;
                this.speedY = 0;
                this.speed = 0;
                this.playAnimation(this.IMAGES_SPLASH);
                console.log(this.currentImage);
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