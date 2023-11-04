/** Represents Chicken
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    energy = 5;
    height = 400 * globalScaleFactor;
    width = this.height / 0.98;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    offset = { top: 10, right: 20, bottom: 10, left: 10 };
    damage = 5;

    /** Create chicken and provide with images, size, position and sound. */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 500;
        this.y = groundLevel - this.height + this.offset.bottom;
        this.speed = 2 + Math.random() * 2;
        this.animate();
        this.alarmSound = new Audio('./audio/smallChickenAlarm.mp3');
    }

    /** Handles Animation and dying sound */
    animate() {
        this.animationInterval = setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                playSound(this.alarmSound);
                clearInterval(this.animationInterval);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            }
        }, globalMotionInterval);
    }
}