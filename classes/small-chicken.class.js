/** Represents small chicken
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
    y = 360;
    energy = 5;
    height = 248 * globalScaleFactor;
    width = this.height / 0.98;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    offset = {top: 10, right: 15, bottom: 10, left: 10};
    damage = 5;

    /** Creates small chicken.
     * Sets images for animations, sounds, speed, position, size etc.
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 500;
        this.y = groundLevel - this.height + this.offset.bottom;
        this.speed = 1 + Math.random() * 1;
        this.alarmSound = new Audio('./audio/smallChickenAlarm.mp3');
        this.animate();
    }

    /** Animate small chicken.
     * Differentiates between walking and dead states.
     */
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