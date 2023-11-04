/** Represents a part of the background.
 * object to contain a background image
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = canvas.width;
    height = canvas.height;

    /** Create new background object
     * @param {string} imagePath - Relative path to image file.
     * @param {number} x - X coordinate in canvas to insert image.
     * Gets image, sizes it to width and height of canvas and inserts it a defined x coordinate.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = canvas.height - this.height;
    }
}