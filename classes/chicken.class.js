class Chicken extends MovableObject {
    y = 360;
    energy = 5;
    height = 248 * globalScaleFactor;
    width = this.height / 0.98;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.alarmSound = new Audio('./audio/smallChickenAlarm.mp3');
    }

    animate() {
        this.animationInterval = setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.alarmSound.play();
                stopInterval(this.animationInterval);
            } else {
                
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            }
        }, globalMotionInterval);

    }
}