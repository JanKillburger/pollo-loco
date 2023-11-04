/** Represents collectable object
 * @extends DrawableObject
 */
class CollectableObject extends DrawableObject {
    /** Creates collectable object on a random position within a defined area.
     * @param {number} xStart - Minium x position the item will be placed.
     * @param {number} xRange - Defines the x range the item will actually be placed.
     * @param {number} yStart - Minium y position the item will be placed.
     * @param {number} yRange - Defines the y range the item will actually be placed.
     */
    constructor(xStart, xRange, yStart, yRange) {
        super();
        this.x = xStart + Math.random() * xRange;
        this.y = yStart + Math.random() * yRange;
    }
}