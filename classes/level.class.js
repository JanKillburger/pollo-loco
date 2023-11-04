/** Represents a game level. */
class Level {
    /** Creates a level.
     * @param {object[]} enemies - Array containing the enemy objects (normal/small chicken, endboss). Endboss MUST be the last object in array.
     * @param {object[]} clouds - Array containing the clouds objects for the background
     * @param {object[]} backgroundObjects - Array containing the background objects
     * @param {number} levelEndX - X position to stop character from walking further to the right
     * @param {object[]} collectableObjects - Array containing the collectable objects (coins and bottles)
     */
    constructor(enemies, clouds, backgroundObjects, levelEndX, collectableObjects) {
        this.enemies = enemies;
        if (!this.checkEndbossPosition()) throw new Error("Endboss must be last object in enemies array");
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.levelEndX = levelEndX;
        this.collectableObjects = collectableObjects;
    }

    /** Check if Endboss is the last object in enemies array.
     * @returns true if it is.
     * This is important for getting the reference to the endboss in the world.
     */
    checkEndbossPosition() {
        return this.enemies[this.enemies.length - 1] instanceof Endboss;
    }
}