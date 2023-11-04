/** Represents Endboss.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    y = 155;
    height = 1217 * globalScaleFactor;
    width = this.height / 1.16;
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ATTACKING = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_HURTING = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    isAttackingLocal = false;
    isAttackingGlobal = false;
    currentTarget;
    attackDirection;
    jumpSpeed = -50;

    /** Creates Endboss.
     * Loads images for animations and sounds.
     * Sets size, position etc.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700;
        this.speed = 15;
        this.damage = 10;
        this.animate();
        this.applyGravity();
        this.offset = { top: 20, right: 25, bottom: 20, left: 25 };
        this.chickenScream = new Audio('./audio/chickenScream.mp3');
        this.grillSound = new Audio('./audio/grillSound.mp3');
    }

    /** Animate Endboss.
     * Plays animation and sounds, differentiating states (dead, hurt, attacking, walking).
     * When dead: checks if last image of dying animation is reached to stop there.
     */
    animate() {
        this.animationInterval = setStoppableInterval(() => {
            this.handleAnimation();
            this.handleMotion();
        }, globalMotionInterval);

    }

    handleMotion() {
        if (this.isAttackingLocal) {
            this.handleAttackMotion();
        }
    }


    handleAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            playSound(this.grillSound);
            if (((this.currentImage - 1) % this.IMAGES_DEAD.length) + 1 === this.IMAGES_DEAD.length) {
                this.handleDeadState();
            }
        } else if (this.isHurt()) {
            playSound(this.chickenScream);
            this.playAnimation(this.IMAGES_HURTING);
        } else {
            this.playAnimation(this.IMAGES_ATTACKING);
        }
    }

    handleAttackMotion() {
        if (this.attackDirection == 1) {
            if (this.x < this.currentTarget) {
                this.moveRight();
                if (!this.isAboveGround()) this.jump(this.jumpSpeed);
            } else { this.finishAttack(); }
        } else {
            if (this.x > this.currentTarget) {
                this.moveLeft();
                if (!this.isAboveGround()) this.jump(this.jumpSpeed);
            } else { this.finishAttack(); }
        }
    }

    finishAttack() {
        this.isAttackingLocal = false;
        setTimeout(() => {
            this.isAttackingGlobal = false;
        }, 2000);
    }

    /** Handles Dead state
     * Called to stop Endboss interval and trigger game over screen.
     */
    handleDeadState() {
        clearInterval(this.animationInterval);
        handleGameOver('success');
    }

    startAttack(targetX) {
        this.isAttackingGlobal = true;
        this.isAttackingLocal = true;
        this.currentTarget = targetX;
        if (targetX < this.x) {
            this.attackDirection = -1;
        } else {
            this.attackDirection = 1;
        }
    }
}