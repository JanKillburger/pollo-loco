/** Represents a game level. */
class Level {
    /** Creates a level.
     * @param {object[]} enemies - Array containing the enemy objects (normal/small chicken, endboss)
     * @param {object[]} clouds - Array containing the clouds objects for the background
     * @param {object[]} backgroundObjects - Array containing the background objects
     * @param {number} levelEndX - X position to stop character from walking further to the right
     * @param {object[]} collectableObjects - Array containing the collectable objects (coins and bottles)
     */
    constructor(enemies, clouds, backgroundObjects, levelEndX, collectableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.levelEndX = levelEndX;
        this.collectableObjects = collectableObjects;
    }
}