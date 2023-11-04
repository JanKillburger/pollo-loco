/** Represents a movable Object
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 0.05;
    oppositeDirection = false;
    speedY = 0;
    accelerationY = 6;
    energy = 100;
    lastHit = 0;
    currentImage = 0;
    animationInterval;
    damage = 5;

    /** Checks if object is above the ground as defined by the groundLevel variable
     * @returns {boolean} True if above ground, otherwise false
     */
    isAboveGround() {
        return this.y + this.height - this.offset.bottom < groundLevel;
    }

    /** Apply gravity
     * Adjusts the speedY and y properties of this, if this is not on the groundLevel
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY < 0) {
                this.y = Math.min(this.y + this.speedY, groundLevel - this.height + this.offset.bottom);
                if (this.y + this.height - this.offset.bottom >= groundLevel) {
                    this.speedY = 0;
                } else {
                    this.speedY += this.accelerationY;
                }
            }
        }, globalMotionInterval);
    }

    /** Get the next image for the current animation
     * @param {string[]} images - Array of img paths for current animation
     * Gets the next path and sets this.img to the appropriate img for the next display refresh
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /** Moves this to the left based on the speed property. */
    moveLeft() {
        this.x -= this.speed;
    }

    /** Moves this to the right based on the speed property. */
    moveRight() {
        this.x += this.speed;
    }

    /** Lets this jump.
     * sets currentImage to 0: ensures that jumping animation is played from the first image of the jumping array
     * Sets the initial speedY value. Will be constantly changed by applyGravity.
     * Plays jump off sound.
     */
    jump(initialSpeed = -40) {
        this.currentImage = 0;
        this.speedY = initialSpeed;
        if (this instanceof Character) playSound(this.jumpSound);
    }

    /** Check if this is colliding with an object
     * @param {object} obj - Object to check collision with.
     */
    isColliding(obj) {
        return this.hasCoverageX(obj) && this.hasCoverageY(obj)
    }

    /** Handle hit of this.
     * @param {number} damage - Damage to subtract from this.energy.
     * Subtracts damage from energy property.
     * If energy becomes negative it is reset to 0 (negative values don't make sense) and
     * currentImage is set to 0 so dying animation is played from the first image of the dying array
     * Stores current DateTime in lastHit variable (used for playing isHurt Animation)
     */
    isHit(damage) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
            this.currentImage = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /** Check if this is dead
     * @returns true if this.energy is 0
     */
    isDead() {
        return this.energy == 0;
    }

    /** Check if this is being hurt
     * @returns true if last hit has been within last second
     */
    isHurt() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1000;
        return timePassed < 1;
    }

    /** Check if this and obj are covering each other in X direction.
     * @param {object} obj - Object to check coverage with.
     * @returns true if this and obj are covering each other in x direction
     * takes into account position, size and offsets of this and obj.
     */
    hasCoverageX(obj) {
        return ((this.x + this.width - this.getOffset('right')) >= (obj.x + obj.getOffset('left')) &&
        (this.x + this.getOffset('left')) <= (obj.x + obj.width - obj.getOffset('right')))
    }

    /** Check if this and obj are covering each other in Y direction.
     * @param {object} obj - Object to check coverage with.
     * @returns true if this and obj are covering each other in y direction
     * takes into account position, size and offsets of this and obj.
     */
    hasCoverageY(obj) {
        return (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom)
    }

    /** Check if this is obj
     * @param {object} obj - Object to check.
     * @returns true if this is above obj
     */
    isAbove(obj) {
        return (this.y + this.height - this.offset.bottom) < obj.y + obj.offset.top
    }
}