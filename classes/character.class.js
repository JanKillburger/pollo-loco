/** Representing Pepe character.
 * @extends MovableObject
 */
class Character extends MovableObject {
    y = 120;
    idleSince;
    isIdle = false;
    height = 1200 * globalScaleFactor;
    width = 610 * globalScaleFactor;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;
    onCrushingCourseWith = [];
    dyingSound = new Audio('./audio/dying.mp3');
    isHurtSound = new Audio('./audio/isHurt.mp3');
    jumpSound = new Audio('./audio/jump.mp3');
    snoringSound = new Audio('./audio/snoring.mp3');
    continuousSound = new Audio();
    walkingSound = new Audio('./audio/characterWalking.mp3');
    damage = 5;

    /** Create Pepe character.
     * @param {object} world - World object reference.
     * Adds images and sounds.
     * Sets size and offset.
     * Starts animation.
     */
    constructor(world) {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.world = world;
        this.offset = { top: 135, right: 45, bottom: 15, left: 50 };
        this.speed = 12;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.walkingSound.loop = true;
        this.isHurtSound.loop = true;
        this.snoringSound.loop = true;
        this.applyGravity();
        this.animate();
    }

    /** Animates character, both the animation and motion. */
    animate() {
        this.animationInterval = setStoppableInterval(() => {
            this.handleAnimation();
            this.handleMotion();
        }, globalMotionInterval);
    }

    /** Handles the animation.
     * Differentiates between different states.
     * Long idle (sleeping) is active after 5s of being idle.
     */
    handleAnimation() {
        if (this.isDead()) { this.handleDeadAnimation() }
        else if (this.isHurt()) { this.handleHurtAnimation(); }
        else if (this.isAboveGround()) { this.handleJumpAnimation(); }
        else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { this.handleWalkAnimation(); }
        else if (this.getIdleTime() > 5) { this.handleLongIdleAnimation(); }
        else { this.handleIdleAnimation(); }
    }

    /** Handles walk animation. */
    handleWalkAnimation() {
        this.resetIdleState();
        this.playContinuousSound(this.walkingSound);
        this.playAnimation(this.IMAGES_WALKING);
    }

    /** Handles Jump animation. */
    handleJumpAnimation() {
        this.resetIdleState();
        this.continuousSound.pause();
        this.playAnimation(this.IMAGES_JUMPING);
    }

    /** Handles Hurt Animation. */
    handleHurtAnimation() {
        this.resetIdleState();
        this.playContinuousSound(this.isHurtSound);
        this.playAnimation(this.IMAGES_HURT);
    }

    /** Handles Idle Animation. */
    handleIdleAnimation() {
        this.continuousSound.pause();
        this.playAnimation(this.IMAGES_IDLE);
    }

    /** Handles Long Idle Animation. */
    handleLongIdleAnimation() {
        this.playContinuousSound(this.snoringSound);
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }

    /** Handles Dead Animation
     * Checks if last image of dying animation is reached; if yes, stops character interval and calls game over screen:
     */
    handleDeadAnimation() {
        this.isIdle = false;
        playSound(this.dyingSound);
        this.playAnimation(this.IMAGES_DEAD);
        if (((this.currentImage - 1) % this.IMAGES_DEAD.length) + 1 === this.IMAGES_DEAD.length) {
            clearInterval(this.animationInterval);
            handleGameOver('failure');
        }
    }

    /** Play a looped sound.
     * @param {object} sound - Audio object containing looped sound to play.
     * continuousSound property holds an audio.
     * Checks whether this is not the passed-in sound.
     * Changes it if necessary and plays it.
     */
    playContinuousSound(sound) {
        if (this.continuousSound != sound) {
            this.continuousSound.pause();
            this.continuousSound = sound;
            playSound(this.continuousSound);
        } else if (this.continuousSound.paused) playSound(this.continuousSound);
    }

    /** Handle Motion.
     * Differentiates walking left and right and jumping.
     */
    handleMotion() {
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
    }

    /** Reset idle state.
     * Helper function to determin transition from idle to long idle animation
     * by providing the idleSince value.
     */
    resetIdleState() {
        this.isIdle = false;
        this.idleSince = new Date().getTime();
    }

    /** Get idle time.
     * @returns calculated idle time in seconds.
     */
    getIdleTime() {
        if (this.isIdle) {
            let now = new Date();
            return (now - this.idleSince) / 1000;
        } else {
            this.isIdle = true;
            this.idleSince = new Date().getTime();
        }
    }

    /** @returns if character is crushing an enemy */
    isCrushingEnemy(obj) {
        return this.isColliding(obj) && this.onCrushingCourseWith.indexOf(obj) != -1
    }

    /** Check if character is above an object.
     * @param {object} obj - Object to check for.
     * If character is above, obj is stored in the onCrushingCourseWith array.
     * to be used in detecting crushing of enemy.
     */
    checkCrushingCourse(obj) {
        if (this.hasCoverageX(obj) && this.isAbove(obj)) {
            if (this.onCrushingCourseWith.indexOf(obj) == -1) {
                this.onCrushingCourseWith.push(obj);
            }
        } else if (this.onCrushingCourseWith.indexOf(obj) != -1 && !this.hasCoverageX(obj) &&
            this.isAbove(obj)) {
            this.onCrushingCourseWith.splice(this.onCrushingCourseWith.indexOf(obj), 1);
        }
    }
}